import { useParams, Link } from 'wouter';
import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, User, AlertTriangle, DollarSign, HelpCircle, CheckCircle, Users, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { treatmentsList, fetchTreatmentData, getSummaryByLanguage, getContentByLanguage, normalizeTreatmentData, type TreatmentData } from '@/data/treatments';

const Treatment = () => {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const [treatmentData, setTreatmentData] = useState<TreatmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | boolean>(false); // Explicitly type error state

  // Find treatment metadata from slug
  const treatmentMetadata = treatmentsList.find(t => t.slug === slug);
  const langKey = lang === 'hi' ? 'hi' : lang === 'te' ? 'te' : 'en';

  // Load treatment data when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
    loadTreatmentData();
  }, [slug]);

  const loadTreatmentData = async () => {
    if (!treatmentMetadata) {
      setError('Treatment not found in metadata.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const data = await fetchTreatmentData(treatmentMetadata.id);
      if (data) {
        setTreatmentData(normalizeTreatmentData(data));
      } else {
        setError('No data returned from fetch.');
      }
    } catch (err) {
      console.error('Error loading treatment data:', err);
      setError('Failed to load treatment data.');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-16">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock className="w-6 h-6 animate-spin" />
            <span className="text-lg">
              {lang === 'hi' ? 'लोड हो रहा है...' :
               lang === 'te' ? 'లోడ్ అవుతోంది...' :
               'Loading treatment information...'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !treatmentMetadata || !treatmentData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto rounded-3xl p-8 card-shadow">
          <CardContent>
            <h1 className="text-2xl font-bold text-foreground font-serif mb-4">
              {error ? error :
               lang === 'hi' ? 'उपचार नहीं मिला' :
               lang === 'te' ? 'చికిత్స కనుగొనబడలేదు' :
               'Treatment Not Found'}
            </h1>
            <p className="text-muted-foreground mb-6">
              {error ? 'Please try again later.' :
               lang === 'hi' ? 'आपके द्वारा खोजी जा रही उपचार जानकारी उपलब्ध नहीं है।' :
               lang === 'te' ? 'మీరు వెతుకుతున్న చికిత్స సమాచారం అందుబాటులో లేదు।' :
               'The treatment information you\'re looking for doesn\'t exist.'}
            </p>
            <Link href="/treatments">
              <Button className="gradient-button text-white rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {lang === 'hi' ? 'उपचारों पर वापस जाएं' :
                 lang === 'te' ? 'చికిత్సలకు తిరిగి వెళ్ళండి' :
                 'Back to Treatments'}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Extract treatment data from the nested structure
  const treatmentKey = Object.keys(treatmentData)[0];
  const treatment = treatmentData[treatmentKey];

  if (!treatment || typeof treatment !== 'object') {
    setError('Invalid treatment data structure');
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto rounded-3xl p-8 card-shadow">
          <CardContent>
            <h1 className="text-2xl font-bold text-foreground font-serif mb-4">Invalid Data</h1>
            <p className="text-muted-foreground mb-6">The treatment data is not structured correctly.</p>
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

  // Process the treatment data with proper fallbacks
  const processedData = {
    title: treatment.title || treatmentKey,
    summary: treatment.summary || treatment.Summary || {},
    reviewedBy: treatment['Reviewed by'] || treatment.reviewed_by || 'Dr. Raghav Iyer',
    whoMightBenefit: treatment['Who Might Benefit'] || treatment.who_might_benefit || [],
    processSteps: treatment['Process Steps'] || treatment.process_steps || {},
    risksConsiderations: treatment['Risks & Considerations'] || treatment.risks_considerations || [],
    costConsiderations: treatment['Cost Considerations'] || treatment.cost_considerations || [],
    questionsToAsk: treatment['Questions to Ask Your Doctor'] || treatment.questions_to_ask || [],
    sources: treatment['Sources'] || treatment.sources || []
  };

  // Get localized content with safety checks
  const summary = getSummaryByLanguage(processedData.summary, langKey);
  const reviewedBy = processedData.reviewedBy;
  const sources = processedData.sources || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link href="/treatments">
          <Button variant="ghost" className="rounded-full" data-testid="button-back-treatments">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {lang === 'hi' ? 'उपचारों पर वापस जाएं' :
             lang === 'te' ? 'చికిత్సలకు తిరిగి వెళ్ళండి' :
             'Back to Treatments'}
          </Button>
        </Link>
      </div>

      {/* Treatment Header */}
      <Card className="rounded-3xl p-8 md:p-12 card-shadow mb-8">
        <CardContent className="p-0">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-6" data-testid="text-treatment-name">
            {processedData.title || treatmentMetadata.title}
          </h1>

          <p className="text-lg text-muted-foreground mb-6" data-testid="text-treatment-overview">
            {summary || 'Comprehensive treatment information.'}
          </p>

          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span data-testid="text-treatment-reviewer">
                {lang === 'hi' ? 'द्वारा समीक्षित' :
                 lang === 'te' ? 'సమీక్షించినవారు' :
                 'Reviewed by'} {reviewedBy}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Details */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Who Might Benefit */}
        <Card className="rounded-3xl p-6 card-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-foreground font-serif flex items-center">
              <Users className="w-6 h-6 mr-3 text-blue-600" />
              {lang === 'hi' ? 'कौन लाभ उठा सकता है' :
               lang === 'te' ? 'ఎవరికి ఉపయోగపడుతుంది' :
               'Who Might Benefit'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(() => {
                const benefitData = processedData.whoMightBenefit;

                // Handle array format
                if (Array.isArray(benefitData)) {
                  return benefitData.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {typeof item === 'string' ? item : item[lang] || item.en || item}
                      </span>
                    </div>
                  ));
                }

                // Handle object format with language keys
                if (benefitData && typeof benefitData === 'object') {
                  const langKey = lang === 'hi' ? 'Hindi' : lang === 'te' ? 'Telugu' : 'English';
                  const items = benefitData[langKey] || benefitData[lang] || benefitData.en || benefitData.English || [];

                  if (Array.isArray(items)) {
                    return items.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ));
                  }
                }

                return <p className="text-muted-foreground">Information not available</p>;
              })()}
            </div>
          </CardContent>
        </Card>

        {/* Process Steps */}
        <Card className="rounded-3xl p-6 card-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-foreground font-serif flex items-center">
              <Zap className="w-6 h-6 mr-3 text-purple-600" />
              {lang === 'hi' ? 'प्रक्रिया के चरण' :
               lang === 'te' ? 'ప్రక్రియ దశలు' :
               'Process Steps'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(() => {
                const stepsData = processedData.processSteps;

                if (stepsData && typeof stepsData === 'object') {
                  const langKey = lang === 'hi' ? 'Hindi' : lang === 'te' ? 'Telugu' : 'English';
                  const steps = stepsData[langKey] || stepsData[lang] || stepsData.en || stepsData.English || {};

                  if (Object.keys(steps).length > 0) {
                    return Object.entries(steps).map(([step, details], index) => (
                      <div key={index} className="border-l-4 border-purple-200 pl-4">
                        <h4 className="font-bold text-foreground mb-2">{step}</h4>
                        <div className="space-y-2">
                          {Array.isArray(details) ? details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-sm text-muted-foreground">{detail}</p>
                          )) : <p className="text-sm text-muted-foreground">{details}</p>}
                        </div>
                      </div>
                    ));
                  }
                }

                return <p className="text-muted-foreground">Process information not available</p>;
              })()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risks and Costs */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Risks & Considerations */}
        <Card className="rounded-3xl p-6 card-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-foreground font-serif flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-orange-600" />
              {lang === 'hi' ? 'जोखिम और विचारणीय बातें' :
               lang === 'te' ? 'రిస్క్‌లు & పరిగణనలు' :
               'Risks & Considerations'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(() => {
                const risksData = processedData.risksConsiderations;

                if (Array.isArray(risksData)) {
                  return risksData.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {typeof risk === 'string' ? risk : risk[lang] || risk.en || risk}
                      </span>
                    </div>
                  ));
                }

                if (risksData && typeof risksData === 'object') {
                  const langKey = lang === 'hi' ? 'Hindi' : lang === 'te' ? 'Telugu' : 'English';
                  const items = risksData[langKey] || risksData[lang] || risksData.en || risksData.English || [];

                  if (Array.isArray(items)) {
                    return items.map((risk, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{risk}</span>
                      </div>
                    ));
                  }
                }

                return <p className="text-muted-foreground">Risk information not available</p>;
              })()}
            </div>
          </CardContent>
        </Card>

        {/* Cost Considerations */}
        <Card className="rounded-3xl p-6 card-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-foreground font-serif flex items-center">
              <DollarSign className="w-6 h-6 mr-3 text-green-600" />
              {lang === 'hi' ? 'लागत संबंधी विचार' :
               lang === 'te' ? 'ఖర్చు పరిగణనలు' :
               'Cost Considerations'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(() => {
                const costData = processedData.costConsiderations;

                if (Array.isArray(costData)) {
                  return costData.map((cost, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <DollarSign className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {typeof cost === 'string' ? cost : cost[lang] || cost.en || cost}
                      </span>
                    </div>
                  ));
                }

                if (costData && typeof costData === 'object') {
                  const langKey = lang === 'hi' ? 'Hindi' : lang === 'te' ? 'Telugu' : 'English';
                  const items = costData[langKey] || costData[lang] || costData.en || costData.English || [];

                  if (Array.isArray(items)) {
                    return items.map((cost, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <DollarSign className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{cost}</span>
                      </div>
                    ));
                  }
                }

                return <p className="text-muted-foreground">Cost information not available</p>;
              })()}
            </div>
          </CardContent>
        </Card>

        {/* Questions to Ask Your Doctor */}
        <Card className="rounded-3xl p-6 card-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-foreground font-serif flex items-center">
              <HelpCircle className="w-6 h-6 mr-3 text-blue-600" />
              {lang === 'hi' ? 'अपने डॉक्टर से पूछने योग्य सवाल' :
               lang === 'te' ? 'మీ వైద్యుడిని అడగవలసిన ప్రశ్నలు' :
               'Questions to Ask Your Doctor'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(() => {
                const questionsData = processedData.questionsToAsk;

                if (Array.isArray(questionsData)) {
                  return questionsData.map((question, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <HelpCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {typeof question === 'string' ? question : question[lang] || question.en || question}
                      </span>
                    </div>
                  ));
                }

                if (questionsData && typeof questionsData === 'object') {
                  const langKey = lang === 'hi' ? 'Hindi' : lang === 'te' ? 'Telugu' : 'English';
                  const items = questionsData[langKey] || questionsData[lang] || questionsData.en || questionsData.English || [];

                  if (Array.isArray(items)) {
                    return items.map((question, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <HelpCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{question}</span>
                      </div>
                    ));
                  }
                }

                return <p className="text-muted-foreground">Questions not available</p>;
              })()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sources */}
      <Card className="rounded-3xl p-6 card-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-foreground font-serif">
            {lang === 'hi' ? 'स्रोत' :
             lang === 'te' ? 'మూలాలు' :
             'Sources'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {sources && sources.length > 0 ? sources.map((source, index) => (
              <Badge key={index} variant="outline" data-testid={`badge-source-${index}`}>
                {source}
              </Badge>
            )) : (
              <span className="text-muted-foreground italic text-sm">
                {lang === 'hi' ? 'स्रोत लोड हो रहे हैं...' :
                 lang === 'te' ? 'మూలాలు లోడ్ అవుతున్నాయి...' :
                 'Loading sources...'}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Treatment;