import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Pagina nu a fost găsită — Benefic Car</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <main id="main-content" className="w-full bg-white pt-[140px] pb-20 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center bg-navy-50/50 rounded-2xl py-20 px-6 border border-navy-100 border-dashed max-w-xl mx-auto w-[90%]">
          <AlertCircle size={64} className="text-mauve-600 mb-5" strokeWidth={1.5} />
          <h1 className="font-display font-bold text-navy-800 text-3xl mb-4">404</h1>
          <h2 className="font-display font-semibold text-navy-800 text-2xl">Pagina nu a fost găsită</h2>
          <p className="font-body text-navy-500 mt-2 mb-8">
            Ne pare rău, dar pagina pe care o cauți nu există sau a fost mutată.
          </p>
          <Link 
            to="/" 
            className="bg-navy-800 text-white rounded-full px-8 py-3.5 font-display font-semibold hover:bg-navy-700 hover:scale-[1.02] transition-all shadow-lg shadow-navy-900/20"
          >
            Înapoi la pagina principală
          </Link>
        </div>
      </main>
    </>
  );
}
