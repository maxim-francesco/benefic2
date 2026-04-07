import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/home/HeroSection';
import StatsBar from '../components/home/StatsBar';
import FeaturedCars from '../components/home/FeaturedCars';
import ServicesTimeline from '../components/home/ServicesTimeline';
import CTASection from '../components/home/CTASection';
import TrustBadges from '../components/home/TrustBadges';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Benefic Car — Mașini Rulate Verificate în Ilfov | Garanție & Finanțare</title>
        <meta name="description" content="Parc auto mașini rulate verificate în Ilfov. Garanție Defend Insurance inclusă, finanțare TBI Bank, livrare la domiciliu, buyback." />
      </Helmet>
      <main id="main-content">
        <HeroSection />
        <StatsBar />
        <FeaturedCars />
        <ServicesTimeline />
        <CTASection />
        <TrustBadges />
      </main>
    </>
  );
}
