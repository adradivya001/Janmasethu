export type JourneyStage = 'TTC' | 'PREGNANT' | 'PARENT';

export interface JourneyData {
    stage: JourneyStage;
    date?: string; // ISO Date String (LMP, Due Date, or DOB)
    lastUpdated: number; // Timestamp
}

export const JOURNEY_STORAGE_KEY = 'janmasethu_journey';

export const JOURNEY_LABELS: Record<JourneyStage, string> = {
    TTC: 'Trying to Conceive',
    PREGNANT: 'Pregnant',
    PARENT: 'Parent',
};
