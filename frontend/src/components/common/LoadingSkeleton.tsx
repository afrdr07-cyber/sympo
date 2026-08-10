import React from 'react';

export const LoadingSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="glass-panel p-6 rounded-2xl animate-pulse space-y-4 border border-slate-800"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-slate-700/50" />
            <div className="w-16 h-6 rounded-full bg-slate-700/50" />
          </div>
          <div className="w-3/4 h-6 rounded bg-slate-700/50" />
          <div className="w-full h-12 rounded bg-slate-700/30" />
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div className="w-20 h-4 rounded bg-slate-700/50" />
            <div className="w-24 h-8 rounded-xl bg-slate-700/50" />
          </div>
        </div>
      ))}
    </div>
  );
};
