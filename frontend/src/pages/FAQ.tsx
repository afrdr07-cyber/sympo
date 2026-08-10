import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the registration fee for the symposium?',
      a: 'The registration fee is ₹150 per event/participant. Every participant receives an official Registration ID and downloadable PDF receipt upon registration.'
    },
    {
      q: 'Can I register for multiple events?',
      a: 'Yes! You can register for up to 2 Technical Events, 2 Non-Technical Events, or 1 Tech + 1 Non-Tech. Exception: Free Fire is an exclusive squad event and cannot be combined with any other event.'
    },
    {
      q: 'Is food and refreshment provided?',
      a: 'Yes, complimentary lunch and refreshments will be provided for all registered participants on the day of the symposium.'
    },
    {
      q: 'How do team registrations work for Paper Presentation and Free Fire?',
      a: 'Every team member registers individually and receives their own unique Registration ID and PDF receipt. In the form, enter the same Team Name to link your squad.'
    },
    {
      q: 'Will participation certificates be issued?',
      a: 'Yes! All participants who attend the symposium events will receive an official certificate issued by P.S.V CET Department of AI & DS.'
    },
    {
      q: 'Is college transport available to reach the campus?',
      a: 'Yes, college buses will operate on key routes from Krishnagiri, Hosur, Bargur, and surrounding hubs to the campus.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20">
          <HelpCircle className="w-4 h-4" />
          <span>Frequently Asked Questions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Got Questions?</h1>
        <p className="text-sm text-slate-300">
          Find answers to common queries regarding registration, payments, and event rules.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="glass-panel rounded-2xl border border-slate-800 overflow-hidden transition-colors"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-white hover:text-cyan-400 transition-colors"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openIdx === idx ? 'rotate-180 text-cyan-400' : ''}`} />
            </button>
            {openIdx === idx && (
              <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
