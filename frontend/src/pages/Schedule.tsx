import React from 'react';
import { 
  Clock, 
  Sparkles, 
  Flame, 
  Award, 
  Coffee, 
  Code2, 
  Utensils, 
  Gamepad2, 
  Trophy, 
  HeartHandshake, 
  Flag, 
  Volume2, 
  MapPin, 
  Users, 
  GraduationCap,
  Sun,
  Moon,
  Calendar,
  Heart
} from 'lucide-react';

interface AgendaItem {
  time: string;
  title: string;
  session: 'FORENOON' | 'BREAK' | 'AFTERNOON';
  venue: string;
  desc?: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

export const Schedule: React.FC = () => {
  const forenoonItems: AgendaItem[] = [
    {
      time: '09:45 AM',
      title: 'Tamil Thai Valthu',
      session: 'FORENOON',
      venue: 'Main Auditorium',
      desc: 'Invocation song honoring Tamil Thai, marking the auspicious start of the symposium.',
      icon: Volume2,
      tag: 'Invocation'
    },
    {
      time: '09:50 AM',
      title: 'Igniting The Lamp',
      session: 'FORENOON',
      venue: 'Main Auditorium Stage',
      desc: 'Traditional lighting of Kuthuvilakku by dignitaries and department heads.',
      icon: Flame,
      tag: 'Ceremony'
    },
    {
      time: '09:55 AM',
      title: 'Welcome Address by HoD',
      session: 'FORENOON',
      venue: 'Main Auditorium',
      desc: 'Warm welcome note and symposium address by Dr. Nelu (HOD / Dept. of AI&DS).',
      icon: Users,
      tag: 'Address'
    },
    {
      time: '10:00 AM',
      title: 'Honoring The Chief Guest',
      session: 'FORENOON',
      venue: 'Main Auditorium Stage',
      desc: 'Felicitation and honoring of our Chief Guests with bouquets and mementos.',
      icon: Award,
      tag: 'Felicitation'
    },
    {
      time: '10:10 AM',
      title: 'Felicitation Address',
      session: 'FORENOON',
      venue: 'Main Auditorium',
      desc: 'Felicitation notes from college management and special invitees.',
      icon: Sparkles,
      tag: 'Address'
    },
    {
      time: '10:20 AM',
      title: 'Presidential Address by Principal',
      session: 'FORENOON',
      venue: 'Main Auditorium',
      desc: 'Presidential address delivered by Dr. V. Prabakaran, Principal, PSV CET.',
      icon: GraduationCap,
      tag: 'Presidential'
    },
    {
      time: '10:30 AM',
      title: 'Special Address by Chief Guest',
      session: 'FORENOON',
      venue: 'Main Auditorium',
      desc: 'Inspirational keynote address on AI trends by the Chief Guest.',
      icon: Sparkles,
      tag: 'Keynote'
    },
    {
      time: '11:00 AM',
      title: 'Tea Break',
      session: 'FORENOON',
      venue: 'Auditorium Foyer',
      desc: 'Short tea and snack break for all guests, staff, and student participants.',
      icon: Coffee,
      tag: 'Break'
    },
    {
      time: '11:15 AM',
      title: 'Session 1 (Technical Events)',
      session: 'FORENOON',
      venue: 'AI&DS Computer Labs & Seminar Halls',
      desc: 'Execution of technical events: Reverse Coding, Paper Presentation, and Technical Quiz.',
      icon: Code2,
      tag: 'Technical'
    }
  ];

  const breakItem: AgendaItem = {
    time: '12:45 PM',
    title: 'Lunch Break',
    session: 'BREAK',
    venue: 'College Dining Hall',
    desc: 'Delicious lunch served for all registered participants and staff.',
    icon: Utensils,
    tag: 'Lunch'
  };

  const afternoonItems: AgendaItem[] = [
    {
      time: '01:30 PM',
      title: 'Session 2 (Non-Technical Events)',
      session: 'AFTERNOON',
      venue: 'Open Auditorium & Campus Grounds',
      desc: 'Execution of non-technical events: Esports (Free Fire), Photography & Memory Challenge.',
      icon: Gamepad2,
      tag: 'Non-Technical'
    },
    {
      time: '04:00 PM',
      title: 'Valedictory',
      session: 'AFTERNOON',
      venue: 'Main Auditorium',
      desc: 'Valedictory ceremony, winner announcements, cash prize and trophy distribution.',
      icon: Trophy,
      tag: 'Valedictory'
    },
    {
      time: '04:15 PM',
      title: 'Vote of Thanks',
      session: 'AFTERNOON',
      venue: 'Main Auditorium',
      desc: 'Expressing sincere gratitude to management, guests, faculty & participants.',
      icon: HeartHandshake,
      tag: 'Closing'
    },
    {
      time: '04:25 PM',
      title: 'National Anthem',
      session: 'AFTERNOON',
      venue: 'Main Auditorium',
      desc: 'Respectful conclusion of the symposium with the National Anthem.',
      icon: Flag,
      tag: 'Conclusion'
    }
  ];

  const renderCard = (item: AgendaItem, index: number) => {
    const Icon = item.icon;
    return (
      <div key={index} className="relative pl-8 sm:pl-10 group">
        
        {/* Timeline Dot */}
        <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-500 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
          <Icon className="w-4 h-4" />
        </div>

        {/* Time Label (Desktop Left) */}
        <div className="hidden sm:block absolute -left-36 top-2 text-xs font-extrabold text-cyan-400 text-right w-28 tracking-wide">
          {item.time}
        </div>

        {/* Card */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-2 hover:border-cyan-500/40 transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="sm:hidden text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
              {item.time}
            </span>
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
              item.tag === 'Technical' 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                : item.tag === 'Non-Technical' 
                ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' 
                : item.tag === 'Lunch' || item.tag === 'Break'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}>
              {item.tag}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{item.title}</h3>
          
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{item.venue}</span>
          </div>

          {item.desc && (
            <p className="text-xs text-slate-300 leading-relaxed pt-1">{item.desc}</p>
          )}
        </div>

      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5" />
          <span>Official Event Agenda</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Symposium Schedule
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Complete timeline of inaugural proceedings, technical events, lunch break, non-technical sessions, and valedictory.
        </p>
      </div>

      {/* Agenda Container */}
      <div className="space-y-12">
        
        {/* Forenoon Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-cyan-500/30 pb-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">FORENOON SESSION</h2>
              <p className="text-xs text-slate-400">09:45 AM - 12:45 PM • Inaugural Function & Technical Events</p>
            </div>
          </div>

          <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-32 space-y-6">
            {forenoonItems.map(renderCard)}
          </div>
        </div>

        {/* Lunch Break Divider Banner */}
        <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">12:45 PM</span>
              <h3 className="text-xl font-extrabold text-white">LUNCH BREAK</h3>
              <p className="text-xs text-slate-300">Complimentary lunch served at College Dining Hall</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 whitespace-nowrap">
            12:45 PM - 01:30 PM
          </span>
        </div>

        {/* Afternoon Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-violet-500/30 pb-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">AFTERNOON SESSION</h2>
              <p className="text-xs text-slate-400">01:30 PM - 04:25 PM • Non-Technical Events & Valedictory</p>
            </div>
          </div>

          <div className="relative border-l-2 border-violet-500/30 ml-4 sm:ml-32 space-y-6">
            {afternoonItems.map(renderCard)}
          </div>
        </div>

      </div>

      {/* Footer Banner from Agenda Picture */}
      <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 text-center space-y-3 bg-gradient-to-b from-cyan-500/10 via-slate-900 to-slate-950">
        <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 tracking-wider">
          WELCOMES YOU ALL.....
        </h3>
        <p className="text-sm font-bold text-slate-300 tracking-wide">
          By : STAFFS AND STUDENTS OF AI &amp; DS
        </p>
        <p className="text-xs text-slate-400">
          P.S.V College of Engineering &amp; Technology (Autonomous), Krishnagiri
        </p>
      </div>

    </div>
  );
};
