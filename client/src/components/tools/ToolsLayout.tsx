
import React, { ReactNode } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '../ui/button';

interface ToolsLayoutProps {
    children: ReactNode;
    title: string;
    description?: string;
    category: 'TTC' | 'PREGNANT' | 'PARENT' | 'HEALTH';
}

const CATEGORY_COLORS = {
    TTC: 'text-pink-600 bg-pink-50',
    PREGNANT: 'text-purple-600 bg-purple-50',
    PARENT: 'text-blue-600 bg-blue-50',
    HEALTH: 'text-green-600 bg-green-50'
};

const CATEGORY_LABELS = {
    TTC: 'Getting Pregnant',
    PREGNANT: 'Pregnancy',
    PARENT: 'Baby & Toddler',
    HEALTH: 'Health & Wellness'
};

export function ToolsLayout({ children, title, description, category }: ToolsLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-30">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/tools">
                            <Button variant="ghost" size="icon" className="-ml-2">
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Button>
                        </Link>
                        <div>
                            <div className={`text-xs font-bold px-2 py-0.5 rounded-full w-fit mb-1 ${CATEGORY_COLORS[category]}`}>
                                {CATEGORY_LABELS[category]}
                            </div>
                            <h1 className="text-xl font-bold text-gray-900 leading-none">{title}</h1>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon">
                        <Share2 className="w-5 h-5 text-gray-500" />
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 max-w-4xl">
                {description && (
                    <p className="text-gray-600 mb-6">{description}</p>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                    {children}
                </div>

                <div className="mt-8 text-center text-xs text-gray-500 max-w-2xl mx-auto">
                    Disclaimer: This tool is for informational purposes only and is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </div>
            </div>
        </div>
    );
}
