import { Link } from "wouter";
import { useEffect } from "react";
import {
  Heart,
  ArrowRight,
  Shield,
  Clock,
  Users,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChatInterface from "@/components/ChatInterface";

const Sakhi = () => {
  const { t } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sakhiFeatures = [
    {
      icon: Heart,
      title: "sakhi_feature_emotional_title",
      description:
        "sakhi_feature_emotional_desc",
      color: "text-pink-600",
    },
    {
      icon: Clock,
      title: "sakhi_feature_247_title",
      description: "sakhi_feature_247_desc",
      color: "text-blue-600",
    },
    {
      icon: Shield,
      title: "sakhi_feature_private_title",
      description: "sakhi_feature_private_desc",
      color: "text-green-600",
    },
    {
      icon: Users,
      title: "sakhi_feature_partner_title",
      description: "sakhi_feature_partner_desc",
      color: "text-purple-600",
    },
    {
      icon: MessageCircle,
      title: "sakhi_feature_multilang_title",
      description: "sakhi_feature_multilang_desc",
      color: "text-orange-600",
    },
  ];

  return (
    <>
      {/* Responsive Video Section */}
      <section className="w-full py-4 px-2 sm:px-4 lg:py-8 lg:px-8">
        <div className="responsive-video-container relative overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/babyFeet.jpg"
            webkit-playsinline="true"
            x5-playsinline="true"
            onLoadStart={() => console.log('Sakhi video loading started...')}
            onLoadedData={() => console.log('Sakhi video data loaded')}
            onCanPlay={() => console.log('Sakhi video can play')}
            onPlay={() => console.log('Sakhi video started playing')}
          >
            <source src="/sakhi.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6">
      {/* Hero Section */}
      <section className="text-center py-12 relative">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-serif mb-6 leading-tight"
            data-testid="text-sakhi-hero-title"
            dangerouslySetInnerHTML={{ __html: t("sakhi_hero") }}
          ></h1>

          <p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            data-testid="text-sakhi-hero-subtitle"
          >
            {t("sakhi_sub")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/sakhi/try">
              <Button
                className="gradient-button text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 inline-flex items-center"
                data-testid="button-try-sakhi-hero"
              >
                {t("sakhi_try")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/knowledge">
              <Button
                variant="outline"
                className="bg-white text-foreground px-8 py-4 rounded-full font-semibold text-lg border-border hover:shadow-lg transition-all duration-300"
                data-testid="button-browse-knowledge"
              >
                {t("sakhi_browse_knowledge")}
              </Button>
            </Link>
          </div>

          {/* Background Image */}
          <div className="absolute inset-0 -z-10 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
              alt={t('alt_peaceful_meditation')}
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* How Sakhi Helps */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold text-foreground font-serif mb-4"
            data-testid="text-sakhi-how-title"
          >
            {t("sakhi_how_title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("sakhi_subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sakhiFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="rounded-3xl p-6 card-shadow hover:shadow-xl transition-all duration-300 text-center h-full flex flex-col"
                data-testid={`card-sakhi-feature-${index}`}
              >
                <CardContent className="p-0 flex flex-col h-full">
                  <Icon className={`w-12 h-12 ${feature.color} mx-auto mb-4`} />
                  <h3
                    className="text-lg font-bold text-foreground font-serif mb-2"
                    data-testid={`text-feature-title-${index}`}
                  >
                    {t(feature.title)}
                  </h3>
                  <p
                    className="text-sm text-muted-foreground flex-grow"
                    data-testid={`text-feature-description-${index}`}
                  >
                    {t(feature.description)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detailed Help List */}
        <Card className="rounded-3xl p-8 card-shadow">
          <CardContent className="p-0">
            <h3 className="text-2xl font-bold text-foreground font-serif mb-6 text-center">
              {t("sakhi_specific_ways")}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {t("sakhi_how_list")
                .split("|")
                .map((item: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3"
                    data-testid={`item-sakhi-help-${index}`}
                  >
                    <Heart className="text-pink-500 w-5 h-5 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{item.trim()}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground font-serif mb-6"
            data-testid="text-sakhi-try-title"
          >
            {t("sakhi_try_demo_title")}
          </h2>
          <p
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            data-testid="text-sakhi-try-subtitle"
          >
            {t("sakhi_try_demo_subtitle")}
          </p>
        </div>

        {/* Privacy Features */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card
            className="rounded-3xl p-4 card-shadow text-center h-full flex flex-col"
            data-testid="card-privacy-feature-0"
          >
            <CardContent className="p-0 flex flex-col h-full justify-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3
                className="font-bold text-foreground mb-1"
                data-testid="text-privacy-title-0"
              >
                {t("sakhi_private_local")}
              </h3>
              <p
                className="text-sm text-muted-foreground"
                data-testid="text-privacy-description-0"
              >
                {t("sakhi_private_local_desc")}
              </p>
            </CardContent>
          </Card>
          <Card
            className="rounded-3xl p-4 card-shadow text-center h-full flex flex-col"
            data-testid="card-privacy-feature-1"
          >
            <CardContent className="p-0 flex flex-col h-full justify-center">
              <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3
                className="font-bold text-foreground mb-1"
                data-testid="text-privacy-title-1"
              >
                {t("sakhi_multilang_short")}
              </h3>
              <p
                className="text-sm text-muted-foreground"
                data-testid="text-privacy-description-1"
              >
                {t("sakhi_multilang_short_desc")}
              </p>
            </CardContent>
          </Card>
          <Card
            className="rounded-3xl p-4 card-shadow text-center h-full flex flex-col"
            data-testid="card-privacy-feature-2"
          >
            <CardContent className="p-0 flex flex-col h-full justify-center">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3
                className="font-bold text-foreground mb-1"
                data-testid="text-privacy-title-2"
              >
                {t("sakhi_247_available")}
              </h3>
              <p
                className="text-sm text-muted-foreground"
                data-testid="text-privacy-description-2"
              >
                {t("sakhi_247_available_desc")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Interface */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>

          {/* Sidebar with Quick Scenarios */}
          <div className="space-y-4">
            <Card className="rounded-3xl p-6 card-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground font-serif flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-pink-500" />
                  {t("sakhi_scenarios_title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    className="p-3 rounded-xl border border-border hover:bg-muted transition-colors"
                    data-testid="scenario-0"
                  >
                    <h4
                      className="font-semibold text-foreground text-sm mb-1"
                      data-testid="text-scenario-title-0"
                    >
                      {t("sakhi_scenario_anxiety_title")}
                    </h4>
                    <p
                      className="text-xs text-muted-foreground mb-2"
                      data-testid="text-scenario-description-0"
                    >
                      {t("sakhi_scenario_anxiety_desc")}
                    </p>
                    <p
                      className="text-xs text-primary font-medium italic"
                      data-testid="text-scenario-prompt-0"
                    >
                      "{t("chat_p1")}"
                    </p>
                  </div>
                  <div
                    className="p-3 rounded-xl border border-border hover:bg-muted transition-colors"
                    data-testid="scenario-1"
                  >
                    <h4
                      className="font-semibold text-foreground text-sm mb-1"
                      data-testid="text-scenario-title-1"
                    >
                      {t("sakhi_scenario_wait_title")}
                    </h4>
                    <p
                      className="text-xs text-muted-foreground mb-2"
                      data-testid="text-scenario-description-1"
                    >
                      {t("sakhi_scenario_wait_desc")}
                    </p>
                    <p
                      className="text-xs text-primary font-medium italic"
                      data-testid="text-scenario-prompt-1"
                    >
                      "{t("chat_p2")}"
                    </p>
                  </div>
                  <div
                    className="p-3 rounded-xl border border-border hover:bg-muted transition-colors"
                    data-testid="scenario-2"
                  >
                    <h4
                      className="font-semibold text-foreground text-sm mb-1"
                      data-testid="text-scenario-title-2"
                    >
                      {t("sakhi_scenario_partner_title")}
                    </h4>
                    <p
                      className="text-xs text-muted-foreground mb-2"
                      data-testid="text-scenario-description-2"
                    >
                      {t("sakhi_scenario_partner_desc")}
                    </p>
                    <p
                      className="text-xs text-primary font-medium italic"
                      data-testid="text-scenario-prompt-2"
                    >
                      "{t("chat_p3")}"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl p-6 card-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground font-serif">
                  {t("sakhi_how_it_works")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      1
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("sakhi_step1")}
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      2
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("sakhi_step2")}
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      3
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("sakhi_step3")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            
          </div>
        </div>

        {/* Important Disclaimer */}
        <Card className="rounded-3xl p-6 card-shadow bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200">
          <CardContent className="p-0 text-center">
            <Heart className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground font-serif mb-4">
              {t("sakhi_help_notice_title")}
            </h3>
            <div className="max-w-3xl mx-auto text-muted-foreground space-y-3">
              <p>
                {t("sakhi_help_notice_desc")}
              </p>
              <p className="font-medium text-foreground">
                {t("sakhi_help_contact")}
              </p>
              <ul className="text-left max-w-xl mx-auto space-y-1">
                <li>• {t("sakhi_help_bullets_1")}</li>
                <li>• {t("sakhi_help_bullets_2")}</li>
                <li>• {t("sakhi_help_bullets_3")}</li>
                <li>• {t("sakhi_help_bullets_4")}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Continue Exploring */}
        <div className="bg-white rounded-3xl p-6 card-shadow text-center mt-8">
          <h2 className="text-2xl font-bold text-foreground font-serif mb-4">
            {t("sakhi_continue_journey")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("sakhi_continue_desc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/knowledge">
              <Button
                className="gradient-button text-white px-8 py-4 rounded-full font-semibold"
                data-testid="button-explore-knowledge"
              >
                {t("sakhi_explore_knowledge")}
              </Button>
            </Link>
            <Link href="/treatments">
              <Button
                variant="outline"
                className="px-8 py-4 rounded-full font-semibold"
                data-testid="button-learn-treatments"
              >
                {t("sakhi_learn_treatments")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      </div>
    </>
  );
};

export default Sakhi;
