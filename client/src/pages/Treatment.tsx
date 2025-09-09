import { useParams, Link } from 'wouter';
import { ArrowLeft, Clock, User, AlertTriangle, DollarSign, HelpCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { treatments } from '@/data/treatments';

const Treatment = () => {
  const { slug } = useParams();
  const { t } = useLanguage();
  
  const treatment = treatments.find(t => t.slug === slug);

  if (!treatment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto rounded-3xl p-8 card-shadow">
          <CardContent>
            <h1 className="text-2xl font-bold text-foreground font-serif mb-4">Treatment Not Found</h1>
            <p className="text-muted-foreground mb-6">The treatment information you're looking for doesn't exist.</p>
            <Link href="/treatments">
              <Button className="gradient-button text-white rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Treatments
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link href="/treatments">
          <Button variant="ghost" className="rounded-full" data-testid="button-back-treatments">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Treatments
          </Button>
        </Link>
      </div>

      {/* Treatment Header */}
      <Card className="rounded-3xl p-8 md:p-12 card-shadow mb-8">
        <CardContent className="p-0">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-6" data-testid="text-treatment-name">
            {treatment.name}
          </h1>

          <p className="text-lg text-muted-foreground mb-6" data-testid="text-treatment-overview">
            {treatment.overview}
          </p>

          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span data-testid="text-treatment-reviewer">Reviewed by {treatment.reviewedBy}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Details */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Who Might Benefit */}
        <Card className="rounded-3xl p-6 card-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground font-serif">Who Might Benefit</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {treatment.who.map((item, index) => (
                <li key={index} className="flex items-start space-x-3" data-testid={`item-who-benefits-${index}`}>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Process Steps */}
        <Card className="rounded-3xl p-6 card-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground font-serif">Process Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {treatment.steps.map((step, index) => (
                <li key={index} className="flex items-start space-x-3" data-testid={`item-process-step-${index}`}>
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* Risks and Costs */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Risks & Considerations */}
        <Card className="rounded-3xl p-6 card-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground font-serif flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
              Risks & Considerations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {treatment.risks.map((risk, index) => (
                <li key={index} className="flex items-start space-x-3" data-testid={`item-risk-${index}`}>
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{risk}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Cost Information */}
        <Card className="rounded-3xl p-6 card-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground font-serif flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-500" />
              Cost Considerations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground" data-testid="text-cost-note">
              {treatment.costNote}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Questions to Ask Doctor */}
      <Card className="rounded-3xl p-6 card-shadow mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground font-serif flex items-center">
            <HelpCircle className="w-5 h-5 mr-2 text-blue-500" />
            Questions to Ask Your Doctor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {treatment.askDoctor.map((question, index) => (
              <li key={index} className="flex items-start space-x-3" data-testid={`item-doctor-question-${index}`}>
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">{question}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Sources */}
      <Card className="rounded-3xl p-6 card-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-foreground font-serif">Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {treatment.sources.map((source, index) => (
              <Badge key={index} variant="outline" data-testid={`badge-source-${index}`}>
                {source}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Treatment;
