import React from 'react';
import { EventItem } from '../../types';
import { Code2, FileText, Brain, Eye, Camera, Gamepad2, Users, User, ArrowRight, ShieldAlert } from 'lucide-react';
import { Button } from '../common/Button';

interface EventCardProps {
  event: EventItem;
  onSelect: (event: EventItem) => void;
  onViewDetails: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect, onViewDetails }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-6 h-6 text-cyan-400" />;
      case 'FileText': return <FileText className="w-6 h-6 text-blue-400" />;
      case 'Brain': return <Brain className="w-6 h-6 text-violet-400" />;
      case 'Eye': return <Eye className="w-6 h-6 text-emerald-400" />;
      case 'Camera': return <Camera className="w-6 h-6 text-amber-400" />;
      case 'Gamepad2': return <Gamepad2 className="w-6 h-6 text-rose-400" />;
      default: return <Code2 className="w-6 h-6 text-cyan-400" />;
    }
  };

  const isFreeFire = event.name.includes('Free Fire');

  return (
    <div className={`glass-card p-6 rounded-3xl relative flex flex-col justify-between group transition-all duration-300 ${
      isFreeFire ? 'border-rose-500/40 hover:border-rose-500 shadow-rose-500/10' : ''
    }`}>
      
      {/* Exclusive Free Fire Warning Badge */}
      {isFreeFire && (
        <div className="absolute -top-3 right-6 bg-gradient-to-r from-rose-600 to-amber-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
          <ShieldAlert className="w-3 h-3" />
          <span>EXCLUSIVE SQUAD EVENT</span>
        </div>
      )}

      <div>
        {/* Header Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center group-hover:scale-110 transition-transform">
            {getIcon(event.icon)}
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              event.category === 'Technical'
                ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20'
                : 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20'
            }`}>
              {event.category}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1">
              {event.type === 'Team' ? <Users className="w-3 h-3" /> : <User className="w-3 h-3" />}
              {event.type}
            </span>
          </div>
        </div>

        {/* Title & Desc */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
          {event.name}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {event.description}
        </p>
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between mt-4">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Entry Fee</span>
          <span className="text-lg font-extrabold text-slate-900 dark:text-white">₹{event.fee}</span>
          <span className="text-[10px] text-slate-500 ml-1">/ participant</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails(event)}
            className="text-xs font-semibold text-slate-500 hover:text-cyan-500 dark:hover:text-cyan-400 px-2 py-1 transition-colors"
          >
            Details
          </button>
          <Button
            size="sm"
            onClick={() => onSelect(event)}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};
