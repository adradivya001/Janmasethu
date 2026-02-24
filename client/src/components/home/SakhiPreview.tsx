import { useRef } from "react";
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

    // Scroll animation refs & hooks
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 85%", "center center"]
    });

    // Map scroll progress to horizontal translation (x-axis) and opacity
    // Left side (text) slides in from the bottom-left
    const leftSideX = useTransform(scrollYProgress, [0, 1], [-250, 0]);
    const leftSideY = useTransform(scrollYProgress, [0, 1], [250, 0]);
    const leftSideOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

    // Right side (phone) slides in from the bottom-right
    const rightSideX = useTransform(scrollYProgress, [0, 1], [250, 0]);
    const rightSideY = useTransform(scrollYProgress, [0, 1], [250, 0]);
    const rightSideOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section ref={sectionRef} className="py-16 overflow-hidden">
            <div className="bg-gradient-to-br from-pink-100 to-orange-100 rounded-[3rem] p-8 md:p-16 max-w-7xl mx-auto shadow-md ring-1 ring-black/5">

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

                {/* === DESKTOP LAYOUT (Animated with Scroll) === */}
                <div className="hidden lg:grid sakhi-preview-mobile grid-cols-2 gap-12 items-center">
                    <motion.div
                        className="text-left"
                        style={{ x: leftSideX, y: leftSideY, opacity: leftSideOpacity }}
                    >
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
                    </motion.div>

                    {/* Rotating Sakhi Image */}
                    <motion.div
                        className="flex justify-center items-center perspective-1000"
                        style={{ x: rightSideX, y: rightSideY, opacity: rightSideOpacity }}
                    >
                        <SakhiRotatingImage />
                    </motion.div>
                </div>

            </div>
        </section>
    );
}

function SakhiRotatingImage() {
    return (
        <img
            src="/Sakhi PH.svg"
            alt="Sakhi Preview"
            className="w-full max-w-none object-contain drop-shadow-2xl scale-110 md:scale-125 lg:scale-150 transform-gpu"
        />
    );
}
