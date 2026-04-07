import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function TermeniPage() {
  return (
    <>
      <Helmet>
        <title>Termeni și Condiții | Benefic Car</title>
        <meta name="description" content="Termeni și condiții de utilizare și vânzare pentru platforma Benefic Car." />
      </Helmet>
      <main id="main-content" className="w-full bg-white pt-[100px] md:pt-[120px] pb-20 px-5 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="font-display font-bold text-navy-800 text-3xl mb-8">Termeni și Condiții</h1>
        
        <div className="font-body text-navy-600 leading-relaxed space-y-6">
          <p>
            Bine ați venit pe site-ul Benefic Car. Vă rugăm să citiți cu atenție acești termeni și condiții înainte de a utiliza serviciile noastre.
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">1. Date de identificare</h2>
          <p>
            Site-ul beneficcar.ro este administrat de BENEFIC DARIUS AUTOS S.R.L., cu sediul în Sat Ciolpani, Comuna Ciolpani, Str. Calea București Nr. 4B, Jud. Ilfov, înregistrată la Registrul Comerțului sub nr. J2024002312235, CUI 49835667.<br/>
            Email: <a href="mailto:contact@beneficcar.ro" className="text-mauve-600 hover:text-mauve-500 underline">contact@beneficcar.ro</a><br/>
            Telefon: <a href="tel:+40721703507" className="text-mauve-600 hover:text-mauve-500 underline">0721 703 507</a>
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">2. Obiectul documentului</h2>
          <p>
            Acești termeni și condiții stabilesc regulile de utilizare a platformei noastre și condițiile de vânzare, rezervare și comandă a autovehiculelor prezentate.
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">3. Descrierea serviciilor</h2>
          <p>
            BENEFIC DARIUS AUTOS S.R.L. oferă spre vânzare mașini rulate verificate, furnizează servicii de intermediere financiară, preluare tip Buy-Back și aducere de autovehicule pe bază de comandă fermă. Toate descrierile și prețurile afișate pe site au un caracter informativ și nu creează obligații contractuale explicite până la semnarea unui contract de vânzare-cumpărare.
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">4. Prețuri și Plăți</h2>
          <p>
            Prețurile afișate sunt în Euro și includ TVA (conform regimului specific, marginal sau normal, detaliat la fiecare produs). Cursul de schimb aplicabil este cursul de vânzare comunicat de BNR sau banca parteneră vizată (de ex. TBI Bank) în ziua facturării.
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">5. Livrare</h2>
          <p>
            Livrarea autovehiculelor se face fie cu ridicare personală de la parcul nostru auto, fie contra cost prin serviciul de livrare la domiciliul clientului din România. Vehiculele se predau doar pe baza documentației prealabil semnate.
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">6. Garanție</h2>
          <p>
            Conform legislației, vehiculele noastre rulate pot fi însoțite de o garanție asumată și agreată la semnarea contractului, cu termen și limite de kilometri impuse. Serviciile de garanție extra necesită respectarea unui regim strict de service.
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">7. Limitarea răspunderii și Proprietate Intelectuală</h2>
          <p>
            Ne rezervăm dreptul de a corecta eventuale omisiuni sau erori afișate din greșeală pe platformă. Textele, imaginile, sigla și conceptul website-ului aparțin BENEFIC DARIUS AUTOS S.R.L. și nu pot fi copiate fără un acord explicit.
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">8. Legislație și Instanța Competentă</h2>
          <p>
            Orice litigiu izvorât din utilizarea platformei noastre va fi soluționat amiabil, iar dacă acest lucru nu este posibil, competența revine instanțelor judecătorești românești de la sediul BENEFIC DARIUS AUTOS S.R.L.
          </p>
        </div>
      </motion.div>
    </main>
    </>
  );
}
