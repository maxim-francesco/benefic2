import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function CookiesPage() {
  return (
    <>
      <Helmet>
        <title>Politica de Cookie | Benefic Car</title>
        <meta name="description" content="Informații complete despre utilizarea fișierelor cookie pe platforma Benefic Car." />
      </Helmet>
      <main id="main-content" className="w-full bg-white pt-[100px] md:pt-[120px] pb-20 px-5 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="font-display font-bold text-navy-800 text-3xl mb-8">Politica privind Cookie-urile</h1>
        
        <div className="font-body text-navy-600 leading-relaxed space-y-6">
          <p>
            Vrem să fim expliciți și transparenți în modul de operare digital, așadar trebuie să explicăm ce modalități folosește site-ul nostru pentru a-ți asigura interacțiunea optimă.
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">Ce sunt cookie-urile?</h2>
          <p>
            Un ”Cookie” („browser cookie” sau „HTTP cookie”) reprezintă un text minuscul formatat corect alfanumeric. Este instalat grație browser-ului pe echipamentul dumneavoastră la solicitarea acestui site. El este "pasiv", neavând calități executabile pe telefonul sau computerul vizitatorului, neavând deci capacitatea de operare virusată.
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">Tipuri de cookie-uri folosite de Benefic Cars</h2>
          <p>
            Platforma se poziționează în jurul unei vizite cât mai prietenoase structural și vizual.
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li><strong>Strict Necesare:</strong> Fără de care nu funcționează elementele esențiale (protecția anti-spam, performanța rutei sau salvarea acceptului de Privacy).</li>
              <li><strong>Funcționale:</strong> Păstrează opțiuni fine grafice sau tehnice pentru ca următoarea sesiune de vizită să fie mai performantă.</li>
              <li><strong>Analitice & Performanță (ex: Google Analytics):</strong> Agregă total neidentificabil date menite să prezinte statistic performanța numărului de vizite, duratei medii a sesiunii și erorilor prin structură. Aceste cookie-uri trebuiesc de altfel permise expres.</li>
              <li><strong>Marketing:</strong> Targetare care ajută eforturile organice de campanii pe Meta, TikTok sau Google prin cookie-uri terțe, dincolo de limitele proprii ale acestui site.</li>
            </ul>
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">Control și Limitări Actuale</h2>
          <p>
            Setările implicite sunt gândite pentru protecție directă. În mod normal, majoritatea acestor acțiuni pot fi dezactivate direct prin bara globală de avertisment de Cookie și Confidențialitate localizată la accesul direct al domeniului <strong>beneficcars.ro</strong>.
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">Dezactivare generală</h2>
          <p>
            Indiferent de site, o metodă fundamentală pe care toți utilizatorii globali ar trebui să o poată manipula implică acțiunea browser-elor în materie de anonimat local:
            navighează către setările de Confidențialitate (Chrome, Safari, Firefox, Edge, Opera) și blochează "Third Party Cookies", refuză local storage neconform și forțează "Do Not Track". Noi înțelegem perfect anonimatul digital și website-ul nostru ar trebui să funcționeze 100% fluent prin interfață limitată la bază.
          </p>

        </div>
      </motion.div>
    </main>
    </>
  );
}
