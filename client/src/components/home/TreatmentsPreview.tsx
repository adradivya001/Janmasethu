import { Link } from "wouter";
import { useLanguage } from "../../i18n/LanguageProvider";
import { Card, CardContent } from "../ui/card";
import { ArrowRight, Syringe, Microscope, Dna, HeartHandshake, Snowflake } from "lucide-react";

export default function TreatmentsPreview() {
    const { t, lang } = useLanguage();

    const getTreatmentCards = () => [
        {
            slug: "iui",
            name: t("treatment_iui_title"),
            description: t("treatment_iui_desc"),
            icon: Syringe,
            iconColor: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            slug: "ivf",
            name: t("treatment_ivf_title"),
            description: t("treatment_ivf_desc"),
            icon: Microscope,
            iconColor: "text-purple-600",
            bgColor: "bg-purple-100",
        },
        {
            slug: "icsi",
            name: t("treatment_icsi_title"),
            description: t("treatment_icsi_desc"),
            icon: Dna,
            iconColor: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            slug: "donor-options",
            name: t("treatment_donor_title"),
            description: t("treatment_donor_desc"),
            icon: HeartHandshake,
            iconColor: "text-pink-600",
            bgColor: "bg-pink-100",
        },
        {
            slug: "fertility-preservation",
            name: t("treatment_preservation_title"),
            description: t("treatment_preservation_desc"),
            icon: Snowflake,
            iconColor: "text-cyan-600",
            bgColor: "bg-cyan-100",
        },
    ];

    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2
                    className="text-4xl font-bold text-foreground font-serif mb-4"
                    data-testid="text-treatments-title"
                >
                    {t("treatments_overview_title")}
                </h2>
            </div>

            {/* Horizontal scrollable container */}
            <div className="relative -mx-4 md:mx-0">
                <div className="overflow-x-auto scrollbar-hide py-8 px-6 md:px-4">
                    <div className="flex gap-6 md:gap-8 min-w-min">
                        {getTreatmentCards().map((treatment, index) => (
                            <Link
                                key={treatment.slug}
                                href={`/treatments/${treatment.slug}`}
                                className="group flex-shrink-0"
                            >
                                <Card
                                    className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-[360px] rounded-3xl p-8 card-shadow hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-purple-200 relative overflow-hidden bg-gradient-to-br from-white to-purple-50/30 h-full"
                                    data-testid={`card-treatment-${index}`}
                                >
                                    <CardContent className="p-0 flex flex-col h-full">
                                        <div
                                            className={`w-16 h-16 ${treatment.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md`}
                                        >
                                            <treatment.icon
                                                className={`${treatment.iconColor} w-8 h-8`}
                                            />
                                        </div>
                                        <h3
                                            className="text-2xl font-bold text-foreground font-serif mb-4 group-hover:text-purple-600 transition-colors"
                                            data-testid={`text-treatment-name-${index}`}
                                        >
                                            {treatment.name}
                                        </h3>
                                        <p
                                            className="text-muted-foreground flex-grow mb-6"
                                            data-testid={`text-treatment-desc-${index}`}
                                        >
                                            {treatment.description}
                                        </p>

                                        {/* Call to action */}
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-sm text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {lang === "en" && "Learn more"}
                                                {lang === "hi" && "और जानें"}
                                                {lang === "te" && "మరింత తెలుసుకోండి"}
                                            </span>
                                            <ArrowRight className="w-5 h-5 text-purple-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Scroll indicator - visible on all screens */}
                <div className="flex justify-center mt-4">
                    <div className="flex gap-2 items-center text-xs text-muted-foreground">
                        <ArrowRight className="w-3 h-3 animate-bounce" style={{ animationDirection: 'alternate' }} />
                        <span>Swipe to see more</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
