import React from 'react';
import { Cpu, Award, BookOpen, Target, ShieldCheck, MapPin, Users, ExternalLink } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest">About Institution & Department</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          P.S.V College of Engineering & Technology
        </h1>
        <div className="flex items-center justify-center gap-2">
          <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-cyan-500/50" />
          <span className="text-xs sm:text-sm font-bold tracking-widest text-cyan-400 dark:text-cyan-300 uppercase">
            (An Autonomous Institution)
          </span>
          <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-cyan-500/50" />
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Approved by AICTE, New Delhi & Affiliated to Anna University, Chennai. Dedicated to producing visionary engineers and technological innovators.
        </p>
      </div>

      {/* Grid: Institution & Department */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Institution */}
        <div className="glass-panel p-8 rounded-3xl space-y-4 border border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">About P.S.V CET</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Established in Krishnagiri, P.S.V College of Engineering & Technology has grown into a premier technical institution committed to academic excellence, state-of-the-art laboratory infrastructure, and holistic student development across engineering disciplines.
          </p>
        </div>

        {/* Card 2: AI & DS Department */}
        <div className="glass-panel p-8 rounded-3xl space-y-4 border border-violet-500/30">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Dept. of Artificial Intelligence & Data Science</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            The Department of AI & DS equips students with cutting-edge skills in Machine Learning, Deep Learning, Big Data Analytics, Neural Networks, and Intelligent Systems, preparing them for industry leadership and academic research.
          </p>
        </div>

      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Target className="w-5 h-5" />
            <span>DEPARTMENT VISION</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            To be a center of excellence in Artificial Intelligence & Data Science education and research, nurturing innovative engineers who solve global societal and industrial challenges with ethics and technological mastery.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/80 border border-violet-500/30 space-y-3">
          <div className="flex items-center gap-2 text-violet-400 font-bold text-sm">
            <BookOpen className="w-5 h-5" />
            <span>DEPARTMENT MISSION</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Provide state-of-the-art curriculum, modern lab facilities, industrial exposure, and collaborative research environments to foster lifelong learning, leadership, and entrepreneurial mindsets.
          </p>
        </div>
      </div>

      {/* Organizing Committee */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Organizing Committee</h2>
          <p className="text-xs text-slate-400">P.S.V CET Symposium 2026 Leadership Team</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { role: 'Chief Patron', name: 'Mr. B. Alex Pandian', title: 'Tele Denmark Communication & NXP Team Lead, TCS, Chennai', initials: 'A' },
            { role: 'Patron', name: 'Dr. P. Lawrence, M.E., Ph.D.', title: 'Principal, P.S.V CET', initials: 'L' },
            { role: 'Convener', name: 'Mrs. B. Neelu, M.E., (Ph.D.)', title: 'HOD / Dept. of AI & DS', initials: 'N' },
            { role: 'Staff Coordinator', name: 'Mrs. S. Indumathi, M.E.', title: 'Assistant Professor, AI & DS', initials: 'I' }
          ].map((c, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl text-center space-y-2 border border-slate-800">
              <div className="w-12 h-12 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-cyan-400 font-bold text-sm">
                {c.initials}
              </div>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">{c.role}</span>
              <h4 className="text-sm font-bold text-white">{c.name}</h4>
              <p className="text-xs text-slate-400">{c.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Location Map Embed */}
      <div className="glass-panel p-6 rounded-3xl space-y-4 border border-slate-800">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <MapPin className="w-5 h-5 text-cyan-400" />
          <span>Campus Location</span>
        </div>
        <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-800 relative">
          <a
            href="https://maps.app.goo.gl/aZsj6cZBZSmPKCm78"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 left-4 z-10 bg-white text-cyan-600 hover:text-cyan-700 hover:bg-slate-50 border border-slate-200 shadow-md px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <span>Open in Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <iframe
            title="PSV CET Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3894.723326900767!2d78.3003805!3d12.534479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac4aa522bf0545%3A0xd86e183d11d2bfc3!2sPSV%20College%20of%20Engineering%20%26%20Technology%20(Autonomous)!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
        </div>
      </div>

    </div>
  );
};
