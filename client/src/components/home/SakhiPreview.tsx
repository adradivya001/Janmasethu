import { Link, useLocation } from "wouter";
import { useLanguage } from "../../i18n/LanguageProvider";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowRight, Heart, Send } from "lucide-react";

export default function SakhiPreview() {
    const { t } = useLanguage();
    const [, setLocation] = useLocation();

    return (
        <section className="py-16">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12">
                <div className="sakhi-preview-mobile grid lg:grid-cols-2 gap-12 items-center">
                    <div className="mobile-text-center lg:text-left">
                        <h2
                            className="text-3xl lg:text-4xl font-bold text-foreground font-serif mb-6"
                            data-testid="text-sakhi-hero"
                            dangerouslySetInnerHTML={{ __html: t("sakhi_hero") }}
                        ></h2>
                        <p
                            className="text-base lg:text-lg text-muted-foreground mb-8"
                            data-testid="text-sakhi-sub"
                        >
                            {t("sakhi_sub")}
                        </p>

                        <h3
                            className="text-xl lg:text-2xl font-bold text-foreground font-serif mb-4"
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
                                        <span className="text-muted-foreground text-sm lg:text-base">
                                            {item.trim()}
                                        </span>
                                    </li>
                                ))}
                        </ul>

                        <div className="flex justify-center lg:justify-start">
                            <Button
                                onClick={() => setLocation("/sakhi")}
                                className="mobile-cta-fix lg:inline-flex gradient-button-secondary text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 items-center"
                                data-testid="button-try-sakhi"
                            >
                                {t("sakhi_try")}
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Chat Interface Preview */}
                    <Card className="rounded-3xl p-6 card-shadow">
                        <div className="border-b border-border pb-4 mb-4">
                            <h4
                                className="font-bold text-foreground"
                                data-testid="text-chat-preview-title"
                            >
                                Chat with Sakhi
                            </h4>
                            <p
                                className="text-sm text-muted-foreground"
                                data-testid="text-chat-preview-hint"
                            >
                                <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
                                Sakhi is online and ready to help
                            </p>
                        </div>

                        <div className="space-y-4 mb-4 h-60 overflow-y-auto">
                            {/* Sample Chat Messages */}
                            <div className="flex justify-end">
                                <div
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-2xl max-w-xs shadow-md"
                                    data-testid="message-sample-user"
                                >
                                    I'm feeling anxious about tomorrow's scan
                                </div>
                            </div>

                            <div className="flex justify-start">
                                <div
                                    className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-2xl max-w-xs shadow-md"
                                    data-testid="message-sample-bot"
                                >
                                    I understand your anxiety. It's completely normal to feel
                                    this way before scans.
                                    <div className="mt-2 text-xs text-gray-500">
                                        <span className="animate-pulse">
                                            💭 Try some deep breathing exercises...
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Typing indicator */}
                            <div className="flex justify-start">
                                <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.1s" }}
                                        ></div>
                                        <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.2s" }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <Input
                                type="text"
                                placeholder="Type your message..."
                                className="flex-1 rounded-full focus:ring-ring"
                                data-testid="input-chat-preview"
                            />
                            <Button
                                className="gradient-button text-white rounded-full hover:shadow-lg transition-all duration-300"
                                data-testid="button-send-preview"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>

                        <p
                            className="text-xs text-muted-foreground mt-2"
                            data-testid="text-chat-preview-privacy"
                        >
                            {t("chat_privacy")}
                        </p>
                    </Card>
                </div>
            </div>
        </section>
    );
}
