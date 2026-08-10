import React, { useEffect } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { RegistrationResponseData } from '../types';
import { ReceiptCard } from '../components/registration/ReceiptCard';
import { Button } from '../components/common/Button';
import { Sparkles, Home, ArrowLeft } from 'lucide-react';

export const SuccessPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as { registrationResult?: RegistrationResponseData };
  const registrationData = state?.registrationResult;

  useEffect(() => {
    if (registrationData) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [registrationData]);

  if (!registrationData) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">No Recent Registration Found</h2>
        <p className="text-xs text-slate-400">Please complete registration form to view your receipt.</p>
        <Link to="/register">
          <Button icon={<ArrowLeft className="w-4 h-4" />}>Go to Registration</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Registration Successful!</h1>
        <p className="text-sm text-slate-300">
          Your symposium entry has been recorded in Google Sheets database and confirmed.
        </p>
      </div>

      {/* Official Receipt Card */}
      <ReceiptCard registrationData={registrationData} />

      <div className="text-center">
        <Link to="/">
          <Button variant="ghost" icon={<Home className="w-4 h-4" />}>
            Return to Home Page
          </Button>
        </Link>
      </div>

    </div>
  );
};
