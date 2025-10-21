import HeroSection from '@/components/HeroSection';
import UseCasesSection from '@/components/UseCasesSection';
import EngineeringProcessSection from '@/components/EngineeringProcessSection';
import ContactSection from '@/components/ContactSection';
import FeaturesSection from '@/components/FeaturesSection';
import StatsBar from '@/components/StatsBar';
import FAQChatbot from '@/components/FAQChatbot';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <UseCasesSection />
      <EngineeringProcessSection />
      <FAQChatbot />
      <ContactSection />
    </>
  );
}
