
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lang } from '../i18n/dictionary';

interface LanguageTransitionProps {
    isTransitioning: boolean;
    targetLang: Lang | null;
}

const languageNames: Record<Lang, string> = {
    en: 'English',
    hi: 'हिंदी',
    te: 'తెలుగు'
};

const gradients = [
    'bg-gradient-to-tr from-purple-200 via-pink-200 to-orange-200',
    'bg-gradient-to-bl from-orange-100 via-rose-100 to-purple-100',
    'bg-gradient-to-br from-purple-100 to-indigo-200',
    'bg-gradient-to-tl from-pink-100 via-rose-200 to-red-100',
    'bg-gradient-to-r from-teal-100 to-emerald-100', // Health theme
    'bg-gradient-to-tr from-blue-100 via-cyan-100 to-teal-100',
    'bg-gradient-to-t from-fuchsia-100 via-purple-100 to-pink-100',
    'bg-gradient-to-b from-rose-100 via-orange-100 to-amber-100',
    'bg-gradient-to-tr from-indigo-100 via-violet-200 to-purple-100',
];

const LanguageTransition: React.FC<LanguageTransitionProps> = ({ isTransitioning, targetLang }) => {
    const [currentGradient, setCurrentGradient] = useState(gradients[0]);

    useEffect(() => {
        if (isTransitioning) {
            const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
            setCurrentGradient(randomGradient);
        }
    }, [isTransitioning]);

    return (
        <AnimatePresence>
            {isTransitioning && (
                <motion.div
                    initial={{ clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)' }}
                    animate={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
                    exit={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                    transition={{
                        duration: 0.8,
                        ease: [0.645, 0.045, 0.355, 1.000]
                    }}
                    className={`fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none ${currentGradient}`}
                >
                    <motion.img
                        src="/toggle (2).svg"
                        alt="Language Toggle"
                        initial={{ opacity: 0, scale: 0.8, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -50 }}
                        transition={{ duration: 0.6, ease: "backOut", delay: 0.2 }}
                        className="w-96 h-96 mb-4"
                        style={{ mixBlendMode: 'multiply' }}
                    />
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-bold text-gray-800 font-serif tracking-tight drop-shadow-sm select-none"
                    >
                        {targetLang ? languageNames[targetLang] : ''}
                    </motion.h1>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LanguageTransition;
