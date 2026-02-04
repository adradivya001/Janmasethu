
import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Calendar, Baby, Heart, Syringe, Activity, Calculator, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

interface Tool {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    href: string;
    category: 'TTC' | 'PREGNANT' | 'PARENT' | 'HEALTH';
    color: string;
}

const TOOLS: Tool[] = [
    {
        id: 'ovulation-calc',
        title: 'Ovulation Calculator',
        description: 'Find your most fertile days to maximize your chances of conceiving.',
        icon: Heart,
        href: '/tools/ovulation-calculator',
        category: 'TTC',
        color: 'text-pink-500 bg-pink-50'
    },
    {
        id: 'due-date-calc',
        title: 'Due Date Calculator',
        description: 'Calculate your estimated due date based on your last period.',
        icon: Calendar,
        href: '/tools/due-date-calculator',
        category: 'PREGNANT',
        color: 'text-purple-500 bg-purple-50'
    },
    {
        id: 'pregnancy-weeks',
        title: 'Pregnancy Week by Week',
        description: 'Track your baby\'s development with fun fruit comparisons.',
        icon: Baby,
        href: '/tools/pregnancy-week-by-week',
        category: 'PREGNANT',
        color: 'text-purple-500 bg-purple-50'
    },
    {
        id: 'vaccination-scheduler',
        title: 'Vaccination Scheduler',
        description: 'Never miss a shot with our IAP-based immunization tracker.',
        icon: Syringe,
        href: '/tools/vaccination-scheduler',
        category: 'PARENT',
        color: 'text-blue-500 bg-blue-50'
    }
];

export default function Tools() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-purple-50 to-white py-12 md:py-20 text-center px-4">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
                    Essential Tools for Your Journey
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    From planning a pregnancy to raising a healthy child, our interactive calculators and trackers are here to help you every step of the way.
                </p>
            </div>

            <div className="container mx-auto px-4 py-12 pb-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TOOLS.map((tool) => (
                        <Link key={tool.id} href={tool.href}>
                            <Card className="h-full hover:shadow-lg transition-all border-l-4 hover:-translate-y-1 cursor-pointer group" style={{ borderLeftColor: tool.color.includes('pink') ? '#ec4899' : tool.color.includes('purple') ? '#9333ea' : '#3b82f6' }}>
                                <CardHeader>
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tool.color}`}>
                                        <tool.icon className="w-6 h-6" />
                                    </div>
                                    <CardTitle className="text-xl group-hover:text-purple-700 transition-colors">
                                        {tool.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base mb-6">
                                        {tool.description}
                                    </CardDescription>
                                    <div className="flex items-center text-sm font-semibold text-gray-900 group-hover:gap-2 transition-all">
                                        Open Tool <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}

                    {/* Placeholder for future tools */}
                    <Card className="h-full bg-gray-50 border-dashed border-2 border-gray-200 flex flex-col items-center justify-center text-center p-8 opacity-70">
                        <div className="bg-gray-100 p-3 rounded-full mb-4">
                            <Activity className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="font-semibold text-gray-500">More Tools Coming Soon</h3>
                        <p className="text-sm text-gray-400 mt-2">Weight gain tracker, kick counter, and more.</p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
