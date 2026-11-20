import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Check, Copy, ExternalLink } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';
import { getTranslations } from '../data/translations';
import { useLocale } from '../context/LocaleContext';
import { KineticWordArrange } from './KineticWordArrange';
import { ThemeHeaderEmoji } from './ThemeHeaderEmoji';
import { ReadingTimeTag } from './ReadingTimeTag';
import { PortfolioTheme } from '../types';
import { sounds } from '../utils/audio';

export function Contact({ theme }: { theme: PortfolioTheme }) {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const { personalInfo } = getPortfolioData(locale);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<'primary' | 'secondary' | null>(null);

  const handleCopyEmail = (value: string, field: 'primary' | 'secondary') => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    sounds.playSuccess();
    setTimeout(() => {
      setCopiedField((prev) => (prev === field ? null : prev));
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sounds.playSuccess();
    setSubmitted(true);

    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      formData.subject || `${t.contact.defaultSubjectPrefix} ${formData.name}`
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    )}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 400);
  };

  return (
    <section
      id="contact"
      data-snap-role="secondary"
      className="portfolio-snap-section py-16 sm:py-24 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct info & links */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <ThemeHeaderEmoji section="contact" theme={theme} />
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">06</span>
                <span aria-hidden="true">/</span>
                <span>{t.contact.sectionLabel}</span>
                <ReadingTimeTag section="contact" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
                <KineticWordArrange
                  key={`contact-${locale}`}
                  trigger="inView"
                  intensity="section"
                  segments={[
                    { text: t.contact.headingLead },
                    { text: t.contact.headingAccent, className: 'text-indigo-600 dark:text-indigo-400' },
                  ]}
                />
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.contact.subtitle}
              </p>
            </motion.div>

            {/* Direct contact cards */}
            <div className="space-y-3 pt-1">
              {/* 1st Priority Primary Email */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
                className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800/95 bg-white/90 dark:bg-slate-900/80 flex items-center justify-between gap-3 card-glow hover:border-indigo-400/60 dark:hover:border-indigo-500/60"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/60 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold block">
                      {t.contact.primaryPriority}
                    </span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors break-all sm:truncate block"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyEmail(personalInfo.email, 'primary')}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center gap-1.5 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0 ${
                    copiedField === 'primary'
                      ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-700/90 bg-slate-50 dark:bg-slate-800/80 hover:border-indigo-400/60 text-slate-700 dark:text-slate-200'
                  }`}
                  title={t.contact.copyPrimaryAria}
                  aria-label={t.contact.copyPrimaryAria}
                >
                  {copiedField === 'primary' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{t.contact.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.contact.copy}</span>
                    </>
                  )}
                </button>
              </motion.div>

              {/* 2nd Priority University Email */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.06 }}
                className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800/95 bg-white/90 dark:bg-slate-900/80 flex items-center justify-between gap-3 card-glow hover:border-slate-300 dark:hover:border-slate-700"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200/70 dark:border-slate-700/70 text-slate-600 dark:text-slate-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">
                      {t.contact.secondaryPriority}
                    </span>
                    <a
                      href={`mailto:${personalInfo.secondaryEmail}`}
                      className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors break-all sm:truncate block"
                    >
                      {personalInfo.secondaryEmail}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyEmail(personalInfo.secondaryEmail, 'secondary')}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center gap-1.5 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0 ${
                    copiedField === 'secondary'
                      ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-700/90 bg-slate-50 dark:bg-slate-800/80 hover:border-indigo-400/60 text-slate-700 dark:text-slate-200'
                  }`}
                  title={t.contact.copySecondaryAria}
                  aria-label={t.contact.copySecondaryAria}
                >
                  {copiedField === 'secondary' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{t.contact.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.contact.copy}</span>
                    </>
                  )}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800/95 bg-white/90 dark:bg-slate-900/80 flex items-center gap-3 card-glow hover:border-slate-300 dark:hover:border-slate-700"
              >
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/60 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">
                    {t.contact.phoneLabel}
                  </span>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.18 }}
                className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800/95 bg-white/90 dark:bg-slate-900/80 flex items-center gap-3 card-glow hover:border-slate-300 dark:hover:border-slate-700"
              >
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/60 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">
                    {t.contact.campusLabel}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                    {personalInfo.location}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Social channels */}
            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs font-mono">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200/90 dark:border-slate-800/95 bg-white/90 dark:bg-slate-900/80 hover:border-indigo-400/60 dark:hover:border-indigo-500/60 text-slate-800 dark:text-slate-200 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>
                  {t.contact.githubLabel} ({personalInfo.githubHandle})
                </span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href={personalInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200/90 dark:border-slate-800/95 bg-white/90 dark:bg-slate-900/80 hover:border-indigo-400/60 dark:hover:border-indigo-500/60 text-slate-800 dark:text-slate-200 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>
                  {t.contact.instagramLabel} ({personalInfo.instagramHandle})
                </span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200/90 dark:border-slate-800/95 bg-white/95 dark:bg-slate-900/85 shadow-sm space-y-6 card-glow hover:border-indigo-400/50 dark:hover:border-indigo-500/50">
              <div className="space-y-1">
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {t.contact.formTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono break-all">
                  {t.contact.formSubtitlePrefix} {personalInfo.email}
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-center space-y-3"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                    {t.contact.sentTitle}
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 max-w-sm mx-auto leading-relaxed">
                    {t.contact.sentBodyPrefix}{' '}
                    <strong className="font-mono break-all">{personalInfo.email}</strong> {t.contact.sentOrUni}{' '}
                    <span className="font-mono break-all">{personalInfo.secondaryEmail}</span>).
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-4 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    {t.contact.sendAnother}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="c-name" className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
                        {t.contact.nameLabel}
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.contact.namePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700/90 bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-white text-xs outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="c-email" className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
                        {t.contact.emailLabel}
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.contact.emailPlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700/90 bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-white text-xs outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="c-subj" className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
                      {t.contact.subjectLabel}
                    </label>
                    <input
                      id="c-subj"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={t.contact.subjectPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700/90 bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-white text-xs outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="c-msg" className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
                      {t.contact.messageLabel}
                    </label>
                    <textarea
                      id="c-msg"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contact.messagePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700/90 bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-white text-xs outline-none focus:border-indigo-500 resize-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-xs font-mono flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.contact.submitButton}</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
