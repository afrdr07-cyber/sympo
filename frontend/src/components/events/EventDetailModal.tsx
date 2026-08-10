import React from 'react';
import { EventItem } from '../../types';
import { X, CheckCircle2, User, Users, AlertTriangle, PhoneCall } from 'lucide-react';
import { Button } from '../common/Button';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
  onSelect: (event: EventItem) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose, onSelect }) => {
  if (!event) return null;

  const isFreeFire = event.name.includes('Free Fire');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel max-w-2xl w-full rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative border border-slate-700 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
            event.category === 'Technical' ? 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/30' : 'bg-violet-500/10 text-violet-500 border border-violet-500/30'
          }`}>
            {event.category} Event
          </span>
          <span className="text-xs px-3 py-1 rounded-full font-semibold bg-slate-800 text-slate-300 flex items-center gap-1.5">
            {event.type === 'Team' ? <Users className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
            {event.type} Participation
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
          {event.name}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {event.description}
        </p>

        {/* Free Fire Special Notice */}
        {isFreeFire && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 mb-6 flex items-start gap-3 text-rose-400">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <span className="font-bold">CRITICAL EVENT COMBINATION RULE:</span> Selecting Free Fire prohibits participating in any other symposium event. Free Fire squad members cannot choose additional technical or non-technical events.
            </div>
          </div>
        )}

        {/* Event Rules List */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
            Rules & Guidelines
          </h4>
          <ul className="space-y-2.5">
            {event.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Coordinator Info */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 mb-6 flex items-center gap-3">
          <PhoneCall className="w-5 h-5 text-cyan-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-slate-900 dark:text-white block">Event Coordinators:</span>
            <span className="text-slate-600 dark:text-slate-400">{event.coordinator}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs text-slate-400 block">Registration Fee</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">₹{event.fee}</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => { onSelect(event); onClose(); }}>
              Select & Register
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
