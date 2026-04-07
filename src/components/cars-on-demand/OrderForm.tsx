import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lock } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import { Loader2 } from 'lucide-react';

export default function OrderForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    brand: '',
    budget: '',
    details: ''
  });

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%', amount: 0.2 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formattedMessage = `[COMANDĂ MAȘINĂ]
━━━━━━━━━━━━━━━━━━━
Marcă dorită: ${formData.brand}
Buget maxim: ${formData.budget} €
━━━━━━━━━━━━━━━━━━━
Model / Cerințe suplimentare:
${formData.details || 'Nu au fost oferite detalii suplimentare.'}`;

    try {
      const res = await fetch('https://saas-platform-backend.onrender.com/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId: 'cmnmfqggh02hkxi2784vniylc',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formattedMessage
        })
      });

      if (!res.ok) {
        throw new Error('Eroare la trimiterea mesajului.');
      }

      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', brand: '', budget: '', details: '' }); // reset
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Order Form Error:', err);
      }
      setError('A apărut o eroare. Te rugăm să încerci din nou sau să ne suni direct.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full" id="formular">
      
      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="flex flex-col items-center text-center"
      >
        <div className="text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-600 uppercase mb-2">
          CERERE
        </div>
        <h2 className="font-display font-bold text-navy-800 text-3xl">
          Spune-ne Ce Mașină Vrei
        </h2>
        <p className="font-body text-navy-500 mt-3 max-w-md">
          Completează formularul și te contactăm în maxim 24h cu opțiuni.
        </p>
      </motion.div>

      {/* FORM CARD */}
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, type: "spring" as const, stiffness: 100, damping: 20, delay: 0.2 }}
        className="bg-navy-50 rounded-2xl p-5 md:p-8 border border-navy-100 mt-10"
      >
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50/80 border border-green-200 rounded-xl p-6 flex flex-col items-center text-center py-10"
          >
            <CheckCircle size={48} className="text-green-500 mb-4" strokeWidth={1.5} />
            <h3 className="font-display font-bold text-green-900 text-xl">Mesajul tău a fost trimis cu succes!</h3>
            <p className="font-body text-green-800 text-sm mt-2 max-w-sm">
              Revenim în maxim 24h.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 relative">
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50/80 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-800 text-sm font-body"
              >
                <AlertCircle size={18} className="text-red-500 shrink-0" />
                {error}
              </motion.div>
            )}

            {/* NUME */}
            <div className="flex flex-col justify-start">
              <label htmlFor="name" className="font-display font-medium text-navy-700 text-[0.85rem] mb-1.5 ml-1">Nume Complet</label>
              <input 
                required 
                type="text" 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="ex: Ion Popescu"
                className="w-full bg-white border border-navy-200 rounded-xl px-4 py-3 font-body text-sm text-navy-800 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none transition-all duration-300 shadow-sm placeholder:text-navy-300 disabled:opacity-50"
              />
            </div>

            {/* TELEFON */}
            <div className="flex flex-col justify-start">
              <label htmlFor="phone" className="font-display font-medium text-navy-700 text-[0.85rem] mb-1.5 ml-1">Telefon</label>
              <input 
                required 
                type="tel" 
                id="phone" 
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="ex: 0740 123 456"
                className="w-full bg-white border border-navy-200 rounded-xl px-4 py-3 font-body text-sm text-navy-800 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none transition-all duration-300 shadow-sm placeholder:text-navy-300 disabled:opacity-50"
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col justify-start">
              <label htmlFor="email" className="font-display font-medium text-navy-700 text-[0.85rem] mb-1.5 ml-1">Email</label>
              <input 
                required 
                type="email" 
                id="email" 
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="ex: ion@email.ro"
                className="w-full bg-white border border-navy-200 rounded-xl px-4 py-3 font-body text-sm text-navy-800 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none transition-all duration-300 shadow-sm placeholder:text-navy-300 disabled:opacity-50"
              />
            </div>

            {/* ROW: MARCA & BUGET */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col justify-start">
                <label htmlFor="brand" className="font-display font-medium text-navy-700 text-[0.85rem] mb-1.5 ml-1">Marca Dorită</label>
                <select 
                  required 
                  id="brand" 
                  value={formData.brand}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full bg-white border border-navy-200 rounded-xl px-4 py-3 font-body text-sm focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none transition-all duration-300 shadow-sm disabled:opacity-50 ${!formData.brand ? 'text-navy-300' : 'text-navy-800'}`}
                >
                  <option value="" disabled hidden>Selectează marca...</option>
                  <option value="BMW" className="text-navy-800">BMW</option>
                  <option value="Mercedes-Benz" className="text-navy-800">Mercedes-Benz</option>
                  <option value="Audi" className="text-navy-800">Audi</option>
                  <option value="Volkswagen" className="text-navy-800">Volkswagen</option>
                  <option value="Volvo" className="text-navy-800">Volvo</option>
                  <option value="Skoda" className="text-navy-800">Skoda</option>
                  <option value="Toyota" className="text-navy-800">Toyota</option>
                  <option value="Altele" className="text-navy-800">Altă marcă</option>
                </select>
              </div>
              <div className="flex flex-col justify-start">
                <label htmlFor="budget" className="font-display font-medium text-navy-700 text-[0.85rem] mb-1.5 ml-1">Buget Maxim (€)</label>
                <input 
                  required 
                  type="number" 
                  id="budget" 
                  min="3000"
                  step="500"
                  value={formData.budget}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="ex: 25000"
                  className="w-full bg-white border border-navy-200 rounded-xl px-4 py-3 font-body text-sm text-navy-800 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none transition-all duration-300 shadow-sm placeholder:text-navy-300 disabled:opacity-50"
                />
              </div>
            </div>

            {/* MESSAGE */}
            <div className="flex flex-col justify-start">
              <label htmlFor="details" className="font-display font-medium text-navy-700 text-[0.85rem] mb-1.5 ml-1">Model / Detalii Suplimentare</label>
              <textarea 
                id="details" 
                rows={4}
                value={formData.details}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="ex: BMW Seria 3, 2020+, diesel, sub 100.000 km, cutie automată, culoare închisă..."
                className="w-full bg-white border border-navy-200 rounded-xl px-4 py-3 font-body text-sm text-navy-800 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none transition-all duration-300 shadow-sm placeholder:text-navy-300 resize-none disabled:opacity-50"
              />
            </div>

            {/* BUTTON */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-navy-800 text-white rounded-full py-4 font-display font-semibold transition-all duration-300 hover:bg-navy-700 mt-2 shadow-lg shadow-navy-900/10 disabled:opacity-70 disabled:hover:bg-navy-800 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Se trimite...
                </>
              ) : (
                'Trimite Cererea'
              )}
            </button>
          </form>
        )}
      </motion.div>

      {/* CONFIDENTIALITY NOTIFICATION */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex items-center justify-center gap-1.5 mt-5"
      >
        <Lock size={12} className="text-navy-400" />
        <span className="font-body text-[0.75rem] text-navy-400 select-none">
          Datele tale sunt confidențiale și nu vor fi partajate cu terți.
        </span>
      </motion.div>

    </div>
  );
}
