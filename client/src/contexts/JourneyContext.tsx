import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import { useLocation } from 'wouter';
import { JourneyData, JourneyStage, JOURNEY_STORAGE_KEY } from '../lib/journey';

interface JourneyContextType {
    journey: JourneyData | null;
    setJourney: (stage: JourneyStage, date?: string) => void;
    clearJourney: () => void;
    showSelector: boolean;
    setShowSelector: (show: boolean) => void;
    openSelector: (stage?: JourneyStage) => void;
    initialStage: JourneyStage | null;
    isLoading: boolean;
    dismissSelector: () => void;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export const JourneyProvider = ({ children }: { children: ReactNode }) => {
    const [journey, setJourneyState] = useState<JourneyData | null>(null);
    const [showSelector, setShowSelector] = useState(false);
    const [initialStage, setInitialStage] = useState<JourneyStage | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasDismissed, setHasDismissed] = useState(false);
    const [location] = useLocation();
    const timerRef = useRef<NodeJS.Timeout>();
    const prevLocation = useRef(location);

    useEffect(() => {
        // Load from local storage on mount
        try {
            const stored = localStorage.getItem(JOURNEY_STORAGE_KEY);
            if (stored) {
                setJourneyState(JSON.parse(stored));
            } else {
                // No journey found, set timer to show selector after 1 minute
                timerRef.current = setTimeout(() => {
                    setShowSelector(true);
                }, 60000);
            }
        } catch (e) {
            console.error('Failed to load journey from local storage', e);
        } finally {
            setIsLoading(false);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    // Effect to handle reminders on page navigation
    useEffect(() => {
        // Only trigger if location has effectively changed
        if (prevLocation.current !== location) {
            if (hasDismissed && !journey) {
                // If user dismissed it previously and hasn't selected a journey,
                // remind them when they navigate to a new page.
                setShowSelector(true);
                setHasDismissed(false); // Reset dismissal flag so they can dismiss again on this new page
            }
            prevLocation.current = location;
        }
    }, [location, hasDismissed, journey]);

    const setJourney = (stage: JourneyStage, date?: string) => {
        // Clear any pending timer if journey is set
        if (timerRef.current) clearTimeout(timerRef.current);

        const newData: JourneyData = {
            stage,
            date,
            lastUpdated: Date.now(),
        };
        setJourneyState(newData);
        localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(newData));
        setShowSelector(false); // Close selector on success
        setInitialStage(null); // Reset initial stage

        // Sync with backend if user is logged in
        const userId = localStorage.getItem('user_id');
        if (userId) {
            import('../utils/api').then(({ saveUserJourney }) => {
                let dateType = 'UNKNOWN';
                if (stage === 'TTC') dateType = 'CYCLE_START';
                if (stage === 'PREGNANT') dateType = 'LMP'; // Assuming LMP for now as standard input
                if (stage === 'PARENT') dateType = 'BIRTH_DATE';

                saveUserJourney({
                    user_id: userId,
                    stage,
                    date,
                    date_type: dateType
                }).catch(err => console.error('Failed to sync journey to backend', err));
            });
        }

        // Track analytics event
        import('../lib/analytics').then(({ trackEvent }) => {
            trackEvent('journey_selected', {
                stage: stage,
                has_date: !!date,
                timestamp: new Date().toISOString()
            });
        });
    };

    const clearJourney = () => {
        setJourneyState(null);
        localStorage.removeItem(JOURNEY_STORAGE_KEY);
        setShowSelector(false);
        setInitialStage(null);
        // Note: We don't set hasDismissed here because "Clear" is an explicit action,
        // so we probably shouldn't pester them immediately on next page.
    };

    const openSelector = (stage?: JourneyStage) => {
        if (stage) setInitialStage(stage);
        else setInitialStage(null);
        setShowSelector(true);
    };

    const dismissSelector = () => {
        setShowSelector(false);
        if (!journey) {
            setHasDismissed(true);
        }
    };

    return (
        <JourneyContext.Provider value={{
            journey,
            setJourney,
            clearJourney,
            showSelector,
            setShowSelector,
            openSelector,
            initialStage,
            isLoading,
            dismissSelector
        }}>
            {children}
        </JourneyContext.Provider>
    );
};

export const useJourney = () => {
    const context = useContext(JourneyContext);
    if (context === undefined) {
        throw new Error('useJourney must be used within a JourneyProvider');
    }
    return context;
};
