import { API_BASE_URL } from '../utils/api';
import { format } from 'date-fns';

export interface VaccinationStage {
    age: string;
    items: string[];
    dueDate: string;
    isPast: boolean;
}

export interface DueDateResult {
    dueDate: string;
    weeksPregnant: number;
    trimester: number;
}

export interface OvulationResult {
    ovulationDate: string;
    fertileWindowStart: string;
    fertileWindowEnd: string;
    nextPeriod: string;
}

export interface PregnancyWeekData {
    week: number;
    fruit: string;
    size: string;
    weight: string;
    description: string;
    image: string;
}

export interface PregnancyWeekResult {
    currentWeek: number;
    weekData: PregnancyWeekData;
}

export interface SafetyItem {
    id: string;
    name: string;
    category: string;
    status: string;
    note: string;
}

export interface ReadinessCategory {
    category: string;
    items: { id: string; text: string }[];
}

const TOOLS_API_URL = `${API_BASE_URL}/tools`;

export async function getVaccinationSchedule(dob: Date): Promise<VaccinationStage[]> {
    const response = await fetch(`${TOOLS_API_URL}/vaccination-schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dob: format(dob, 'yyyy-MM-dd') })
    });

    if (!response.ok) throw new Error('Failed to fetch schedule');
    return await response.json();
}

export async function calculateDueDate(lmp: Date): Promise<DueDateResult> {
    const response = await fetch(`${TOOLS_API_URL}/due-date`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lmp: format(lmp, 'yyyy-MM-dd') })
    });

    if (!response.ok) throw new Error('Failed to calculate due date');
    return await response.json();
}

export async function calculateOvulation(lastPeriod: Date, cycleLength: number): Promise<OvulationResult> {
    const response = await fetch(`${TOOLS_API_URL}/ovulation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            lastPeriod: format(lastPeriod, 'yyyy-MM-dd'),
            cycleLength
        })
    });

    if (!response.ok) throw new Error('Failed to calculate ovulation');
    return await response.json();
}

export async function getPregnancyWeek(referenceDate: Date, type: 'LMP' | 'DUE_DATE'): Promise<PregnancyWeekResult> {
    const response = await fetch(`${TOOLS_API_URL}/pregnancy-week`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            referenceDate: format(referenceDate, 'yyyy-MM-dd'),
            type
        })
    });

    if (!response.ok) throw new Error('Failed to fetch pregnancy week');
    return await response.json();
}

export async function getPregnancyWeekDetail(week: number): Promise<PregnancyWeekData> {
    const response = await fetch(`${TOOLS_API_URL}/pregnancy-week/${week}`);
    if (!response.ok) throw new Error('Failed to fetch week detail');
    return await response.json();
}

export async function getAllPregnancyWeeks(): Promise<PregnancyWeekData[]> {
    const response = await fetch(`${TOOLS_API_URL}/pregnancy-weeks`);
    if (!response.ok) throw new Error('Failed to fetch all weeks');
    return await response.json();
}

export async function searchSafety(query: string = ""): Promise<SafetyItem[]> {
    const response = await fetch(`${TOOLS_API_URL}/safety-check?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to fetch safety items');
    return await response.json();
}

export async function getReadinessChecklist(): Promise<ReadinessCategory[]> {
    const response = await fetch(`${TOOLS_API_URL}/readiness-checklist`);
    if (!response.ok) throw new Error('Failed to fetch checklist');
    return await response.json();
}

export interface ConceptionResult {
    conceptionWindowStart: string;
    conceptionWindowEnd: string;
    probableConceptionDate: string;
    confidenceLevel: string;
    explanation: string;
}

export async function calculateConception(
    date: Date,
    type: 'LMP' | 'DUE_DATE',
    cycleLength: number = 28,
    isIrregular: boolean = false,
    dueDateConfidence: 'DOCTOR' | 'ESTIMATED' | null = null
): Promise<ConceptionResult> {
    const response = await fetch(`${TOOLS_API_URL}/conception-calculator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            date: format(date, 'yyyy-MM-dd'),
            type,
            cycleLength,
            isIrregular,
            dueDateConfidence
        })
    });

    if (!response.ok) throw new Error('Failed to calculate conception date');
    return await response.json();
}

export interface AmIPregnantResult {
    result: 'VERY_LIKELY' | 'POSSIBLY' | 'UNLIKELY' | 'INCONCLUSIVE';
    copy: string;
    nextGuidance: string[];
}

export interface AmIPregnantRequest {
    q1_period: "LATE_5_PLUS" | "LATE_1_4" | "NO" | "NOT_SURE";
    q2_sex: "YES" | "NOT_SURE" | "NO";
    q3_spotting: "YES_LIGHT" | "YES_HEAVY" | "NO";
    q4_symptoms: "NONE" | "ONE_TWO" | "SEVERAL";
    q5_test: "POSITIVE" | "NEGATIVE" | "UNCLEAR" | "NO";
}

export async function checkPregnancyProbability(data: AmIPregnantRequest): Promise<AmIPregnantResult> {
    const response = await fetch(`${TOOLS_API_URL}/am-i-pregnant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Failed to check pregnancy probability');
    return await response.json();
}

export interface BabyCostRequest {
    city_tier: string;
    hospital_type: string;
    delivery_type: string;
    custom_delivery_cost?: number;

    feeding_type: string;
    formula_tier?: string;
    custom_feeding_cost?: number;

    diapers_per_day: number;
    diaper_brand: string;
    wipes_enabled: boolean;
    custom_hygiene_cost?: number;

    clothing_tier: string;
    custom_clothing_cost?: number;

    health_type: string;
    custom_health_cost?: number;

    childcare_type: string;
    custom_childcare_cost?: number;

    gear_selection: Record<string, string>;
    custom_gear_cost?: number;

    custom_toy_cost?: number;
}

export interface BabyCostResult {
    delivery: number;
    feeding: number;
    hygiene: number;
    clothing: number;
    healthYearly: number;
    childcare: number;
    gear: number;
    toys: number;

    standard_delivery: number;
    standard_feeding: number;
    standard_hygiene: number;
    standard_clothing: number;
    standard_healthYearly: number;
    standard_childcare: number;
    standard_gear: number;
    standard_toys: number;

    monthlyTotal: number;
    firstYearTotal: number;
    oneTime: number;
}

export async function calculateBabyCost(data: BabyCostRequest): Promise<BabyCostResult> {
    const response = await fetch(`${TOOLS_API_URL}/baby-cost-calculator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Failed to calculate baby cost');
    return await response.json();
}
