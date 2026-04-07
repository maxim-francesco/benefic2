import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import { Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%', amount: 0.1 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const fullMessage = formData.subject 
      ? `[Subiect: ${formData.subject}] ${formData.message}`
      : formData.message;

    try {
      const res = await fetch('https://saas-platform-backend.onrender.com/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId: 'cmnmfqggh02hkxi2784vniylc',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: fullMessage
        })
      });

      if (!res.ok) {
        throw new Error('Eroare la trimiterea mesajului.');
      }

      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' }); // reset
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Contact Form Error:', err);
      }
      setError('A apărut o eroare. Te rugăm să încerci din nou sau să ne suni direct.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 20 }}
      className="w-full max-w-lg py-16 px-5 md:py-20 md:px-12 mx-auto md:ml-auto md:mr-0 flex flex-col"
    >
      <div className="text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-400 uppercase mb-2">
        MESAJ
      </div>
      <h2 className="font-display font-bold text-white text-2xl mt-2">
        Trimite-ne un Mesaj
      </h2>
      <p className="font-body text-navy-200 text-sm mt-3">
        Completează formularul și revenim cu un răspuns rapid.
      </p>

      {submitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-6 flex flex-col items-center text-center gap-3"
        >
          <CheckCircle size={36} className="text-emerald-400 shrink-0" />
          <span className="font-body font-medium text-emerald-100 text-sm leading-relaxed">
            Mesajul tău a fost trimis cu succes!<br/>Revenim în maxim 24h.
          </span>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5 relative">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-950/50 border border-red-500/50 rounded-xl p-4 flex items-center gap-3 text-red-200 text-sm font-body"
            >
              <AlertCircle size={18} className="text-red-400 shrink-0" />
              {error}
            </motion.div>
          )}

          {/* Nume & Telefon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input 
              required type="text" id="name" name="name" placeholder="Numele tău" aria-label="Numele tău"
              value={formData.name} onChange={handleChange}
              disabled={isSubmitting}
              className="w-full bg-navy-700/50 border border-navy-600/30 rounded-xl px-4 py-3.5 font-body text-sm text-white placeholder-navy-400 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-500/20 outline-none transition-all disabled:opacity-50"
            />
            <input 
              required type="tel" id="phone" name="phone" placeholder="Număr de telefon" aria-label="Număr de telefon"
              value={formData.phone} onChange={handleChange}
              disabled={isSubmitting}
              className="w-full bg-navy-700/50 border border-navy-600/30 rounded-xl px-4 py-3.5 font-body text-sm text-white placeholder-navy-400 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-500/20 outline-none transition-all disabled:opacity-50"
            />
          </div>

          {/* Email */}
          <input 
            required type="email" id="email" name="email" placeholder="Adresa de email" aria-label="Adresa de email"
            value={formData.email} onChange={handleChange}
            disabled={isSubmitting}
            className="w-full bg-navy-700/50 border border-navy-600/30 rounded-xl px-4 py-3.5 font-body text-sm text-white placeholder-navy-400 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-500/20 outline-none transition-all disabled:opacity-50"
          />

          {/* Subiect */}
          <div className="relative">
            <select 
              required id="subject" name="subject" aria-label="Subiectul mesajului"
              value={formData.subject} onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full bg-navy-700/50 border border-navy-600/30 rounded-xl px-4 py-3.5 font-body text-sm placeholder-navy-400 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-500/20 outline-none transition-all appearance-none cursor-pointer disabled:opacity-50 ${!formData.subject ? 'text-navy-400' : 'text-white'}`}
            >
              <option value="" disabled hidden>Selectează subiectul...</option>
              <option className="bg-navy-800 text-white" value="Informații mașină">Informații mașină</option>
              <option className="bg-navy-800 text-white" value="Finanțare">Finanțare</option>
              <option className="bg-navy-800 text-white" value="Garanție">Garanție</option>
              <option className="bg-navy-800 text-white" value="Buy Back">Buy Back</option>
              <option className="bg-navy-800 text-white" value="Mașini la comandă">Mașini la comandă</option>
              <option className="bg-navy-800 text-white" value="Programare vizită">Programare vizită</option>
              <option className="bg-navy-800 text-white" value="Altele">Altele</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-navy-400">
              <ChevronDown size={18} />
            </div>
          </div>

          {/* Mesaj */}
          <textarea 
            required id="message" name="message" rows={5} placeholder="Scrie-ne mesajul tău..." aria-label="Conținutul mesajului"
            value={formData.message} onChange={handleChange}
            disabled={isSubmitting}
            className="w-full bg-navy-700/50 border border-navy-600/30 rounded-xl px-4 py-3.5 font-body text-sm text-white placeholder-navy-400 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-500/20 outline-none transition-all resize-none disabled:opacity-50"
          />

          {/* Button */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-mauve-600 text-white rounded-full py-4 font-display font-semibold transition-all duration-300 hover:bg-mauve-500 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(139,111,138,0.2)] mt-4 disabled:opacity-70 disabled:hover:scale-100 disabled:hover:bg-mauve-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Se trimite...
              </>
            ) : (
              'Trimite Mesajul'
            )}
          </button>
        </form>
      )}
    </motion.div>
  );
}
