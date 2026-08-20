import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import { API_BASE, BUSINESS_ID } from '../../lib/constants';

export default function FinantareForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [applicantType, setApplicantType] = useState('Persoană fizică');
  const [amount, setAmount] = useState<string>('10000');
  const [period, setPeriod] = useState<string>('48');
  const [income, setIncome] = useState<string>('');
  const [userMessage, setUserMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitted(false);

    if (!name.trim()) {
      setError('Vă rugăm să introduceți numele complet.');
      return;
    }
    if (!phone.trim()) {
      setError('Vă rugăm să introduceți numărul de telefon.');
      return;
    }
    if (!email.trim()) {
      setError('Vă rugăm să introduceți adresa de email.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Vă rugăm să introduceți o adresă de email validă.');
      return;
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount < 1000) {
      setError('Suma dorită trebuie să fie de minim 1000 EUR.');
      return;
    }

    if (!consent) {
      setError('Trebuie să fiți de acord cu politica de confidențialitate.');
      return;
    }

    setIsSubmitting(true);

    // Compose message payload for backend
    const messageLines: string[] = [
      'Solicitare finanțare',
      `Tip solicitant: ${applicantType}`,
      `Suma dorită: ${numAmount} EUR`,
      `Perioadă: ${period} luni`,
    ];

    if (income.trim()) {
      messageLines.push(`Venit lunar net: ${income.trim()} RON`);
    }

    if (userMessage.trim()) {
      messageLines.push(`Mesaj: ${userMessage.trim()}`);
    }

    const formattedMessage = messageLines.join('\n');

    try {
      const res = await fetch(`${API_BASE}/api/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId: BUSINESS_ID,
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          message: formattedMessage,
          type: 'FINANCING',
        }),
      });

      if (!res.ok) {
        throw new Error('Eroare la trimiterea solicitării de finanțare.');
      }

      setSubmitted(true);
      setName('');
      setPhone('');
      setEmail('');
      setAmount('10000');
      setPeriod('48');
      setIncome('');
      setUserMessage('');
      setConsent(false);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Finantare Form Error:', err);
      }
      setError('A apărut o eroare. Te rugăm să încerci din nou sau să ne suni direct.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="form-finantare" className="py-16 md:py-24 bg-navy-50/70 border-t border-navy-100">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <div className="bg-white rounded-2xl p-6 md:p-10 border border-navy-100 shadow-md">
          
          <div className="text-center mb-8">
            <div className="text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-600 uppercase mb-2">
              APLICĂ ONLINE
            </div>
            <h2 className="font-display font-bold text-navy-900 text-2xl md:text-3xl">
              Solicită Finanțare
            </h2>
            <p className="font-body text-navy-500 text-sm mt-2 max-w-md mx-auto">
              Completează formularul și te contactăm în cel mai scurt timp pentru analiza dosarului.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-8 flex flex-col items-center text-center gap-3"
            >
              <CheckCircle size={40} className="text-emerald-400 shrink-0" />
              <span className="font-body font-medium text-emerald-900 text-base leading-relaxed">
                Solicitarea ta de finanțare a fost trimisă cu succes!<br />
                Un consultant Benefic Car te va contacta în curând.
              </span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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

              {/* Row 1: Nume, Telefon, Email */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="fin-name" className="font-display font-medium text-navy-700 text-xs mb-1">
                    Nume complet *
                  </label>
                  <input
                    id="fin-name"
                    type="text"
                    placeholder="Numele tău"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-4 py-3 font-body text-sm text-navy-800 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none transition-all min-h-[44px]"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="fin-phone" className="font-display font-medium text-navy-700 text-xs mb-1">
                    Telefon *
                  </label>
                  <input
                    id="fin-phone"
                    type="tel"
                    placeholder="+40 722 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-4 py-3 font-body text-sm text-navy-800 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none transition-all min-h-[44px]"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="fin-email" className="font-display font-medium text-navy-700 text-xs mb-1">
                    Email *
                  </label>
                  <input
                    id="fin-email"
                    type="email"
                    placeholder="adresa@email.ro"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-4 py-3 font-body text-sm text-navy-800 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none transition-all min-h-[44px]"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Tip Solicitant, Suma Dorită, Perioadă */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="fin-applicant-type" className="font-display font-medium text-navy-700 text-xs mb-1">
                    Tip solicitant *
                  </label>
                  <select
                    id="fin-applicant-type"
                    value={applicantType}
                    onChange={(e) => setApplicantType(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-4 py-3 font-body text-sm text-navy-800 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none transition-all min-h-[44px] cursor-pointer"
                  >
                    <option value="Persoană fizică">Persoană fizică</option>
                    <option value="Persoană juridică">Persoană juridică</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="fin-amount" className="font-display font-medium text-navy-700 text-xs mb-1">
                    Suma dorită (EUR) *
                  </label>
                  <input
                    id="fin-amount"
                    type="number"
                    min={1000}
                    placeholder="10000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-4 py-3 font-body text-sm text-navy-800 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none transition-all min-h-[44px]"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="fin-period" className="font-display font-medium text-navy-700 text-xs mb-1">
                    Perioadă *
                  </label>
                  <select
                    id="fin-period"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-4 py-3 font-body text-sm text-navy-800 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none transition-all min-h-[44px] cursor-pointer"
                  >
                    <option value="12">12 luni (1 an)</option>
                    <option value="24">24 luni (2 ani)</option>
                    <option value="36">36 luni (3 ani)</option>
                    <option value="48">48 luni (4 ani)</option>
                    <option value="60">60 luni (5 ani)</option>
                    <option value="72">72 luni (6 ani)</option>
                    <option value="84">84 luni (7 ani)</option>
                  </select>
                </div>
              </div>

              {/* Optional: Venit lunar net */}
              <div className="flex flex-col">
                <label htmlFor="fin-income" className="font-display font-medium text-navy-700 text-xs mb-1">
                  Venit lunar net (RON) <span className="text-navy-400 font-normal">(opțional)</span>
                </label>
                <input
                  id="fin-income"
                  type="number"
                  placeholder="Ex: 4500"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-4 py-3 font-body text-sm text-navy-800 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none transition-all min-h-[44px]"
                />
              </div>

              {/* Optional: Mesaj */}
              <div className="flex flex-col">
                <label htmlFor="fin-message" className="font-display font-medium text-navy-700 text-xs mb-1">
                  Mesaj <span className="text-navy-400 font-normal">(opțional)</span>
                </label>
                <textarea
                  id="fin-message"
                  rows={3}
                  placeholder="Detalii suplimentare despre solicitare..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-4 py-3 font-body text-sm text-navy-800 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none transition-all resize-none min-h-[80px]"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  id="fin-consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={isSubmitting}
                  className="w-4 h-4 mt-0.5 text-mauve-600 rounded border-navy-300 focus:ring-mauve-500 cursor-pointer shrink-0"
                />
                <label htmlFor="fin-consent" className="font-body text-xs text-navy-600 leading-snug cursor-pointer">
                  Am citit și sunt de acord cu{' '}
                  <a
                    href="/politica-confidentialitate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-mauve-600 hover:text-mauve-700"
                  >
                    Politica de Confidențialitate
                  </a>{' '}
                  a site-ului.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!consent || isSubmitting}
                className="w-full sm:w-auto bg-mauve-600 text-white rounded-full px-8 py-3.5 font-display font-semibold transition-all duration-300 hover:bg-mauve-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Se trimite solicitarea...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Trimite Solicitarea de Finanțare
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
