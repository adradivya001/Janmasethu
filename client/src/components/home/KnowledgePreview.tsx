import { Link } from "wouter";
import { useLanguage } from "../../i18n/LanguageProvider";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { BookOpen, Stethoscope, Users, IndianRupee, Apple, ArrowRight } from "lucide-react";

export default function KnowledgePreview() {
    const { t, lang } = useLanguage();

    return (
        <section className="py-16">
            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-3xl p-8 md:p-12">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 card-shadow mb-4">
                            <BookOpen className="w-4 h-4 text-purple-500" />
                            <span className="text-sm font-medium text-foreground">
                                {lang === "en" && "Knowledge Hub"}
                                {lang === "hi" && "ज्ञान केंद्र"}
                                {lang === "te" && "జ్ఞాన కేంద్రం"}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-4">
                            {lang === "en" && "Your Trusted Guide to Parenthood"}
                            {lang === "hi" && "माता-पिता बनने के लिए आपका विश्वसनीय मार्गदर्शक"}
                            {lang === "te" && "మాతృత్వానికి మీ విశ్వసనీయ మార్గదర్శి"}
                        </h2>

                        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                            {lang === "en" && "Expert-verified articles covering every aspect of your fertility and pregnancy journey. Browse through different perspectives - medical, emotional, financial, and nutritional - to find the information you need."}
                            {lang === "hi" && "विशेषज्ञ-सत्यापित लेख जो आपकी प्रजनन और गर्भावस्था यात्रा के हर पहलू को कवर करते हैं। विभिन्न दृष्टिकोणों - चिकित्सा, भावनात्मक, वित्तीय और पोषण - के माध्यम से ब्राउज़ करें और जरूरी जानकारी प्राप्त करें।"}
                            {lang === "te" && "మీ సంతానోత్పత్తి మరియు గర్భధారణ ప్రయాణంలోని ప్రతి అంశాన్ని కవర్ చేసే నిపుణుల-ధృవీకరించబడిన వ్యాసాలు. వైద్యం, భావోద్వేగం, ఆర్థికం మరియు పోషకాహారం వంటి వివిధ దృక్పథాల ద్వారా బ్రౌజ్ చేసి మీకు అవసరమైన సమాచారాన్ని కనుగొనండి."}
                        </p>
                    </div>

                    {/* What You'll Find */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <Link href="/knowledge-hub?lens=medical" className="group">
                            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-blue-200 relative overflow-hidden h-full">
                                <CardContent className="p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <Stethoscope className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-foreground mb-2 group-hover:text-blue-600 transition-colors">
                                                {lang === "en" && "Medical Lens"}
                                                {lang === "hi" && "चिकित्सा दृष्टिकोण"}
                                                {lang === "te" && "వైద్య దృక్కోణం"}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                {lang === "en" && "Understand treatments, procedures, and what to expect at each stage - explained in simple language"}
                                                {lang === "hi" && "उपचार, प्रक्रियाओं और प्रत्येक चरण में क्या उम्मीद करें - सरल भाषा में समझाया गया"}
                                                {lang === "te" && "చికిత్సలు, ప్రక్రియలు మరియు ప్రతి దశలో ఏమి ఆశించాలో అర్థం చేసుకోండి - సరళమైన భాషలో వివరించబడింది"}
                                            </p>
                                            <div className="flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="mr-1">
                                                    {lang === "en" && "Browse topics"}
                                                    {lang === "hi" && "विषय ब्राउज़ करें"}
                                                    {lang === "te" && "విషయాలను బ్రౌజ్ చేయండి"}
                                                </span>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/knowledge-hub?lens=social" className="group">
                            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-pink-200 relative overflow-hidden h-full">
                                <CardContent className="p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <Users className="w-6 h-6 text-pink-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-foreground mb-2 group-hover:text-pink-600 transition-colors">
                                                {lang === "en" && "Social & Emotional Support"}
                                                {lang === "hi" && "सामाजिक और भावनात्मक समर्थन"}
                                                {lang === "te" && "సామాజిక మరియు భావోద్వేగ మద్దతు"}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                {lang === "en" && "Navigate family expectations, stress management, and emotional wellbeing throughout your journey"}
                                                {lang === "hi" && "पारिवारिक अपेक्षाओं, तनाव प्रबंधन और भावनात्मक कल्याण को संभालें"}
                                                {lang === "te" && "కుటుంబ అంచనాలు, ఒత్తిడి నిర్వహణ మరియు భావోద్వేగ శ్రేయస్సును నావిగేట్ చేయండి"}
                                            </p>
                                            <div className="flex items-center text-pink-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="mr-1">
                                                    {lang === "en" && "Browse topics"}
                                                    {lang === "hi" && "विषय ब्राउज़ करें"}
                                                    {lang === "te" && "విషయాలను బ్రౌజ్ చేయండి"}
                                                </span>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/knowledge-hub?lens=financial" className="group">
                            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-green-200 relative overflow-hidden h-full">
                                <CardContent className="p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <IndianRupee className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-foreground mb-2 group-hover:text-green-600 transition-colors">
                                                {lang === "en" && "Financial Planning"}
                                                {lang === "hi" && "वित्तीय योजना"}
                                                {lang === "te" && "ఆర్థిక ప్రణాళిక"}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                {lang === "en" && "Cost breakdowns, insurance coverage, government schemes, and budgeting tips for every stage"}
                                                {lang === "hi" && "लागत विवरण, बीमा कवरेज, सरकारी योजनाएं और प्रत्येक चरण के लिए बजट युक्तियां"}
                                                {lang === "te" && "ఖర్చు విభజనలు, భీమా కవరేజీ, ప్రభుత్వ పథకాలు మరియు ప్రతి దశకు బడ్జెట్ చిట్కాలు"}
                                            </p>
                                            <div className="flex items-center text-green-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="mr-1">
                                                    {lang === "en" && "Browse topics"}
                                                    {lang === "hi" && "विषय ब्राउज़ करें"}
                                                    {lang === "te" && "విషయాలను బ్రౌజ్ చేయండి"}
                                                </span>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/knowledge-hub?lens=nutrition" className="group">
                            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-orange-200 relative overflow-hidden h-full">
                                <CardContent className="p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <Apple className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-foreground mb-2 group-hover:text-orange-600 transition-colors">
                                                {lang === "en" && "Nutrition & Lifestyle"}
                                                {lang === "hi" && "पोषण और जीवनशैली"}
                                                {lang === "te" && "పోషకాహారం మరియు జీవనశైలి"}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                {lang === "en" && "India-specific food guides, safe eating practices, and lifestyle tips for preconception through postpartum"}
                                                {lang === "hi" && "भारत-विशिष्ट खाद्य गाइड, सुरक्षित खाने की प्रथाएं और गर्भधारण से प्रसवोत्तर तक जीवनशैली युक्तियां"}
                                                {lang === "te" && "భారత-నిర్దిష్ట ఆహార మార్గదర్శకాలు, సురక్షిత తినే పద్ధతులు మరియు గర్భధారణ నుండి ప్రసవానంతర వరకు జీవనశైలి చిట్కాలు"}
                                            </p>
                                            <div className="flex items-center text-orange-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="mr-1">
                                                    {lang === "en" && "Browse topics"}
                                                    {lang === "hi" && "विषय ब्राउज़ करें"}
                                                    {lang === "te" && "విషయాలను బ్రౌజ్ చేయండి"}
                                                </span>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <Link href="/knowledge-hub">
                            <Button className="gradient-button text-white px-8 py-4 rounded-full font-semibold text-base md:text-lg hover:shadow-xl transition-all duration-300 group">
                                <BookOpen className="mr-2 w-5 h-5" />
                                {lang === "en" && "Browse Articles by Topic"}
                                {lang === "hi" && "विषय के अनुसार लेख ब्राउज़ करें"}
                                {lang === "te" && "అంశం ద్వారా వ్యాసాలను బ్రౌజ్ చేయండి"}
                                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
