import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function ConfidentialitatePage() {
  return (
    <>
      <Helmet>
        <title>Politica de Confidențialitate | Benefic Car</title>
        <meta name="description" content="Află cum colectăm și procesăm datele tale personale la Benefic Car conform standardelor GDPR." />
      </Helmet>
      <main id="main-content" className="w-full bg-white pt-[100px] md:pt-[120px] pb-20 px-5 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="font-display font-bold text-navy-800 text-3xl mb-8">Politica de Confidențialitate</h1>
        
        <div className="font-body text-navy-600 leading-relaxed space-y-6">
          <p>
            La BENEFIC DARIUS AUTOS S.R.L. tratăm datele dumneavoastră personale cu maximă responsabilitate și ne supunem strict rigorilor Regulamentului General privind Protecția Datelor (GDPR).
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">1. Identitatea Operatorului</h2>
          <p>
            Operatorul datelor dumneavoastră personale este BENEFIC DARIUS AUTOS S.R.L., cu sediul în Sat Ciolpani, Comuna Ciolpani, Str. Calea București Nr. 4B, Jud. Ilfov, înregistrată la Registrul Comerțului sub nr. J2024002312235, CUI 49835667. Pentru orice probleme de protecția datelor ne puteți scrie la <a href="mailto:contact@beneficcar.ro" className="text-mauve-600 hover:text-mauve-500 underline">contact@beneficcar.ro</a>.
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">2. Datele colectate</h2>
          <p>
            Prin formularele de contact, finanțare sau solicitare comandă stocăm următoarele date:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Nume, prenume;</li>
              <li>Număr de telefon, adresă email;</li>
              <li>Date privind cereri detaliate autoturisme, preferințe buget sau nevoi financiare (sume de start/avans evaluativ).</li>
            </ul>
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">3. Scopurile și Temeiul Prelucrării</h2>
          <p>
            Datele sunt prelucrate pe temeiul consimțământului dumneavoastră, dar și obligației pre-contractuale pentru a vă putea emite oferte detaliate, aprobări decizionale de parcurs la cererile financiare, evaluări Buy-Back și discuții specifice privind mașina dorită.
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">4. Destinatarii Datelor</h2>
          <p>
            Aceste date sunt utilizate intern de departamanetul Vânzări și Financiar al BENEFIC DARIUS AUTOS S.R.L. și pot fi partajate doar la cererea expresă catre entități financiare de credit (ex: TBI Bank) strict pentru evaluarea opțiunilor de rate auto agreate în mod direct de către dumneavoastră.
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">5. Durata de stocare</h2>
          <p>
            Păstrăm datele temporar strict până la conversia dorinței dumneavoastră într-un autoturism. Fără un aspect legal atașat (precum emiterea unei facturi sau transfer de responsabilitate auto conform legii române – situații care presupun arhivare extinsă cerută prin lege), datele neutilizate comercial se vor decupla organic în cel mai scurt timp rezonabil după prestarea activității suport.
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">6. Drepturile Dumneavoastră</h2>
          <p>
            Aveți direct și gratuit dreptul legal de a solicita BENEFIC DARIUS AUTOS S.R.L. accesul la datele cu caracter personal, rectificarea sau ștergerea acestora (dreptul de a fi uitat). Mai purtați de asemenea dreptul de restricționare, portabilitate, opoziție.
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">7. Reclamații ANSPDCP</h2>
          <p>
            Considerați că am greșit? Deși vă rugăm respectuos să discutați mai întâi cu noi pentru o rezolvare lină, aveți dreptul clar de a depune plângere către Autoritatea Națională de Supraveghere a Prelucrării Datelor (ANSPDCP - www.dataprotection.ro).
          </p>

        </div>
      </motion.div>
    </main>
    </>
  );
}
