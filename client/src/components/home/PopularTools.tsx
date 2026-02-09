import { Link } from "wouter";
import {
    Calendar,
    Baby,
    Activity,
    Calculator,
    Heart,
    Stethoscope,
    Clock,
    MessageCircle,
    Thermometer,
    Wallet
} from "lucide-react";

export default function PopularTools() {
    const tools = [
        {
            name: "Ovulation Calculator",
            href: "/tools/ovulation-calculator",
            icon: <Activity className="w-8 h-8 text-white" />,
            color: "bg-gradient-to-br from-blue-400 to-blue-500"
        },
        {
            name: "Due Date Calculator",
            href: "/tools/due-date-calculator",
            icon: <Calendar className="w-8 h-8 text-white" />,
            color: "bg-gradient-to-br from-orange-400 to-orange-500"
        },
        {
            name: "Conception Date",
            href: "/tools/conception-calculator",
            icon: <Clock className="w-8 h-8 text-white" />,
            color: "bg-gradient-to-br from-teal-400 to-teal-500"
        },
        {
            name: "Am I Pregnant?",
            href: "/tools/am-i-pregnant",
            icon: <Baby className="w-8 h-8 text-white" />,
            color: "bg-gradient-to-br from-pink-400 to-pink-500"
        },
        {
            name: "Baby Cost Calculator",
            href: "/tools/baby-cost-calculator",
            icon: <Wallet className="w-8 h-8 text-white" />,
            color: "bg-gradient-to-br from-indigo-400 to-indigo-500"
        },
        {
            name: "Pregnancy Week by Week",
            href: "/tools/pregnancy-week-by-week",
            icon: <Calendar className="w-8 h-8 text-white" />,
            color: "bg-gradient-to-br from-green-400 to-green-500"
        },
        {
            name: "Vaccination Scheduler",
            href: "/tools/vaccination-scheduler",
            icon: <Stethoscope className="w-8 h-8 text-white" />,
            color: "bg-gradient-to-br from-purple-400 to-purple-500"
        }
    ];

    return (
        <section className="py-16 bg-white border-t border-purple-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-gray-900">Popular Tools</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Essential calculators and trackers to guide you through every step of your parenthood journey.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-8 gap-y-10 max-w-5xl mx-auto">
                    {tools.map((tool, index) => (
                        <Link key={index} href={tool.href}>
                            <div className="flex flex-col items-center group cursor-pointer">
                                <div className={`w-20 h-20 rounded-2xl ${tool.color} flex items-center justify-center shadow-lg shadow-purple-900/5 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-1 group-hover:shadow-xl ring-4 ring-white`}>
                                    {tool.icon}
                                </div>
                                <h3 className="text-base font-bold text-gray-800 text-center mt-4 group-hover:text-purple-600 transition-colors">
                                    {tool.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
