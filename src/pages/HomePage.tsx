import HeroSection from '../components/home/HeroSection';
import StatsBar from '../components/home/StatsBar';
import FeaturedCars from '../components/home/FeaturedCars';
import ServicesTimeline from '../components/home/ServicesTimeline';
import CTASection from '../components/home/CTASection';
import TrustBadges from '../components/home/TrustBadges';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <FeaturedCars />
      <ServicesTimeline />
      <CTASection />
      <TrustBadges />
    </main>
  );
}
