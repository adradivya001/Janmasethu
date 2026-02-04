
export const TTC_READINESS_ITEMS = [
    {
        category: "Medical",
        items: [
            { id: "med_1", text: "Schedule a preconception checkup" },
            { id: "med_2", text: "Start taking folic acid (400mcg daily)" },
            { id: "med_3", text: "Check immunization history (Rubella, Varicella)" },
            { id: "med_4", text: "Review current medications with your doctor" },
            { id: "med_5", text: "Get a dental checkup" }
        ]
    },
    {
        category: "Lifestyle",
        items: [
            { id: "life_1", text: "Stop smoking and limit alcohol" },
            { id: "life_2", text: "Reduce caffeine intake (<200mg/day)" },
            { id: "life_3", text: "Maintain a healthy BMI range" },
            { id: "life_4", text: "Establish a regular sleep schedule" },
            { id: "life_5", text: "Identify and reduce sources of stress" }
        ]
    },
    {
        category: "Financial (India Context)",
        items: [
            { id: "fin_1", text: "Review maternity insurance coverage (waiting periods?)" },
            { id: "fin_2", text: "Create a baby budget (delivery costs, vaccinations)" },
            { id: "fin_3", text: "Check employer's maternity leave policy" },
            { id: "fin_4", text: "Start an emergency fund" }
        ]
    },
    {
        category: "Conversation",
        items: [
            { id: "conv_1", text: "Discuss parenting styles with partner" },
            { id: "conv_2", text: "Talk about family involvement/support" },
            { id: "conv_3", text: "Agree on career/work-life balance expectations" }
        ]
    }
];

export const SAFETY_ITEMS = [
    { id: "safe_1", name: "Papaya (Ripe)", category: "Food", status: "SAFE", note: "Ripe papaya is safe and healthy." },
    { id: "safe_2", name: "Papaya (Unripe/Semi-ripe)", category: "Food", status: "AVOID", note: "Contains latex which may trigger contractions." },
    { id: "safe_3", name: "Paracetamol", category: "App", status: "SAFE", note: "Generally considered safe for pain/fever. Consult dosage." },
    { id: "safe_4", name: "Ibuprofen", category: "Meds", status: "AVOID", note: "Avoid, especially in third trimester. Use Paracetamol instead." },
    { id: "safe_5", name: "Sushi (Raw Fish)", category: "Food", status: "AVOID", note: "Risk of parasites/bacteria. Cooked fish is fine." },
    { id: "safe_6", name: "Coffee", category: "Drink", status: "CAUTION", note: "Limit to 200mg caffeine per day (approx 1-2 cups)." },
    { id: "safe_7", name: "Yoga", category: "Activity", status: "SAFE", note: "Prenatal yoga is excellent. Avoid hot yoga or lying on back after 1st trimester." },
    { id: "safe_8", name: "Hair Dye", category: "Beauty", status: "CAUTION", note: "Wait until second trimester to be safe. Use well-ventilated area." },
    { id: "safe_9", name: "Flying", category: "Activity", status: "SAFE", note: "Generally safe until 36 weeks. Check airline policy." },
    { id: "safe_10", name: "Retinol/Vitamin A", category: "Beauty", status: "AVOID", note: "High doses can cause birth defects. Switch to Bakuchiol." }
];
