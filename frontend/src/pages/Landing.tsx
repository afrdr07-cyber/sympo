import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, MapPin, Award, Users, ArrowRight, Code2, Brain, Gamepad2, FileText, Eye, Camera } from 'lucide-react';
import { Button } from '../components/common/Button';

export const Landing: React.FC = () => {
  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-10 lg:pt-16 pb-6 overflow-hidden">
        
        {/* Futuristic Ambient Light Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/20 via-blue-600/15 to-indigo-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-cyan-400/10 rounded-full blur-[90px] -z-10 pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[90px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          
          {/* Department Top Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase shadow-xl shadow-cyan-500/5 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span>Dept of Artificial Intelligence & Data Science</span>
          </div>

          {/* Institution & Symposium Hero Heading Stack */}
          <div className="space-y-3 max-w-5xl mx-auto">
            
            {/* College Name */}
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-300 dark:text-slate-300 uppercase">
              P.S.V. COLLEGE OF ENGINEERING & TECHNOLOGY
            </h2>

            {/* Autonomous Institution Subtitle */}
            <div className="flex items-center justify-center gap-2">
              <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-cyan-500/50" />
              <span className="text-xs sm:text-sm md:text-base font-bold tracking-widest text-cyan-400 dark:text-cyan-300 uppercase">
                (An Autonomous Institution)
              </span>
              <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-cyan-500/50" />
            </div>

            {/* Main Title Banner */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none py-2">
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent inline-block">
                AI NEXUS 2026
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 bg-clip-text text-transparent">
              National Level Technical & Non-Technical Symposium
            </p>

          </div>

          {/* Description Paragraph */}
          <p className="text-sm sm:text-lg text-slate-400 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Unleash your technical excellence at PSV CET’s flagship symposium. 6 thrill-packed competitions spanning reverse coding, AI research presentations, memory battles, photography, and Free Fire e-sports!
          </p>

          {/* Key Details Pill Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold">
            <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-800 text-slate-200">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Event Date: August 2026</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-800 text-slate-200">
              <MapPin className="w-4 h-4 text-violet-400" />
              <span>PSV CET Campus, Krishnagiri</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-800 text-slate-200">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Cash Prizes & Certificates</span>
            </div>
          </div>

          {/* Action Call To Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/register">
              <Button size="lg" icon={<Sparkles className="w-5 h-5" />}>
                Register Online Now
              </Button>
            </Link>
            <Link to="/events/technical">
              <Button variant="outline" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                View All 6 Events
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Technical Events', count: '3 Core', desc: 'Reverse Coding, Paper, Quiz' },
            { label: 'Non-Tech Events', count: '3 Fun', desc: 'Free Fire, Photography, Memory' },
            { label: 'Cash Prizes', count: '₹50,000+', desc: 'For Winners & Runners' },
            { label: 'Certificates', count: 'All Participants', desc: 'Recognized by PSV CET' }
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-6 rounded-3xl text-center space-y-2 border border-slate-200 dark:border-slate-800">
              <span className="text-2xl sm:text-4xl font-extrabold text-cyan-500 dark:text-cyan-400">{stat.count}</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{stat.label}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EVENT HIGHLIGHT CARDS (ALL 6 EVENTS DISPLAYED) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-cyan-500 dark:text-cyan-400 uppercase tracking-widest">Compete & Excel</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">All Symposium Events</h2>
          <p className="text-xs text-slate-400">Technical & Non-Technical Competitions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* 1. Reverse Coding */}
          <div className="glass-card p-8 rounded-3xl space-y-4 border border-cyan-500/30 hover:border-cyan-500/60 transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Technical</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Reverse Coding</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Analyze compiled output binaries and deduce original source logic in Python, C, C++, or Java.
            </p>
            <div className="pt-2">
              <Link to="/events/technical" className="text-xs font-bold text-cyan-500 hover:underline flex items-center gap-1">
                Learn More & Rules <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 2. Paper Presentation */}
          <div className="glass-card p-8 rounded-3xl space-y-4 border border-blue-500/30 hover:border-blue-500/60 transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Technical</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Paper Presentation</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Present groundbreaking AI & Data Science research papers to expert academic panels.
            </p>
            <div className="pt-2">
              <Link to="/events/technical" className="text-xs font-bold text-blue-500 hover:underline flex items-center gap-1">
                Submit Abstract PDF <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 3. Technical Quiz */}
          <div className="glass-card p-8 rounded-3xl space-y-4 border border-violet-500/30 hover:border-violet-500/60 transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
                <Brain className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">Technical</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Technical Quiz</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Test your speed and technical knowledge across AI, ML, Data Science, and CS core concepts.
            </p>
            <div className="pt-2">
              <Link to="/events/technical" className="text-xs font-bold text-violet-500 hover:underline flex items-center gap-1">
                Quiz Rules <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 4. Memory Challenge */}
          <div className="glass-card p-8 rounded-3xl space-y-4 border border-emerald-500/30 hover:border-emerald-500/60 transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Non-Technical</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Memory Challenge</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Test your cognitive recall across progressive visual sequence and object pattern memory rounds.
            </p>
            <div className="pt-2">
              <Link to="/events/non-technical" className="text-xs font-bold text-emerald-500 hover:underline flex items-center gap-1">
                Memory Rules <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 5. Photography */}
          <div className="glass-card p-8 rounded-3xl space-y-4 border border-amber-500/30 hover:border-amber-500/60 transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Camera className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Non-Technical</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Photography</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Capture campus life, architectural aesthetics, and mood under on-spot announced themes.
            </p>
            <div className="pt-2">
              <Link to="/events/non-technical" className="text-xs font-bold text-amber-500 hover:underline flex items-center gap-1">
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 6. E-Sports (Free Fire) */}
          <div className="glass-card p-8 rounded-3xl space-y-4 border border-rose-500/30 hover:border-rose-500/60 transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">Non-Technical</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">E-Sports (Free Fire)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Assemble your 4-player mobile squad and battle for victory in our Free Fire tournament.
            </p>
            <div className="pt-2">
              <Link to="/events/non-technical" className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1">
                Register Squad <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* QUICK CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-10 rounded-3xl text-center space-y-6 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-violet-950/40 border border-cyan-500/30 relative overflow-hidden">
          <h2 className="text-3xl font-extrabold text-white">Ready to Showcase Your Talent?</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Registration fee is ₹150 per event/participant. Get instant registration ID and downloadable PDF receipt.
          </p>
          <Link to="/register">
            <Button size="lg" icon={<Sparkles className="w-5 h-5" />}>
              Start Online Registration
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};
