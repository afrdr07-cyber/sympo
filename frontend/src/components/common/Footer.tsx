import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, MapPin, Mail, Phone, Calendar, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Branding & Intro */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                P.S.V CET AI&DS
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Department of Artificial Intelligence & Data Science presents <strong>AI NEXUS 2026</strong> - National Level Technical Symposium. Empowering future tech pioneers.
            </p>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
              <Calendar className="w-4 h-4" />
              <span>Event Date: August 2026</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-cyan-500 pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Symposium</Link></li>
              <li><Link to="/schedule" className="hover:text-cyan-400 transition-colors">Schedule & Timeline</Link></li>
              <li><Link to="/events/technical" className="hover:text-cyan-400 transition-colors">Technical Events</Link></li>
              <li><Link to="/events/non-technical" className="hover:text-cyan-400 transition-colors">Non-Technical Events</Link></li>
              <li><Link to="/rules" className="hover:text-cyan-400 transition-colors">Symposium Guidelines</Link></li>
            </ul>
          </div>

          {/* Col 3: Event Information */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-violet-500 pl-2">
              Important Info
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/faq" className="hover:text-violet-400 transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/register" className="hover:text-violet-400 transition-colors">Online Registration</Link></li>
              <li><Link to="/contact" className="hover:text-violet-400 transition-colors">Coordinators Contact</Link></li>
              <li className="text-slate-500">Venue: PSV CET Campus</li>
            </ul>
          </div>

          {/* Col 4: Contact & Map */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-cyan-500 pl-2">
              Campus Address
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">P.S.V College of Engineering & Technology, Balagananapalli, Orappam, Krishnagiri - 635108.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-400">symposium.aids@psvcet.ac.in</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-400">+91 98765 43210 / +91 94433 12345</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 P.S.V College of Engineering & Technology (AI & DS). All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>by Dept. of Artificial Intelligence & Data Science</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
