import React, { useState } from 'react';
import { RegistrationResponseData } from '../../types';
import { Download, Printer, CheckCircle2, Cpu, Loader2 } from 'lucide-react';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';

interface ReceiptCardProps {
  registrationData: RegistrationResponseData;
}

export const ReceiptCard: React.FC<ReceiptCardProps> = ({ registrationData }) => {
  const { showToast } = useToast();
  const [downloading, setDownloading] = useState<boolean>(false);

  const handleDownloadPdf = async () => {
    try {
      setDownloading(true);
      const regId = registrationData.registrationId;
      
      let blob: Blob;

      try {
        // Method 1: Instant direct generation from current registration data
        const response = await api.post('/receipt/generate', registrationData, {
          responseType: 'blob'
        });
        blob = new Blob([response.data], { type: 'application/pdf' });
      } catch {
        // Method 2: Fallback GET request by registration ID
        const response = await api.get(`/receipt/${regId}`, {
          responseType: 'blob'
        });
        blob = new Blob([response.data], { type: 'application/pdf' });
      }

      // Create blob download link and trigger file save
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `Registration_Receipt_${regId}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up after download trigger
      setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
      }, 100);

      showToast('Official PDF Receipt downloaded successfully!', 'success');
    } catch (err: any) {
      showToast('Downloading PDF failed. Using browser print format instead.', 'warning');
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="glass-panel p-8 rounded-3xl max-w-2xl mx-auto space-y-6 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10" />

      {/* Printable Receipt Area */}
      <div className="print-area space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-white shadow-md">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">AI NEXUS 2026</h3>
              <p className="text-[10px] text-cyan-400 font-semibold">P.S.V CET AI&DS National Level Symposium</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Registration ID</span>
            <span className="text-sm font-extrabold text-cyan-400">{registrationData.registrationId}</span>
          </div>
        </div>

        {/* Status Stamp */}
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
            <CheckCircle2 className="w-5 h-5" />
            <span>REGISTRATION CONFIRMED</span>
          </div>
          <span className="text-xs text-slate-400">Payment Verified: SUCCESS</span>
        </div>

        {/* Participant Details */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Participant Details</h4>
          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div><span className="text-slate-500 block">Name:</span><span className="font-bold text-white">{registrationData.participant.fullName}</span></div>
            <div><span className="text-slate-500 block">Email:</span><span className="font-bold text-white">{registrationData.participant.email}</span></div>
            <div><span className="text-slate-500 block">Mobile:</span><span className="font-bold text-white">{registrationData.participant.mobileNumber}</span></div>
            <div><span className="text-slate-500 block">College:</span><span className="font-bold text-white">{registrationData.participant.collegeName}</span></div>
            <div><span className="text-slate-500 block">Dept & Year:</span><span className="font-bold text-white">{registrationData.participant.department} ({registrationData.participant.year})</span></div>
            <div><span className="text-slate-500 block">Total Paid:</span><span className="font-bold text-cyan-400">₹{registrationData.totalAmount}</span></div>
          </div>
        </div>

        {/* Selected Events Table */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Registered Events</h4>
          <div className="space-y-2">
            {registrationData.selectedEvents.map((ev, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs">
                <span className="font-bold text-white">{ev.eventName}</span>
                <span className="text-slate-400">{ev.category}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Direct PDF Download Button */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
        <Button
          className="w-full sm:w-auto flex-1"
          onClick={handleDownloadPdf}
          isLoading={downloading}
          icon={downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
        >
          {downloading ? 'Generating Official PDF...' : 'Download Official PDF Receipt'}
        </Button>
        <Button variant="outline" className="w-full sm:w-auto" onClick={handlePrint} icon={<Printer className="w-4 h-4" />}>
          Print Receipt
        </Button>
      </div>

    </div>
  );
};
