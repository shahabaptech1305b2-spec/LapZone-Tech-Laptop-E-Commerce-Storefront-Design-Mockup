import React, { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard, ChevronRight, Calculator, CheckCircle2 } from 'lucide-react';
import { formatPKR } from '../utils/format';

export const TrustBadges: React.FC = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [samplePrice, setSamplePrice] = useState(295000);
  const [tenure, setTenure] = useState<3 | 6 | 9 | 12>(12);
  const [bank, setBank] = useState('Bank Alfalah');

  const monthlyInstallment = Math.round(samplePrice / tenure);

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Badge 1: Warranty */}
          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors space-y-2">
            <div className="w-10 h-10 rounded-lg bg-cyan-100/80 text-cyan-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#06B6D4]" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">
              1-Year Official Warranty
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              100% genuine products with manufacturer serial numbers verifiable on brand portals.
            </p>
          </div>

          {/* Badge 2: Delivery */}
          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors space-y-2">
            <div className="w-10 h-10 rounded-lg bg-cyan-100/80 text-cyan-700 flex items-center justify-center">
              <Truck className="w-6 h-6 text-[#06B6D4]" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">
              Insured Nationwide Delivery
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              TCS & Leopards Express tracked shipping with tamper-evident security sealing all over Pakistan.
            </p>
          </div>

          {/* Badge 3: 7-Day Replacement */}
          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors space-y-2">
            <div className="w-10 h-10 rounded-lg bg-cyan-100/80 text-cyan-700 flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-[#06B6D4]" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">
              7-Day Replacement
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Zero hassle replacement guarantee if any hardware or manufacturing defect is detected upon delivery.
            </p>
          </div>

          {/* Badge 4: Installments */}
          <div className="p-5 rounded-xl border border-cyan-200/80 bg-cyan-50/40 hover:bg-cyan-50/70 transition-colors space-y-2 relative">
            <div className="w-10 h-10 rounded-lg bg-[#0F172A] text-cyan-400 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-[#06B6D4]" />
            </div>
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">
                0% Interest Installments
              </h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Credit card installment plans up to 12 months with leading Pakistani banks.
            </p>
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#06B6D4] hover:text-cyan-700 transition-colors pt-1 cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5" />
              {showCalculator ? 'Hide EMI Calculator' : 'Calculate Monthly EMI'}
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Interactive EMI Calculator Drawer */}
        {showCalculator && (
          <div className="mt-6 p-6 rounded-xl bg-slate-900 text-white border border-slate-700 animate-fade-in space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h4 className="font-bold text-base text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#06B6D4]" />
                  0% Markup EMI Installment Calculator
                </h4>
                <p className="text-xs text-slate-400">
                  Select your bank credit card, loan tenure, and price to see your estimated monthly installment.
                </p>
              </div>
              <button
                onClick={() => setShowCalculator(false)}
                className="text-xs text-slate-400 hover:text-white self-start sm:self-auto"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-slate-300 font-semibold mb-1">
                  Bank Card
                </label>
                <select
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  className="w-full text-xs bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:border-[#06B6D4]"
                >
                  <option value="Bank Alfalah">Bank Alfalah (Visa / MC)</option>
                  <option value="Standard Chartered">Standard Chartered</option>
                  <option value="MCB Bank">MCB Bank</option>
                  <option value="Silkbank">Silkbank</option>
                  <option value="Faysal Bank">Faysal Bank Noor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-semibold mb-1">
                  Laptop Value (PKR)
                </label>
                <input
                  type="number"
                  min={100000}
                  max={1000000}
                  step={10000}
                  value={samplePrice}
                  onChange={(e) => setSamplePrice(Number(e.target.value))}
                  className="w-full text-xs bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:border-[#06B6D4] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-semibold mb-1">
                  Tenure (Months)
                </label>
                <div className="grid grid-cols-4 gap-1 p-1 bg-slate-800 rounded-lg">
                  {[3, 6, 9, 12].map((m) => (
                    <button
                      key={m}
                      onClick={() => setTenure(m as 3 | 6 | 9 | 12)}
                      className={`text-xs py-1.5 rounded font-semibold transition-colors cursor-pointer ${
                        tenure === m
                          ? 'bg-[#06B6D4] text-slate-950 shadow-xs'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {m}M
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex flex-col justify-center">
                <span className="text-[11px] text-slate-400">Monthly Payment ({tenure} mos)</span>
                <span className="text-xl font-mono font-extrabold text-[#06B6D4]">
                  {formatPKR(monthlyInstallment)}
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" /> 0% Profit Rate / Zero Processing Fee
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
