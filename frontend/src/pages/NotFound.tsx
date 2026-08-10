import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { AlertCircle, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 text-center">
      <div className="glass-panel p-10 rounded-3xl max-w-md w-full space-y-6 border border-slate-800">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-white">404 Page Not Found</h1>
          <p className="text-xs text-slate-400">The requested page link does not exist or has been moved.</p>
        </div>
        <Link to="/">
          <Button icon={<Home className="w-4 h-4" />}>
            Back to Home Page
          </Button>
        </Link>
      </div>
    </div>
  );
};
