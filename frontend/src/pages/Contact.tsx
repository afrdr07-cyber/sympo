import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';

export const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Thank you! Your message has been sent to symposium coordinators.', 'success');
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Get In Touch</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Contact Coordinators</h1>
        <p className="text-sm text-slate-300">
          Have questions or need assistance? Reach out to our staff and student coordinators.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Contact Info & Coordinators */}
        <div className="space-y-8">
          
          <div className="glass-panel p-8 rounded-3xl space-y-6 border border-slate-800">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">Faculty & Student Coordinators</h3>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold block">Staff Convener:</span>
                <span className="text-white font-semibold text-sm">Mrs. B. Neelu, M.E., (Ph.D.) (HOD / AI&DS)</span>
                <p className="text-slate-400">Phone: +91 98765 43210 | Email: hod.aids@psvcet.ac.in</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-violet-400 font-bold block">Staff Coordinator:</span>
                <span className="text-white font-semibold text-sm">Mrs. S. Indumathi, M.E. (AP / AI&DS)</span>
                <p className="text-slate-400">Phone: +91 94433 12345 | Email: indumathi.aids@psvcet.ac.in</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold block">Student Coordinators:</span>
                <span className="text-white font-semibold text-sm">Vignesh (President) & Priyadarshini (Secretary)</span>
                <p className="text-slate-400">Phone: +91 98765 43211 / +91 98765 43212</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-3 border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>P.S.V College of Engineering & Technology, Balagananapalli, Krishnagiri - 635108.</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>symposium.aids@psvcet.ac.in</span>
            </div>
          </div>

        </div>

        {/* Inquiry Form */}
        <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-3xl space-y-6 border border-slate-800">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <span>Send Direct Message</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Message / Inquiry *</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your question or feedback..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <Button type="submit" isLoading={loading} className="w-full" icon={<Send className="w-4 h-4" />}>
            Send Message
          </Button>
        </form>

      </div>

    </div>
  );
};
