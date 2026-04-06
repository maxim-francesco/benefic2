import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';

import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import CarDetailPage from './pages/CarDetailPage';
import FinantarePage from './pages/FinantarePage';
import GarantiePage from './pages/GarantiePage';
import CarsOnDemandPage from './pages/CarsOnDemandPage';
import BuyBackPage from './pages/BuyBackPage';
import ContactPage from './pages/ContactPage';
import TermeniPage from './pages/TermeniPage';
import ConfidentialitatePage from './pages/ConfidentialitatePage';
import CookiesPage from './pages/CookiesPage';
import ANPCPage from './pages/ANPCPage';

function App() {
  useLenis();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
