import { Link, useLocation } from "wouter";
import { useLanguage } from "../../i18n/LanguageProvider";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import AnimatedButton from "../AnimatedButton";
import { Input } from "../ui/input";
import { ArrowRight, Heart, Send } from "lucide-react";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";

export default function SakhiPreview() {
    const { t } = useLanguage();
    const [, setLocation] = useLocation();

    return (
        <section className="py-16">
            <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-3xl p-8 md:p-12">

                {/* === MOBILE LAYOUT === */}
                <div className="lg:hidden flex flex-col items-center text-center">
                    {/* Title & Subtitle */}
                    <h2
                        className="text-2xl font-bold text-pink-600 mb-4"
                        data-testid="text-sakhi-hero"
                        dangerouslySetInnerHTML={{ __html: t("sakhi_hero") }}
                    ></h2>
                    <p
                        className="text-sm text-muted-foreground mb-6"
                        data-testid="text-sakhi-sub"
                    >
                        {t("sakhi_sub")}
                    </p>

                    {/* Phone Image - Big and prominent */}
                    <div className="w-[85%] mb-8">
                        <SakhiRotatingImage />
                    </div>

                    {/* How Sakhi Works */}
                    <h3
                        className="text-xl font-bold text-pink-600 mb-4"
                        data-testid="text-sakhi-how-title"
                    >
                        {t("sakhi_how_title")}
                    </h3>
                    <ul className="space-y-3 mb-8 text-left w-full">
                        {t("sakhi_how_list")
                            .split("|")
                            .filter((item: string) => item.trim().length > 0)
                            .map((item: string, index: number) => (
                                <li
                                    key={index}
                                    className="flex items-start space-x-3"
                                    data-testid={`item-sakhi-help-${index}`}
                                >
                                    <Heart className="text-pink-500 w-4 h-4 mt-1 flex-shrink-0" />
                                    <span className="text-muted-foreground text-sm">
                                        {item.trim()}
                                    </span>
                                </li>
                            ))}
                    </ul>

                    {/* CTA */}
                    <AnimatedButton
                        onClick={() => setLocation("/sakhi")}
                        className="gradient-button-secondary text-white shadow-lg text-base hover:shadow-xl transition-all duration-300"
                        data-testid="button-try-sakhi"
                    >
                        {t("sakhi_try")}
                    </AnimatedButton>
                </div>

                {/* === DESKTOP LAYOUT (unchanged) === */}
                <div className="hidden lg:grid sakhi-preview-mobile grid-cols-2 gap-12 items-center">
                    <div className="text-left">
                        <h2
                            className="text-4xl font-bold text-pink-600 mb-6"
                            data-testid="text-sakhi-hero"
                            dangerouslySetInnerHTML={{ __html: t("sakhi_hero") }}
                        ></h2>
                        <p
                            className="text-lg text-muted-foreground mb-8"
                            data-testid="text-sakhi-sub"
                        >
                            {t("sakhi_sub")}
                        </p>

                        <h3
                            className="text-2xl font-bold text-pink-600 mb-4"
                            data-testid="text-sakhi-how-title"
                        >
                            {t("sakhi_how_title")}
                        </h3>
                        <ul className="space-y-3 mb-8 text-left">
                            {t("sakhi_how_list")
                                .split("|")
                                .filter((item: string) => item.trim().length > 0)
                                .map((item: string, index: number) => (
                                    <li
                                        key={index}
                                        className="flex items-start space-x-3"
                                        data-testid={`item-sakhi-help-${index}`}
                                    >
                                        <Heart className="text-pink-500 w-5 h-5 mt-1 flex-shrink-0" />
                                        <span className="text-muted-foreground text-base">
                                            {item.trim()}
                                        </span>
                                    </li>
                                ))}
                        </ul>

                        <div className="flex justify-start">
                            <AnimatedButton
                                onClick={() => setLocation("/sakhi")}
                                className="gradient-button-secondary text-white shadow-lg text-lg hover:shadow-xl transition-all duration-300"
                                data-testid="button-try-sakhi"
                            >
                                {t("sakhi_try")}
                            </AnimatedButton>
                        </div>
                    </div>

                    {/* Rotating Sakhi Image */}
                    <div className="flex justify-center items-center perspective-1000">
                        <SakhiRotatingImage />
                    </div>
                </div>

            </div>
        </section>
    );
}

function SakhiRotatingImage() {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    // Map velocity to rotation: 
    // Positive velocity (scrolling down) -> Positive rotation (Clockwise)
    // Negative velocity (scrolling up) -> Negative rotation (Counter-Clockwise)
    // Range: 1000px/s -> 45deg tilt? Or full spin?
    // User said "circular turn". 
    // Let's try a full 360 for high speed to make it visible.
    // If not scrolling (vel=0), stays straight (0).
    const rotate = useTransform(smoothVelocity, [-2000, 0, 2000], [-360, 0, 360], { clamp: false });

    return (
        <motion.img
            src="/Sakhi PH.svg"
            alt="Sakhi Preview"
            style={{ rotate }}
            className="w-full max-w-none object-contain drop-shadow-2xl"
        />
    );
}
