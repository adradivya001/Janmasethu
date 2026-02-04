
// Simple analytics wrapper
// In the future, this can be replaced with Google Analytics, Mixpanel, or custom backend logging

type EventName =
    | 'journey_selected'
    | 'chat_message_sent'
    | 'story_viewed'
    | 'story_shared';

interface EventProperties {
    [key: string]: any;
}

export const trackEvent = (eventName: EventName, properties?: EventProperties) => {
    // 1. Log to console in development
    if (import.meta.env.DEV) {
        console.log(`📊 [Analytics] ${eventName}`, properties);
    }

    // 2. Here you would add the actual tracking code
    // Example: window.gtag('event', eventName, properties);

    // 3. Optional: Send critical events to backend
    if (eventName === 'journey_selected') {
        // This is already handled by saveUserJourney, but we could track metadata here
    }
};
