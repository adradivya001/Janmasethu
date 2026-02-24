import { Card, CardContent } from "../ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";

const faqs = [
    {
        question: "What is JanmaSethu?",
        answer: "JanmaSethu is a digital guide that supports you through your journey to parenthood — from planning to pregnancy and beyond. It brings together trusted medical information, local language support, and personal guidance through our companion, Sakhi."
    },
    {
        question: "Is JanmaSethu a hospital or fertility clinic?",
        answer: "No. JanmaSethu is not a clinic — we don't provide medical treatment directly. We help you understand your options, prepare for appointments, and connect you to verified clinics and experts when you're ready."
    },
    {
        question: "Is Sakhi free to use?",
        answer: "Yes. Reading articles, using checklists, or chatting with Sakhi is completely free for everyone."
    },
    {
        question: "What is Sakhi?",
        answer: "Sakhi is your AI-powered health companion inside JanmaSethu. You can chat with her anytime for fertility or pregnancy guidance in your own language — she's friendly, quick, and always ready to help."
    },
    {
        question: "How does JanmaSethu get its medical information?",
        answer: "All our content is written and reviewed by real doctors and nurses. Each article clearly mentions the reviewer's name and date, so you know it's verified and updated."
    },
    {
        question: "Will my personal details be safe?",
        answer: "Absolutely. We never share your personal data with anyone. Your chats and health questions stay private and secure."
    },
    {
        question: "What languages can I use JanmaSethu in?",
        answer: "You can switch between English, Hindi, and Telugu anytime — and more Indian languages are coming soon."
    },
    {
        question: "What makes JanmaSethu different from other health websites?",
        answer: "Most sites just give you articles. JanmaSethu actually guides you step-by-step — with localized content, verified doctors, reminders, and a personal companion that understands your journey."
    }
];

export default function FAQSection() {
    return (
        <section className="py-4 px-0">
            <div className="text-center mb-3">
                <h2
                    className="text-xl md:text-2xl font-bold text-pink-600 mb-1"
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
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index + 1}`}
                                    className={`border-b border-purple-100 transition-colors rounded-lg data-[state=open]:bg-purple-50/50 ${index === faqs.length - 1 ? 'border-b-0' : ''}`}
                                >
                                    <AccordionTrigger className="text-left hover:text-pink-400 transition-colors py-3 hover:no-underline px-4">
                                        <span className="font-semibold text-foreground text-sm">
                                            {faq.question}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-sm px-4">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
