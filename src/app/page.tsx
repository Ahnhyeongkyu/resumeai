import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import FeatureSection from '@/components/landing/FeatureSection';
import ShowcaseSection from '@/components/landing/ShowcaseSection';
import CareerSection from '@/components/landing/CareerSection';
import PricingSection from '@/components/landing/PricingSection';
import FinalCTASection from '@/components/landing/FinalCTASection';

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <FeatureSection />
      <ShowcaseSection />
      <CareerSection />
      <PricingSection />
      <FinalCTASection />
    </main>
  );
}
