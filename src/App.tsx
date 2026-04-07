import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const CarsPage = React.lazy(() => import('./pages/CarsPage'));
const CarDetailPage = React.lazy(() => import('./pages/CarDetailPage'));
const FinantarePage = React.lazy(() => import('./pages/FinantarePage'));
const GarantiePage = React.lazy(() => import('./pages/GarantiePage'));
const CarsOnDemandPage = React.lazy(() => import('./pages/CarsOnDemandPage'));
const BuyBackPage = React.lazy(() => import('./pages/BuyBackPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const TermeniPage = React.lazy(() => import('./pages/TermeniPage'));
const ConfidentialitatePage = React.lazy(() => import('./pages/ConfidentialitatePage'));
const CookiesPage = React.lazy(() => import('./pages/CookiesPage'));
const ANPCPage = React.lazy(() => import('./pages/ANPCPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

function App() {
  useLenis();

  return (
    <BrowserRouter>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-navy-800 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
        Salt la conținut
      </a>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-8 h-8 border-2 border-navy-800 border-t-transparent rounded-full animate-spin" /></div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/masini" element={<CarsPage />} />
          <Route path="/masini/:id" element={<CarDetailPage />} />
          <Route path="/finantare" element={<FinantarePage />} />
          <Route path="/garantie" element={<GarantiePage />} />
          <Route path="/masini-la-comanda" element={<CarsOnDemandPage />} />
          <Route path="/buyback" element={<BuyBackPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Legal Pages */}
          <Route path="/termeni-si-conditii" element={<TermeniPage />} />
          <Route path="/politica-confidentialitate" element={<ConfidentialitatePage />} />
          <Route path="/politica-cookies" element={<CookiesPage />} />
          <Route path="/anpc" element={<ANPCPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
