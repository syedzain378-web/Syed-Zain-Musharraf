import React, { useState } from 'react';
import {
  X,
  Mail,
  Copy,
  Check,
  Send,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
} from 'lucide-react';

interface ContactModalProps {
  email: string;
  name: string;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  email,
  name,
  onClose,
}) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('Engineering Consultation / Opportunity');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Contact Direct"
      className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        <header className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/90">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-semibold text-neutral-100">
              Direct Contact · Direct In-App Delivery
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close contact modal"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {isSent ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-neutral-100">
              Direct Message Dispatched!
            </h4>
            <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
              Your inquiry has been successfully sent to <span className="text-amber-300 font-mono">{email}</span>. Syed Zain Musharraf typically responds within 4–12 business hours.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs text-neutral-300">
            {/* Quick direct copy banner */}
            <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-between gap-3">
              <div className="truncate">
                <span className="text-[10px] font-mono uppercase text-neutral-500 block">
                  Direct Verified Email
                </span>
                <span className="text-xs font-mono text-neutral-200 select-all truncate block">
                  {email}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-2.5 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-[11px] font-mono text-neutral-300 flex items-center gap-1 shrink-0 transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-neutral-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div>
              <label className="block font-medium text-neutral-200 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500/60"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-200 mb-1">
                Your Email Address *
              </label>
              <input
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500/60"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-200 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500/60"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-200 mb-1">
                Message & Project Scope *
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your architectural challenge, project timeline, or role requirements..."
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500/60"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" /> ~4h Avg Response Time
              </span>

              <button
                type="submit"
                className="px-5 py-2 rounded-lg font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Direct Message</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
