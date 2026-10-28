import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Check, Copy, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/audio';

export function Contact() {
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

    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      formData.subject || `Collaboration Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    )}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 400);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-28">
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
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">06</span>
                <span aria-hidden="true">/</span>
                <span>GET IN TOUCH</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
                Let's build something{' '}
                <span className="text-indigo-600 dark:text-indigo-400">useful together.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Have a custom tool idea, want to collaborate on an app or game build, or looking to connect with a consistent first-year CSE builder? Reach out directly anytime.
              </p>
            </motion.div>

            {/* Direct contact cards */}
            <div className="space-y-3 pt-1">
              {/* 1st Priority Primary Email */}
              <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800/95 bg-white/90 dark:bg-slate-900/80 flex items-center justify-between gap-3 card-glow hover:border-indigo-400/60 dark:hover:border-indigo-500/60">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/60 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold block">
                      1st Priority · Primary Email
                    </span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors break-all sm:truncate block"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyEmail(PERSONAL_INFO.email, 'primary')}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center gap-1.5 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0 ${
                    copiedField === 'primary'
                      ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-700/90 bg-slate-50 dark:bg-slate-800/80 hover:border-indigo-400/60 text-slate-700 dark:text-slate-200'
                  }`}
                  title="Copy primary email"
                  aria-label="Copy primary email address"
                >
                  {copiedField === 'primary' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* 2nd Priority University Email */}
              <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800/95 bg-white/90 dark:bg-slate-900/80 flex items-center justify-between gap-3 card-glow hover:border-slate-300 dark:hover:border-slate-700">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200/70 dark:border-slate-700/70 text-slate-600 dark:text-slate-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">
                      2nd Priority · RBU Student Email
                    </span>
                    <a
                      href={`mailto:${PERSONAL_INFO.secondaryEmail}`}
                      className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors break-all sm:truncate block"
                    >
                      {PERSONAL_INFO.secondaryEmail}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyEmail(PERSONAL_INFO.secondaryEmail, 'secondary')}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center gap-1.5 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0 ${
                    copiedField === 'secondary'
                      ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-700/90 bg-slate-50 dark:bg-slate-800/80 hover:border-indigo-400/60 text-slate-700 dark:text-slate-200'
                  }`}
                  title="Copy secondary student email"
                  aria-label="Copy secondary student email address"
                >
                  {copiedField === 'secondary' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800/95 bg-white/90 dark:bg-slate-900/80 flex items-center gap-3 card-glow hover:border-slate-300 dark:hover:border-slate-700">
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/60 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">
                    Phone / Mobile
                  </span>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800/95 bg-white/90 dark:bg-slate-900/80 flex items-center gap-3 card-glow hover:border-slate-300 dark:hover:border-slate-700">
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/60 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">
                    Campus & City
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                    {PERSONAL_INFO.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs font-mono">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200/90 dark:border-slate-800/95 bg-white/90 dark:bg-slate-900/80 hover:border-indigo-400/60 dark:hover:border-indigo-500/60 text-slate-800 dark:text-slate-200 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>GitHub ({PERSONAL_INFO.githubHandle})</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href={PERSONAL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200/90 dark:border-slate-800/95 bg-white/90 dark:bg-slate-900/80 hover:border-indigo-400/60 dark:hover:border-indigo-500/60 text-slate-800 dark:text-slate-200 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Instagram ({PERSONAL_INFO.instagramHandle})</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200/90 dark:border-slate-800/95 bg-white/95 dark:bg-slate-900/85 shadow-sm space-y-6 card-glow hover:border-indigo-400/50 dark:hover:border-indigo-500/50">
              <div className="space-y-1">
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono break-all">
                  Messages dispatch straight to {PERSONAL_INFO.email}
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                    Message Draft Ready!
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 max-w-sm mx-auto leading-relaxed">
                    Your email client has been opened with your message pre-filled. You can also write directly to{' '}
                    <strong className="font-mono break-all">{PERSONAL_INFO.email}</strong> (or university email:{' '}
                    <span className="font-mono break-all">{PERSONAL_INFO.secondaryEmail}</span>).
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-4 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="c-name" className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
                        Your Name *
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Sharma"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700/90 bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-white text-xs outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="c-email" className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
                        Your Email *
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700/90 bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-white text-xs outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="c-subj" className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
                      Subject / Topic
                    </label>
                    <input
                      id="c-subj"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Project Collaboration / Client Inquiry / Hello"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700/90 bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-white text-xs outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="c-msg" className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
                      Message *
                    </label>
                    <textarea
                      id="c-msg"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share what you're building or how we can work together..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700/90 bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-white text-xs outline-none focus:border-indigo-500 resize-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-xs font-mono flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
