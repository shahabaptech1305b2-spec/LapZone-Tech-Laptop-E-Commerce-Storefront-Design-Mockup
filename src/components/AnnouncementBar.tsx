import React, { useState } from 'react';
import { Sparkles, Check, Copy, X } from 'lucide-react';

interface AnnouncementBarProps {
  onApplyCode: (code: string) => void;
  appliedCode?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onApplyCode, appliedCode }) => {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText('STUDENT10');
    setCopied(true);
    onApplyCode('STUDENT10');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-[#0F172A] border-b border-slate-800 text-slate-200 text-xs py-2 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="text-[#06B6D4] font-bold inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#06B6D4]" />
            ⚡ Special Student Discount:
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Get 10% OFF on all Laptops across Pakistan
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">Code:</span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-[#06B6D4] px-2.5 py-0.5 rounded font-mono font-semibold transition-colors border border-cyan-500/30 cursor-pointer"
            title="Click to copy & apply code"
          >
            STUDENT10
            {copied || appliedCode === 'STUDENT10' ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3 opacity-70" />
            )}
          </button>
          {(copied || appliedCode === 'STUDENT10') && (
            <span className="text-emerald-400 text-[11px] font-medium hidden md:inline">
              ✓ Applied to checkout!
            </span>
          )}
        </div>

        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss banner"
          className="text-slate-400 hover:text-white transition-colors p-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
