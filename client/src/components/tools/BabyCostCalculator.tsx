import React, { useState, useEffect } from 'react';
import { ToolsLayout } from './ToolsLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { Badge } from '../ui/badge';
import { Baby, Stethoscope, Milk, Shirt, ShoppingBag, Car, Home, IndianRupee, Info, ToyBrick } from 'lucide-react';
import { calculateBabyCost, BabyCostRequest, BabyCostResult } from '../../api/toolsApi';

// --- DATA CONSTANTS (UI Only) ---

const CITIES = {
    METRO: { label: 'Metro City (Delhi, Mumbai, etc.)' },
    TIER2: { label: 'Tier-2 City (Pune, Jaipur, etc.)' },
    TIER3: { label: 'Tier-3 City / Town' },
};

const GEAR_ITEMS = [
    { id: 'cradle', label: 'Cradle / Bassinet (Jhula)' },
    { id: 'stroller', label: 'Stroller / Pram' },
    { id: 'carrier', label: 'Baby Carrier' },
    { id: 'carseat', label: 'Car Seat' },
    { id: 'walker', label: 'Baby Walker' },
    { id: 'bedding', label: 'Baby Bedding Set (Godadi)' },
    { id: 'mosquito_net', label: 'Mosquito Net' },
];

export default function BabyCostCalculator() {
    // --- STATE ---

    // Core Defaults
    const [city, setCity] = useState<string>('TIER2');

    // A: Pregnancy & Delivery
    const [hospitalType, setHospitalType] = useState<string>('PVT_STD');
    const [deliveryType, setDeliveryType] = useState<string>('NORMAL');
    const [customDelivery, setCustomDelivery] = useState<string>('');

    // B: Feeding
    const [feedingType, setFeedingType] = useState<string>('MIXED');
    const [formulaTier, setFormulaTier] = useState<string>('STD');
    const [customFeeding, setCustomFeeding] = useState<string>('');

    // C: Hygiene
    const [diapersPerDay, setDiapersPerDay] = useState([6]);
    const [diaperBrand, setDiaperBrand] = useState<string>('BRANDED');
    const [useWipes, setUseWipes] = useState(true);
    const [customHygiene, setCustomHygiene] = useState<string>('');

    // D: Clothing
    const [clothingTier, setClothingTier] = useState<string>('STANDARD');
    const [customClothing, setCustomClothing] = useState<string>('');

    // E: Healthcare
    const [healthType, setHealthType] = useState<string>('PVT_PED');
    const [customHealth, setCustomHealth] = useState<string>('');

    // F: Childcare
    const [childcare, setChildcare] = useState<string>('NONE');
    const [customChildcare, setCustomChildcare] = useState<string>('');

    // G: Gear
    const [gearSelections, setGearSelections] = useState<Record<string, { selected: boolean, type: 'budget' | 'premium' }>>({
        cradle: { selected: true, type: 'budget' },
        stroller: { selected: false, type: 'budget' },
        carrier: { selected: true, type: 'budget' },
        carseat: { selected: false, type: 'budget' },
        walker: { selected: false, type: 'budget' },
        bedding: { selected: true, type: 'budget' },
        mosquito_net: { selected: true, type: 'budget' },
    });
    const [customGear, setCustomGear] = useState<string>('');

    // H: Toys
    const [customToy, setCustomToy] = useState<string>('');

    // RESULT STATE
    const [costs, setCosts] = useState<BabyCostResult | null>(null);
    const [loading, setLoading] = useState(false);

    // --- EFFECT: Calculate on Change (Debounced) ---
    useEffect(() => {
        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                // Transform Gear State
                const backendGear: Record<string, string> = {};
                Object.entries(gearSelections).forEach(([key, val]) => {
                    if (val.selected) {
                        backendGear[key] = val.type;
                    }
                });

                const req: BabyCostRequest = {
                    city_tier: city,
                    hospital_type: hospitalType,
                    delivery_type: deliveryType,
                    custom_delivery_cost: customDelivery ? parseFloat(customDelivery) : undefined,

                    feeding_type: feedingType,
                    formula_tier: formulaTier,
                    custom_feeding_cost: customFeeding ? parseFloat(customFeeding) : undefined,

                    diapers_per_day: diapersPerDay[0],
                    diaper_brand: diaperBrand,
                    wipes_enabled: useWipes,
                    custom_hygiene_cost: customHygiene ? parseFloat(customHygiene) : undefined,

                    clothing_tier: clothingTier,
                    custom_clothing_cost: customClothing ? parseFloat(customClothing) : undefined,

                    health_type: healthType,
                    custom_health_cost: customHealth ? parseFloat(customHealth) : undefined,

                    childcare_type: childcare,
                    custom_childcare_cost: customChildcare ? parseFloat(customChildcare) : undefined,

                    gear_selection: backendGear,
                    custom_gear_cost: customGear ? parseFloat(customGear) : undefined,

                    custom_toy_cost: customToy ? parseFloat(customToy) : undefined
                };

                const res = await calculateBabyCost(req);
                setCosts(res);
            } catch (err) {
                console.error("Failed to calculate costs", err);
            } finally {
                setLoading(false);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [
        city, hospitalType, deliveryType, customDelivery,
        feedingType, formulaTier, customFeeding,
        diapersPerDay, diaperBrand, useWipes, customHygiene,
        clothingTier, customClothing,
        healthType, customHealth,
        childcare, customChildcare,
        gearSelections, customGear,
        customToy
    ]);

    // SYNC EFFECT: Update custom inputs when standard costs change (e.g. City/Type change)
    useEffect(() => {
        if (!costs) return;
        setCustomDelivery(costs.standard_delivery.toString());
        setCustomFeeding(costs.standard_feeding.toString());
        setCustomHygiene(costs.standard_hygiene.toString());
        setCustomClothing(costs.standard_clothing.toString());
        setCustomHealth(costs.standard_healthYearly.toString());
        setCustomChildcare(costs.standard_childcare.toString());
        setCustomGear(costs.standard_gear.toString());
        setCustomToy(costs.standard_toys.toString());
    }, [
        costs?.standard_delivery,
        costs?.standard_feeding,
        costs?.standard_hygiene,
        costs?.standard_clothing,
        costs?.standard_healthYearly,
        costs?.standard_childcare,
        costs?.standard_gear,
        costs?.standard_toys
    ]);

    // Helper to toggle gear
    const toggleGear = (id: string) => {
        setGearSelections(prev => ({
            ...prev,
            [id]: { ...prev[id], selected: !prev[id].selected }
        }));
    };

    const setGearType = (id: string, type: 'budget' | 'premium') => {
        setGearSelections(prev => ({
            ...prev,
            [id]: { ...prev[id], type }
        }));
    };

    return (
        <ToolsLayout
            title="Baby Cost Calculator (India)"
            description="Plan your finances with this detailed, India-focused baby cost estimator."
            category="PARENT"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: INPUTS */}
                <div className="lg:col-span-2 space-y-6">

                    {/* 0. CONFIG */}
                    <Card className="bg-purple-50 border-purple-100">
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <Label>Where do you live?</Label>
                                <Select value={city} onValueChange={setCity}>
                                    <SelectTrigger className="bg-white">
                                        <SelectValue placeholder="Select City Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(CITIES).map(([key, val]) => (
                                            <SelectItem key={key} value={key}>{val.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Accordion type="single" collapsible defaultValue="item-A" className="w-full">

                        {/* A. PREGNANCY & DELIVERY */}
                        <AccordionItem value="item-A" className="bg-white rounded-lg border mb-4 px-4">
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-pink-100 rounded-full text-pink-600"><Home className="w-5 h-5" /></div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900">Delivery & Hospital</h3>
                                        <p className="text-sm text-gray-500">One-time cost: ₹{costs?.delivery?.toLocaleString('en-IN') || 0}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Hospital Type</Label>
                                        <Select value={hospitalType} onValueChange={setHospitalType}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="GOVT">Government Hospital</SelectItem>
                                                <SelectItem value="PVT_STD">Private (Standard)</SelectItem>
                                                <SelectItem value="PVT_PREM">Private (Premium/Luxury)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Delivery Method</Label>
                                        <Select value={deliveryType} onValueChange={setDeliveryType}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="NORMAL">Normal Delivery</SelectItem>
                                                <SelectItem value="C_SECTION">C-Section</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="pt-2 border-t mt-2">
                                    <Label className="text-xs text-gray-500 uppercase tracking-wider">Custom Estimate (Optional)</Label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm font-semibold">₹</span>
                                        <Input
                                            type="number"
                                            placeholder="Calculated amount"
                                            value={customDelivery}
                                            onChange={(e) => setCustomDelivery(e.target.value)}
                                            onBlur={() => !customDelivery && costs?.standard_delivery && setCustomDelivery(costs.standard_delivery.toString())}
                                            className="h-9"
                                        />
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* B. FEEDING */}
                        <AccordionItem value="item-B" className="bg-white rounded-lg border mb-4 px-4">
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-full text-blue-600"><Milk className="w-5 h-5" /></div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900">Feeding</h3>
                                        <p className="text-sm text-gray-500">Monthly: ₹{costs?.feeding?.toLocaleString('en-IN') || 0}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 space-y-4">
                                <div className="space-y-2">
                                    <Label>Feeding Preference</Label>
                                    <div className="flex gap-2">
                                        {['BREAST', 'MIXED', 'FORMULA'].map((t) => (
                                            <Button
                                                key={t}
                                                variant={feedingType === t ? "default" : "outline"}
                                                onClick={() => setFeedingType(t)}
                                                className="flex-1 text-xs md:text-sm"
                                            >
                                                {t === 'BREAST' ? 'Breastfed' : t === 'MIXED' ? 'Mixed' : 'Formula'}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {feedingType !== 'BREAST' && (
                                    <div className="space-y-2 animate-in fade-in">
                                        <Label>Formula Brand Tier</Label>
                                        <Select value={formulaTier} onValueChange={setFormulaTier}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="BUDGET">Budget Friendly</SelectItem>
                                                <SelectItem value="STD">Standard Brands</SelectItem>
                                                <SelectItem value="PREM">Premium / Imported</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                                <div className="pt-2 border-t mt-2">
                                    <Label className="text-xs text-gray-500 uppercase tracking-wider">Custom Monthly Amount</Label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm font-semibold">₹</span>
                                        <Input
                                            type="number"
                                            placeholder="Override calculated cost"
                                            value={customFeeding}
                                            onChange={(e) => setCustomFeeding(e.target.value)}
                                            onBlur={() => !customFeeding && costs?.standard_feeding && setCustomFeeding(costs.standard_feeding.toString())}
                                            className="h-9"
                                        />
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* C. HYGIENE */}
                        <AccordionItem value="item-C" className="bg-white rounded-lg border mb-4 px-4">
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-full text-green-600"><ShoppingBag className="w-5 h-5" /></div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900">Diapers & Hygiene</h3>
                                        <p className="text-sm text-gray-500">Monthly: ₹{costs?.hygiene?.toLocaleString('en-IN') || 0}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <Label>Diapers per day: {diapersPerDay[0]}</Label>
                                    </div>
                                    <Slider
                                        value={diapersPerDay}
                                        onValueChange={setDiapersPerDay}
                                        max={12}
                                        step={1}
                                        className="py-2"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label>Use Premium Brands?</Label>
                                    <Switch
                                        checked={diaperBrand === 'BRANDED'}
                                        onCheckedChange={(c) => setDiaperBrand(c ? 'BRANDED' : 'BUDGET')}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label>Include Baby Wipes?</Label>
                                    <Switch
                                        checked={useWipes}
                                        onCheckedChange={setUseWipes}
                                    />
                                </div>
                                <div className="pt-2 border-t mt-2">
                                    <Label className="text-xs text-gray-500 uppercase tracking-wider">Custom Monthly Amount</Label>
                                    <Input
                                        type="number"
                                        placeholder="Override calculated cost"
                                        value={customHygiene}
                                        onChange={(e) => setCustomHygiene(e.target.value)}
                                        onBlur={() => !customHygiene && costs?.standard_hygiene && setCustomHygiene(costs.standard_hygiene.toString())}
                                        className="h-9 mt-1"
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* D. CLOTHING */}
                        <AccordionItem value="item-D" className="bg-white rounded-lg border mb-4 px-4">
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-yellow-100 rounded-full text-yellow-600"><Shirt className="w-5 h-5" /></div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900">Clothing</h3>
                                        <p className="text-sm text-gray-500">Monthly: ₹{costs?.clothing?.toLocaleString('en-IN') || 0}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4">
                                <div className="space-y-4">
                                    <Label>Shopping Preference</Label>
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            variant={clothingTier === 'BUDGET' ? "default" : "outline"}
                                            onClick={() => setClothingTier('BUDGET')}
                                            className="justify-between"
                                        >
                                            Budget / Essentials
                                        </Button>
                                        <Button
                                            variant={clothingTier === 'STANDARD' ? "default" : "outline"}
                                            onClick={() => setClothingTier('STANDARD')}
                                            className="justify-between"
                                        >
                                            Standard / Mix
                                        </Button>
                                        <Button
                                            variant={clothingTier === 'PREMIUM' ? "default" : "outline"}
                                            onClick={() => setClothingTier('PREMIUM')}
                                            className="justify-between"
                                        >
                                            Premium / Brands
                                        </Button>
                                    </div>
                                    <p className="text-xs text-gray-400">Includes recurring purchases as babies outgrow clothes quickly.</p>
                                    <div className="pt-2 border-t mt-2">
                                        <Label className="text-xs text-gray-500 uppercase tracking-wider">Custom Monthly Amount</Label>
                                        <Input
                                            type="number"
                                            placeholder="Override calculated cost"
                                            value={customClothing}
                                            onChange={(e) => setCustomClothing(e.target.value)}
                                            onBlur={() => !customClothing && costs?.standard_clothing && setCustomClothing(costs.standard_clothing.toString())}
                                            className="h-9 mt-1"
                                        />
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* E. HEALTHCARE */}
                        <AccordionItem value="item-E" className="bg-white rounded-lg border mb-4 px-4">
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-100 rounded-full text-red-600"><Stethoscope className="w-5 h-5" /></div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900">Healthcare</h3>
                                        <p className="text-sm text-gray-500">Yearly: ₹{costs?.healthYearly?.toLocaleString('en-IN') || 0}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Pediatrician / Hospital Choice</Label>
                                        <Select value={healthType} onValueChange={setHealthType}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="GOVT">Government / Trust</SelectItem>
                                                <SelectItem value="PVT_PED">Private Clinic</SelectItem>
                                                <SelectItem value="PVT_PLUS">Premium / Corporate Hospital</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="pt-2 border-t mt-2">
                                        <Label className="text-xs text-gray-500 uppercase tracking-wider">Custom Yearly Amount</Label>
                                        <Input
                                            type="number"
                                            placeholder="Override calculated cost"
                                            value={customHealth}
                                            onChange={(e) => setCustomHealth(e.target.value)}
                                            onBlur={() => !customHealth && costs?.standard_healthYearly && setCustomHealth(costs.standard_healthYearly.toString())}
                                            className="h-9 mt-1"
                                        />
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* F. CHILDCARE */}
                        <AccordionItem value="item-F" className="bg-white rounded-lg border mb-4 px-4">
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 rounded-full text-purple-600"><Baby className="w-5 h-5" /></div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900">Childcare / Nanny</h3>
                                        <p className="text-sm text-gray-500">Monthly: ₹{costs?.childcare?.toLocaleString('en-IN') || 0}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 space-y-4">
                                <div className="space-y-2">
                                    <Label>Help Required</Label>
                                    <Select value={childcare} onValueChange={setChildcare}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="NONE">No / Family Support</SelectItem>
                                            <SelectItem value="PART_TIME">Part-Time Help</SelectItem>
                                            <SelectItem value="FULL_TIME">Full-Time Nanny</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="pt-2 border-t mt-2">
                                    <Label className="text-xs text-gray-500 uppercase tracking-wider">Custom Monthly Amount</Label>
                                    <Input
                                        type="number"
                                        placeholder="Override calculated cost"
                                        value={customChildcare}
                                        onChange={(e) => setCustomChildcare(e.target.value)}
                                        onBlur={() => !customChildcare && costs?.standard_childcare && setCustomChildcare(costs.standard_childcare.toString())}
                                        className="h-9 mt-1"
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* G. GEAR */}
                        <AccordionItem value="item-G" className="bg-white rounded-lg border mb-4 px-4">
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-100 rounded-full text-orange-600"><Car className="w-5 h-5" /></div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900">Baby Gear</h3>
                                        <p className="text-sm text-gray-500">One-time: ₹{costs?.gear?.toLocaleString('en-IN') || 0}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 space-y-4">
                                {GEAR_ITEMS.map((item) => (
                                    <div key={item.id} className="flex flex-col gap-2 pb-3 border-b last:border-0 border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <Label className="font-medium">{item.label}</Label>
                                            <Switch
                                                checked={gearSelections[item.id].selected}
                                                onCheckedChange={() => toggleGear(item.id)}
                                            />
                                        </div>
                                        {gearSelections[item.id].selected && (
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant={gearSelections[item.id].type === 'budget' ? 'secondary' : 'ghost'}
                                                    onClick={() => setGearType(item.id, 'budget')}
                                                    className="h-7 text-xs"
                                                >
                                                    Budget
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant={gearSelections[item.id].type === 'premium' ? 'secondary' : 'ghost'}
                                                    onClick={() => setGearType(item.id, 'premium')}
                                                    className="h-7 text-xs"
                                                >
                                                    Premium
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="pt-2 mt-2">
                                    <Label className="text-xs text-gray-500 uppercase tracking-wider">Custom Total Gear Cost</Label>
                                    <Input
                                        type="number"
                                        placeholder="Override calculated cost"
                                        value={customGear}
                                        onChange={(e) => setCustomGear(e.target.value)}
                                        onBlur={() => !customGear && costs?.standard_gear && setCustomGear(costs.standard_gear.toString())}
                                        className="h-9 mt-1"
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* H. TOYS */}
                        <AccordionItem value="item-H" className="bg-white rounded-lg border mb-4 px-4">
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 rounded-full text-indigo-600"><ToyBrick className="w-5 h-5" /></div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900">Toys & Misc</h3>
                                        <p className="text-sm text-gray-500">Monthly: ₹{costs?.toys?.toLocaleString('en-IN') || 0}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 space-y-4">
                                <Label>Estimated Monthly Budget</Label>
                                <Input
                                    type="number"
                                    value={customToy}
                                    onChange={(e) => setCustomToy(e.target.value)}
                                    onBlur={() => !customToy && costs?.standard_toys && setCustomToy(costs.standard_toys.toString())}
                                    className="h-9"
                                />
                                <p className="text-xs text-gray-500">Includes toys, rattles, books, and small misc items.</p>
                            </AccordionContent>
                        </AccordionItem>

                    </Accordion>
                </div>

                {/* RIGHT COLUMN: SUMMARY (Sticky) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <Card className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-xl border-0 overflow-hidden relative">
                            {/* Decorative background circle */}
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>

                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-medium text-purple-100 flex items-center gap-2">
                                    <IndianRupee className="w-5 h-5" /> Estimated Cost
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {costs ? (
                                    <>
                                        <div className="animate-in fade-in zoom-in-95 duration-300">
                                            <p className="text-purple-200 text-sm mb-1">Monthly Recurring</p>
                                            <div className="text-4xl font-bold tracking-tight">
                                                ₹ {costs.monthlyTotal.toLocaleString('en-IN')}
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-white/20 animate-in fade-in zoom-in-95 duration-500">
                                            <p className="text-purple-200 text-sm mb-1">First Year Total</p>
                                            <div className="text-2xl font-semibold opacity-90">
                                                ₹ {costs.firstYearTotal.toLocaleString('en-IN')}
                                            </div>
                                            <p className="text-xs text-purple-200 mt-2">
                                                Includes ₹{costs.oneTime.toLocaleString('en-IN')} one-time costs
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-10 opacity-50">
                                        <p className="text-sm">Calculating...</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800 flex gap-3">
                            <Info className="w-5 h-5 shrink-0 text-blue-600" />
                            <p>
                                This estimate considers default Indian market rates. Your custom inputs are prioritized.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </ToolsLayout>
    );
}
