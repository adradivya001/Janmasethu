import { Card, CardContent } from "../ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";

export default function FAQSection() {
    return (
        <section className="py-4 px-0">
            <div className="text-center mb-3">
                <h2
                    className="text-xl md:text-2xl font-bold text-foreground font-serif mb-1"
                    data-testid="text-faq-title"
                >
                    Frequently Asked Questions
                </h2>
                <p className="text-xs text-muted-foreground max-w-2xl mx-auto px-4">
                    Everything you need to know about JanmaSethu
                </p>
            </div>

            <div className="max-w-3xl mx-auto px-2">
                <Card className="rounded-xl p-4 md:p-6 card-shadow bg-gradient-to-br from-white to-purple-50/30">
                    <CardContent className="p-0">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-1"
                        >
                            <AccordionItem
                                value="item-1"
                                className="border-b border-purple-100"
                            >
                                <AccordionTrigger className="text-left hover:text-purple-600 transition-colors py-3">
                                    <span className="font-semibold text-foreground text-sm">
                                        What is JanmaSethu?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-sm">
                                    JanmaSethu is a digital guide that supports you through
                                    your journey to parenthood — from planning to pregnancy
                                    and beyond. It brings together trusted medical
                                    information, local language support, and personal guidance
                                    through our companion, Sakhi.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem
                                value="item-2"
                                className="border-b border-purple-100"
                            >
                                <AccordionTrigger className="text-left hover:text-purple-600 transition-colors py-3">
                                    <span className="font-semibold text-foreground text-sm">
                                        Is JanmaSethu a hospital or fertility clinic?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-sm">
                                    No. JanmaSethu is not a clinic — we don't provide medical
                                    treatment directly. We help you understand your options,
                                    prepare for appointments, and connect you to verified
                                    clinics and experts when you're ready.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem
                                value="item-3"
                                className="border-b border-purple-100"
                            >
                                <AccordionTrigger className="text-left hover:text-purple-600 transition-colors py-3">
                                    <span className="font-semibold text-foreground text-sm">
                                        Is Sakhi free to use?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-sm">
                                    Yes. Reading articles, using checklists, or chatting with
                                    Sakhi is completely free for everyone.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem
                                value="item-4"
                                className="border-b border-purple-100"
                            >
                                <AccordionTrigger className="text-left hover:text-purple-600 transition-colors py-3">
                                    <span className="font-semibold text-foreground text-sm">
                                        What is Sakhi?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-sm">
                                    Sakhi is your AI-powered health companion inside
                                    JanmaSethu. You can chat with her anytime for fertility or
                                    pregnancy guidance in your own language — she's friendly,
                                    quick, and always ready to help.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem
                                value="item-5"
                                className="border-b border-purple-100"
                            >
                                <AccordionTrigger className="text-left hover:text-purple-600 transition-colors py-3">
                                    <span className="font-semibold text-foreground text-sm">
                                        How does JanmaSethu get its medical information?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-sm">
                                    All our content is written and reviewed by real doctors
                                    and nurses. Each article clearly mentions the reviewer's
                                    name and date, so you know it's verified and updated.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem
                                value="item-6"
                                className="border-b border-purple-100"
                            >
                                <AccordionTrigger className="text-left hover:text-purple-600 transition-colors py-3">
                                    <span className="font-semibold text-foreground text-sm">
                                        Will my personal details be safe?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-sm">
                                    Absolutely. We never share your personal data with anyone.
                                    Your chats and health questions stay private and secure.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem
                                value="item-7"
                                className="border-b border-purple-100"
                            >
                                <AccordionTrigger className="text-left hover:text-purple-600 transition-colors py-3">
                                    <span className="font-semibold text-foreground text-sm">
                                        What languages can I use JanmaSethu in?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-sm">
                                    You can switch between English, Hindi, and Telugu anytime
                                    — and more Indian languages are coming soon.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-8" className="border-b-0">
                                <AccordionTrigger className="text-left hover:text-purple-600 transition-colors py-3">
                                    <span className="font-semibold text-foreground text-sm">
                                        What makes JanmaSethu different from other health
                                        websites?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-sm">
                                    Most sites just give you articles. JanmaSethu actually
                                    guides you step-by-step — with localized content, verified
                                    doctors, reminders, and a personal companion that
                                    understands your journey.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
