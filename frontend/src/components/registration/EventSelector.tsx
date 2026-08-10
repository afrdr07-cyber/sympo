import React from 'react';
import { EventItem } from '../../types';
import { Check, AlertCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { validateEventRules } from '../../utils/validation';

interface EventSelectorProps {
  events: EventItem[];
  selectedEvents: EventItem[];
  onToggleEvent: (event: EventItem) => void;
}

export const EventSelector: React.FC<EventSelectorProps> = ({ events, selectedEvents, onToggleEvent }) => {
  const isSelected = (id: string) => selectedEvents.some(e => e.id === id);
  const validation = validateEventRules(selectedEvents);

  return (
    <div className="space-y-6">
      
      {/* Rules Notice */}
      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <span className="font-bold text-white">FLAT REGISTRATION FEE (₹150):</span> Pay ₹150 total to register for <span className="text-cyan-400 font-bold">any 1 or 2 general events</span> (2 Tech, 2 Non-Tech, or 1 Tech + 1 Non-Tech). <span className="text-rose-400 font-bold">Exception: Free Fire is an exclusive squad event (₹150/player) and cannot be combined with other events.</span>
        </div>
      </div>

      {/* Validation Warning Alert */}
      {!validation.valid && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-rose-400 flex items-start gap-3 text-xs">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="font-semibold">{validation.message}</span>
        </div>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((ev) => {
          const selected = isSelected(ev.id);
          const isFreeFire = ev.name.includes('Free Fire');

          return (
            <div
              key={ev.id}
              onClick={() => onToggleEvent(ev)}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer select-none flex items-start justify-between gap-4 ${
                selected
                  ? isFreeFire
                    ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-500/20'
                    : 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    ev.category === 'Technical' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-violet-500/20 text-violet-400'
                  }`}>
                    {ev.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">{ev.type}</span>
                </div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  {ev.name}
                  {isFreeFire && <ShieldAlert className="w-4 h-4 text-rose-400" />}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {ev.description}
                </p>
                <div className="pt-2 text-xs font-bold text-cyan-400">
                  {isFreeFire ? '₹150 per player' : 'Included in ₹150 Symposium Fee'}
                </div>
              </div>

              {/* Checkbox Icon */}
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
                selected
                  ? isFreeFire
                    ? 'bg-rose-500 border-rose-500 text-white'
                    : 'bg-cyan-500 border-cyan-500 text-white'
                  : 'border-slate-700 bg-slate-800'
              }`}>
                {selected && <Check className="w-4 h-4" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
