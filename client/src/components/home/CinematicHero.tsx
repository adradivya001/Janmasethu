import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import AnimatedButton from "../AnimatedButton";
import { Link, useLocation } from "wouter";
import { useLanguage } from "../../i18n/LanguageProvider";
import NavButton from "../NavButton";
import { cn } from "../../lib/utils";

const CinematicHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { t, lang } = useLanguage();
    const [location] = useLocation();

    const navConfig = [
        { key: "nav_home", href: "/" },
        { key: "nav_knowledge", href: "/knowledge-hub" },
        { key: "nav_sakhi", href: "/sakhi" },
        { key: "nav_tools", href: "/tools" },
        { key: "nav_treatments", href: "/treatments" },
        { key: "nav_success", href: "/success-stories" },
        { key: "nav_blog", href: "/blog" },
        { key: "nav_experts", href: "/experts" },
        { key: "nav_investors", href: "/investors" },
    ];

    // Scroll progress for the entire container depth
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth out the scroll progress for animation
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // ... (Keep Image Logic) ...
    // --- Image Sequence Logic ---
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const frameCount = 120;

    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const frameNumber = i.toString().padStart(3, '0');
            img.src = `/lady hero banner/ezgif-frame-${frameNumber}.jpg`;
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    // Sync Canvas with Scroll
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        if (!canvasRef.current || images.length === 0) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        const frameIndex = Math.min(
            Math.floor(latest * (frameCount - 1)),
            frameCount - 1
        );

        const img = images[frameIndex];
        if (img && img.complete) {
            const dpr = window.devicePixelRatio || 1;
            // Use getBoundingClientRect to get true rendered size of the container
            const rect = canvasRef.current.getBoundingClientRect();

            canvasRef.current.width = rect.width * dpr;
            canvasRef.current.height = rect.height * dpr;
            ctx.scale(dpr, dpr);

            const canvasWidth = rect.width;
            const canvasHeight = rect.height;
            const isMobile = canvasWidth < 768;
            const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height);
            // On mobile: shift image right so the lady (left side of frame) is visible & centered
            // On desktop: center normally
            const x = isMobile
                ? (canvasWidth * 1.15) - (img.width / 2) * scale
                : (canvasWidth / 2) - (img.width / 2) * scale;
            // On mobile: position vertically so lady's full figure is visible
            const y = isMobile
                ? (canvasHeight - img.height * scale) * 0.25
                : (canvasHeight - img.height * scale) * 0.15;

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
    });

    // Ensure initial render on refresh/load
    useEffect(() => {
        if (images.length > 0 && canvasRef.current) {
            const render = () => {
                if (!canvasRef.current) return;
                const ctx = canvasRef.current.getContext("2d");
                if (!ctx) return;

                // Get current frame based on scroll position
                const latest = smoothProgress.get();
                const frameIndex = Math.min(
                    Math.floor(latest * (frameCount - 1)),
                    frameCount - 1
                );
                const img = images[frameIndex];

                if (img && (img.complete || img.naturalWidth > 0)) {
                    const dpr = window.devicePixelRatio || 1;
                    const rect = canvasRef.current.getBoundingClientRect();

                    canvasRef.current.width = rect.width * dpr;
                    canvasRef.current.height = rect.height * dpr;
                    ctx.scale(dpr, dpr);

                    const canvasWidth = rect.width;
                    const canvasHeight = rect.height;
                    const isMobile = canvasWidth < 768;
                    const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height);
                    const x = isMobile
                        ? (canvasWidth * 1.15) - (img.width / 2) * scale
                        : (canvasWidth / 2) - (img.width / 2) * scale;
                    const y = isMobile
                        ? (canvasHeight - img.height * scale) * 0.25
                        : (canvasHeight - img.height * scale) * 0.15;

                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = "high";
                    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                }
            };

            // Initial render attempts with delays to allow layout/fonts to settle
            render();
            const t1 = setTimeout(render, 50);
            const t2 = setTimeout(render, 200);

            // Also trigger on first image load
            if (images[0] && !images[0].complete) {
                images[0].onload = render;
            }

            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
            };
        }
    }, [images, smoothProgress]);


    // --- Text Opacity Transformations ---
    // Phase 1: 0 - 30%
    const opacityPhase1 = useTransform(smoothProgress, [0, 0.25, 0.35], [1, 1, 0]);
    const yPhase1 = useTransform(smoothProgress, [0, 0.3], [0, -20]);

    // Phase 2: 30% - 65%
    const opacityPhase2 = useTransform(smoothProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
    const yPhase2 = useTransform(smoothProgress, [0.3, 0.45], [20, 0]);

    // Phase 3: 65% - 100%
    const opacityPhase3 = useTransform(smoothProgress, [0.65, 0.75, 1], [0, 1, 1]);
    const yPhase3 = useTransform(smoothProgress, [0.65, 0.8], [20, 0]);

    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            // Hide the fixed layer once the Cinematic Hero scroll region is scrolled past.
            // This prevents it from bleeding into the sticky footer gap at the bottom of the page.
            setIsHidden(rect.bottom <= 0);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="bg-[#FFF1EC] md:-mt-[48px]">
            {/* Fixed layer stays perfectly in place while the scroll container pushes the page */}
            <div className={`fixed top-[56px] md:top-[64px] left-0 right-0 h-[calc(100vh-56px)] md:h-[calc(100vh-64px)] w-full overflow-hidden z-[15] ${isHidden ? 'hidden' : ''}`}>

                {/* Embedded Secondary Nav - Moves with Hero */}
                <div className="absolute top-0 left-0 right-0 z-40 hidden md:block">
                    <div className="w-full bg-white py-0.5 border-b border-gray-100/50 shadow-sm">
                        <div className="container mx-auto px-4">
                            <nav className="w-full">
                                <ul className="flex items-center justify-between w-full">
                                    {navConfig.map((item) => (
                                        <li key={item.key} className="flex-shrink-0">
                                            <Link href={item.href}>
                                                <NavButton label={t(item.key)} isActive={location === item.href} />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Full Screen Visuals (Canvas) */}
                <div
                    className="absolute inset-0 w-full h-full bg-[#FFF1EC]"
                >
                    {/* Fallback Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
                        style={{ backgroundImage: 'url("/lady hero banner/ezgif-frame-001.jpg")' }}
                    />

                    <canvas
                        ref={canvasRef}
                        className="relative z-10 w-full h-full block object-cover"
                    />
                    <div className="absolute inset-0 bg-white/30 z-20 pointer-events-none" />
                </div>

                {/* Narrative Container */}
                {/* Mobile: right-half only, beside the lady. Desktop: right-aligned as before */}
                <div className="absolute inset-0 z-30 pointer-events-none">
                    {/* Mobile layout: text pinned to right half */}
                    <div className="absolute top-5 right-2 left-[45%] bottom-auto md:hidden pointer-events-auto">
                        <div className="relative min-h-[180px] flex flex-col justify-center text-right">
                            {/* Phase 1 */}
                            <motion.div
                                style={{ opacity: opacityPhase1, y: yPhase1 }}
                                className="absolute top-0 left-0 w-full"
                            >
                                <h2 className="text-[8px] font-bold tracking-[0.12em] text-black/70 mb-1 uppercase font-sans">
                                    {t('hero_phase1_sub')}
                                </h2>
                                <h1 className={cn("font-aligin font-medium text-pink-600", lang === 'en' ? "text-xl leading-tight" : "text-lg leading-tight")}>
                                    {t('hero_phase1_main')}{lang === 'en' ? <br /> : " "}
                                    <span className="text-pink-500">{t('hero_phase1_span')}</span>
                                </h1>
                            </motion.div>

                            {/* Phase 2 */}
                            <motion.div
                                style={{ opacity: opacityPhase2, y: yPhase2 }}
                                className="absolute top-0 left-0 w-full"
                            >
                                <h2 className="text-[8px] font-bold tracking-[0.12em] text-black/70 mb-1 uppercase font-sans">
                                    {t('hero_phase2_sub')}
                                </h2>
                                <h1 className={cn("font-aligin font-medium text-pink-600", lang === 'en' ? "text-xl leading-tight" : "text-lg leading-tight")}>
                                    {t('hero_phase2_main')}{lang === 'en' ? <br /> : " "}
                                    {t('hero_phase2_main_2')} <span className="text-pink-500">{t('hero_phase2_span')}</span>
                                </h1>
                            </motion.div>

                            {/* Phase 3 */}
                            <motion.div
                                style={{ opacity: opacityPhase3, y: yPhase3 }}
                                className="absolute top-0 left-0 w-full"
                            >
                                <h2 className="text-[8px] font-bold tracking-[0.12em] text-black/70 mb-1 uppercase font-sans">
                                    {t('hero_phase3_sub')}
                                </h2>
                                <h1 className={cn("font-aligin font-medium text-pink-600", lang === 'en' ? "text-xl leading-tight" : "text-lg leading-tight")}>
                                    {t('hero_phase3_main')}{lang === 'en' ? <br /> : " "}
                                    <span className="text-pink-500">{t('hero_phase3_span')}</span>
                                </h1>
                            </motion.div>
                        </div>

                        {/* Mobile CTAs - small and compact */}
                        <div className="flex flex-col items-end gap-1.5 mt-2">
                            <Link href="/sakhi">
                                <AnimatedButton className="bg-gradient-to-r from-purple-600 to-pink-500 shadow-md text-white border-0 text-[10px] !h-7 !py-0 !pl-2.5 !pr-9">
                                    {t('hero_cta_sakhi')}
                                </AnimatedButton>
                            </Link>
                            <Link href="/register">
                                <button className="px-3 py-1.5 rounded-full border border-gray-900/10 text-gray-900 font-medium hover:bg-white/50 transition-all font-sans text-[10px] tracking-wide">
                                    {t('hero_cta_register')}
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Desktop layout: unchanged */}
                    <div className="hidden md:flex absolute inset-0 items-center justify-end px-16 pointer-events-none">
                        <div className="w-full max-w-lg pointer-events-auto mr-10 lg:mr-20">
                            <div className="relative min-h-[350px] flex flex-col justify-center text-left">
                                {/* Phase 1 */}
                                <motion.div
                                    style={{ opacity: opacityPhase1, y: yPhase1 }}
                                    className="absolute top-0 left-0 w-full"
                                >
                                    <h2 className="text-sm font-bold tracking-[0.2em] text-black mb-4 uppercase font-sans">
                                        {t('hero_phase1_sub')}
                                    </h2>
                                    <h1 className={cn("font-aligin font-medium text-pink-600 mb-8", lang === 'en' ? "text-5xl lg:text-7xl leading-[1.1]" : "text-4xl lg:text-5xl leading-tight")}>
                                        {t('hero_phase1_main')}{lang === 'en' ? <br /> : " "}
                                        <span className="text-pink-500">{t('hero_phase1_span')}</span>
                                    </h1>
                                </motion.div>

                                {/* Phase 2 */}
                                <motion.div
                                    style={{ opacity: opacityPhase2, y: yPhase2 }}
                                    className="absolute top-0 left-0 w-full"
                                >
                                    <h2 className="text-sm font-bold tracking-[0.2em] text-black mb-4 uppercase font-sans">
                                        {t('hero_phase2_sub')}
                                    </h2>
                                    <h1 className={cn("font-aligin font-medium text-pink-600 mb-10", lang === 'en' ? "text-5xl lg:text-7xl leading-[1.1]" : "text-4xl lg:text-5xl leading-tight")}>
                                        {t('hero_phase2_main')}{lang === 'en' ? <br /> : " "}
                                        {t('hero_phase2_main_2')} <span className="text-pink-500">{t('hero_phase2_span')}</span>
                                    </h1>
                                </motion.div>

                                {/* Phase 3 */}
                                <motion.div
                                    style={{ opacity: opacityPhase3, y: yPhase3 }}
                                    className="absolute top-0 left-0 w-full"
                                >
                                    <h2 className="text-sm font-bold tracking-[0.2em] text-black mb-4 uppercase font-sans">
                                        {t('hero_phase3_sub')}
                                    </h2>
                                    <h1 className={cn("font-aligin font-medium text-pink-600 mb-8", lang === 'en' ? "text-5xl lg:text-7xl leading-[1.1]" : "text-4xl lg:text-5xl leading-tight")}>
                                        {t('hero_phase3_main')}{lang === 'en' ? <br /> : " "}
                                        <span className="text-pink-500">{t('hero_phase3_span')}</span>
                                    </h1>
                                </motion.div>
                            </div>

                            {/* Desktop CTAs */}
                            <div className="flex flex-row items-center gap-4 mt-4">
                                <Link href="/sakhi">
                                    <AnimatedButton className="bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg hover:shadow-purple-500/40 text-white border-0">
                                        {t('hero_cta_sakhi')}
                                    </AnimatedButton>
                                </Link>
                                <Link href="/register">
                                    <button className="px-6 py-3 rounded-full border border-gray-900/10 text-gray-900 font-medium hover:bg-white/50 hover:border-gray-900/30 transition-all font-sans text-sm tracking-wide">
                                        {t('hero_cta_register')}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Container (just height) - this triggers useScroll without scrolling the fixed hero */}
            <div ref={containerRef} className="relative h-[300vh] md:h-[450vh] z-[1] pointer-events-none" />
        </div>
    );
};

export default CinematicHero;
