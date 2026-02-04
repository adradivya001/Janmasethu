import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { JourneyData, JourneyStage, JOURNEY_STORAGE_KEY } from '../lib/journey';

interface JourneyContextType {
    journey: JourneyData | null;
    setJourney: (stage: JourneyStage, date?: string) => void;
    clearJourney: () => void;
    showSelector: boolean;
    setShowSelector: (show: boolean) => void;
    isLoading: boolean;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export const JourneyProvider = ({ children }: { children: ReactNode }) => {
    const [journey, setJourneyState] = useState<JourneyData | null>(null);
    const [showSelector, setShowSelector] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load from local storage on mount
        try {
            const stored = localStorage.getItem(JOURNEY_STORAGE_KEY);
            if (stored) {
                setJourneyState(JSON.parse(stored));
            } else {
                // No journey found, show selector
                setShowSelector(true);
            }
        } catch (e) {
            console.error('Failed to load journey from local storage', e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const setJourney = (stage: JourneyStage, date?: string) => {
        const newData: JourneyData = {
            stage,
            date,
            lastUpdated: Date.now(),
        };
        setJourneyState(newData);
        localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(newData));
        setShowSelector(false); // Close selector on success

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
    };

    return (
        <JourneyContext.Provider value={{ journey, setJourney, clearJourney, showSelector, setShowSelector, isLoading }}>
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
