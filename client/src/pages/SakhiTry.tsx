import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SakhiWidget from '@/components/sakhi/SakhiWidget';

const SakhiTry = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link href="/sakhi">
          <Button variant="ghost" className="rounded-full" data-testid="button-back-sakhi">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sakhi
          </Button>
        </Link>
      </div>

      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground font-serif mb-4">
          Try Sakhi - Interactive Demo
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Experience compassionate, culturally-aware support for your fertility journey. 
          Switch between English and Telugu to see how Sakhi adapts to your language.
        </p>
      </div>

      {/* Sakhi Widget */}
      <div className="mb-8">
        <SakhiWidget />
      </div>
    </div>
  );
};

export default SakhiTry;