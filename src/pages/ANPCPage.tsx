import { motion } from 'framer-motion';

export default function ANPCPage() {
  return (
    <main className="w-full bg-white pt-[100px] md:pt-[120px] pb-20 px-5 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="font-display font-bold text-navy-800 text-3xl mb-8">Protecția Consumatorilor (ANPC)</h1>
        
        <div className="font-body text-navy-600 leading-relaxed space-y-6">
          <p>
            BENEFIC CAR S.R.L. se aliniază efortului global pentru menținerea unei conduite de transparență desăvârșite din rațiunea protejării clientului direct, garantând legal și statutar drepturile consumatorilor impuse pe teritoriul României.
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">Legături Oficiale ANPC</h2>
          <p>
            Orice consumator poate utiliza formularele oficiale raportând la organele competente nemulțumiri, având la îndemâna protecția legii. Portalul digital guvernamental:
            <br/><br/>
            Website Autoritatea Națională pentru Protecția Consumatorilor: <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" className="text-mauve-600 hover:text-mauve-500 underline font-semibold">https://anpc.ro/</a>
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">Soluționarea Litigiilor E-Commerce (S.O.L.)</h2>
          <p>
            Dacă întâmpini probleme cu un produs sau anumite servicii cumpărate online, poți folosi platforma specială ODR pusă la dispoziție de către Uniunea Europeană pentru rezolvarea pe scară continentală a acestora într-o platformă digitalizată neutră. 
            <br/><br/>
            Puteți formula din acest moment cerere accesând platforma la: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-mauve-600 hover:text-mauve-500 underline font-semibold">https://ec.europa.eu/consumers/odr</a>
          </p>

          <h2 className="font-display font-semibold text-navy-700 text-xl mt-8 mb-3">Telefonul Consumatorului</h2>
          <p>
            Informații rapide pot fi raportate non-stop utilizând apelul telefonic general dedicat la <strong>021 9551</strong> (Serviciul național InfoCons pus la dispoziție de stat). Toate demersurile noastre sunt susținute de proceduri curate și clare tocmai pentru minimizarea la nul a oricăror deviații comerciale.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
