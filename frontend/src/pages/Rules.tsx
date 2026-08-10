import React from 'react';
import { ShieldAlert, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

export const Rules: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Guidelines & Policies</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Symposium Rules</h1>
        <p className="text-sm text-slate-300">
          Official rules and code of conduct for all participants at P.S.V CET AI&DS Symposium 2026.
        </p>
      </div>

      {/* General Rules */}
      <div className="glass-panel p-8 rounded-3xl space-y-6 border border-slate-800">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span>General Rules & Code of Conduct</span>
        </h3>

        <ul className="space-y-4 text-xs text-slate-300">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span><strong>Eligibility:</strong> Open to all undergraduate (B.E / B.Tech) students of engineering colleges and autonomous institutes.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span><strong>College ID Card:</strong> All participants MUST carry their valid College ID card for verification at the registration desk.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span><strong>Formal Dress Code:</strong> Formal attire is mandatory on campus premises. Casuals or improper footwear are strictly not allowed inside event halls.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span><strong>Reporting Time:</strong> Participants must report at the registration desk by 08:30 AM sharp. Late arrivals may result in disqualification.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span><strong>Judges' Decision:</strong> The decision of the event judges and organizing committee will be final and binding under all circumstances.</span>
          </li>
        </ul>
      </div>

      {/* Event Combination Matrix */}
      <div className="glass-panel p-8 rounded-3xl space-y-6 border border-rose-500/30">
        <h3 className="text-xl font-bold text-rose-400 border-b border-slate-800 pb-3 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          <span>Event Combination Rules</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Allowed Event Combinations</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>✓ Two Technical Events (e.g. Reverse Coding + Technical Quiz)</li>
              <li>✓ Two Non-Technical Events (e.g. Memory Challenge + Photography)</li>
              <li>✓ One Technical + One Non-Technical Event</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-3">
            <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              <span>Prohibited Combinations</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>❌ Free Fire + ANY technical or non-technical event (Strict Exclusivity Rule)</li>
              <li>❌ Registering for more than 2 total events per participant</li>
              <li>❌ Duplicate registration with same mobile or email address</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};
