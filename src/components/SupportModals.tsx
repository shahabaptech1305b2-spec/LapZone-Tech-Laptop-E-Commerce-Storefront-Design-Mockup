import React, { useState } from 'react';
import { X, ShieldCheck, Search, CheckCircle, Package, Truck, HelpCircle, User, ChevronDown } from 'lucide-react';

interface SupportModalProps {
  type: 'warranty' | 'tracking' | 'faq' | 'account' | null;
  onClose: () => void;
}

export const SupportModals: React.FC<SupportModalProps> = ({ type, onClose }) => {
  const [serialQuery, setSerialQuery] = useState('');
  const [serialResult, setSerialResult] = useState<string | null>(null);

  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState<string | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!type) return null;

  const handleVerifySerial = (e: React.FormEvent) => {
    e.preventDefault();
    if (serialQuery.trim()) {
      setSerialResult(`Valid Official Warranty for Unit [${serialQuery.trim().toUpperCase()}]. Coverage Active through October 2027 via Authorized Pakistan Service Centers.`);
    }
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setTrackingResult(`Consignment #${trackingNumber.trim().toUpperCase()} with TCS Express: In Transit - Reached Hub 01 (Karachi). Scheduled Delivery: Tomorrow by 2:00 PM.`);
    }
  };

  const FAQS = [
    {
      q: 'How do I verify that my laptop is 100% genuine and brand new?',
      a: 'All laptops sold by LapZone are original, sealed box units with intact manufacturer seals. Every device includes an official warranty certificate with a serial number you can verify directly on Apple, Dell, Lenovo, HP, or ASUS global portals before open activation.',
    },
    {
      q: 'How does the 0% interest bank installment (EMI) work?',
      a: 'We support 3, 6, 9, and 12-month 0% markup installment plans on credit cards issued by Bank Alfalah, Standard Chartered, MCB, Silkbank, and Faysal Bank. During checkout, choose "0% Bank EMI" and our team will book the tenure with zero processing charges.',
    },
    {
      q: 'What is your delivery timeframe and packaging across Pakistan?',
      a: 'Karachi deliveries take 24 hours. Lahore, Islamabad, Rawalpindi, Peshawar, and Faisalabad take 24–48 hours via TCS / Leopards Express. All units are shipped inside tamper-proof, shock-absorbing inflatable air packaging with insured transit coverage.',
    },
    {
      q: 'Which laptop is recommended for Computer Science and Software Engineering?',
      a: 'For CS university students, we recommend minimum 16GB DDR5 RAM, at least 512GB NVMe SSD, and either an Intel Core i7 13th Gen, AMD Ryzen 7, or Apple M2/M3 chip. Machines like Lenovo Legion 5 Pro, Dell XPS 13, and MacBook Air are student favorites.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
            {type === 'warranty' && <ShieldCheck className="w-5 h-5 text-[#06B6D4]" />}
            {type === 'tracking' && <Truck className="w-5 h-5 text-[#06B6D4]" />}
            {type === 'faq' && <HelpCircle className="w-5 h-5 text-[#06B6D4]" />}
            {type === 'account' && <User className="w-5 h-5 text-[#06B6D4]" />}
            <span>
              {type === 'warranty' && 'Official Warranty Verification Portal'}
              {type === 'tracking' && 'Real-Time Order Tracking'}
              {type === 'faq' && 'Laptop Buying Guide & FAQs'}
              {type === 'account' && 'LapZone Customer Account'}
            </span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warranty View */}
        {type === 'warranty' && (
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Verify your serial number or file an official warranty claim with our nationwide service partner network.
            </p>
            <form onSubmit={handleVerifySerial} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Enter Serial / Service Tag (e.g. SN-8921-XPS)"
                value={serialQuery}
                onChange={(e) => setSerialQuery(e.target.value)}
                className="flex-1 border border-slate-300 rounded-lg p-2.5 font-mono text-xs uppercase focus:outline-none focus:border-[#06B6D4]"
              />
              <button
                type="submit"
                className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Verify
              </button>
            </form>
            {serialResult && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Warranty Status: Verified Genuine
                </div>
                <p className="text-[11px] leading-relaxed">{serialResult}</p>
              </div>
            )}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 space-y-1">
              <span className="font-semibold text-slate-700">Help Centers:</span>
              <p>Karachi: Technocity Mall, I.I. Chundrigar Rd · Lahore: Hafeez Centre, Main Boulevard Gulberg · Islamabad: Blue Area</p>
            </div>
          </div>
        )}

        {/* Tracking View */}
        {type === 'tracking' && (
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Enter your LapZone Order ID or TCS Courier Consignment Number to monitor live dispatch milestones.
            </p>
            <form onSubmit={handleTrackOrder} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Order ID / Tracking (e.g. LZ-48910)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1 border border-slate-300 rounded-lg p-2.5 font-mono text-xs uppercase focus:outline-none focus:border-[#06B6D4]"
              />
              <button
                type="submit"
                className="bg-[#06B6D4] hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Track
              </button>
            </form>
            {trackingResult && (
              <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl text-cyan-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Package className="w-4 h-4 text-[#06B6D4]" />
                  Status Update
                </div>
                <p className="text-[11px] leading-relaxed">{trackingResult}</p>
              </div>
            )}
          </div>
        )}

        {/* FAQ View */}
        {type === 'faq' && (
          <div className="space-y-2 text-xs">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-3 font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-2 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-cyan-600' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-3 bg-white text-slate-600 leading-relaxed border-t border-slate-200 text-xs">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Account View */}
        {type === 'account' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-10 h-10 rounded-full bg-[#0F172A] text-cyan-400 flex items-center justify-center font-bold">
                LZ
              </div>
              <div>
                <div className="font-bold text-slate-900">Student & Tech Enthusiast</div>
                <div className="text-slate-500">shahabaptech1305b2@gmail.com</div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-800 uppercase tracking-wide">Saved Addresses</span>
              <div className="p-3 border border-slate-200 rounded-lg text-slate-600">
                <div className="font-semibold text-slate-900">Default Shipping Address</div>
                <p>Gulshan-e-Iqbal, Block 13-B, Karachi, Sindh, Pakistan</p>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">+92 300 9876543</div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-800 uppercase tracking-wide">Recent Orders</span>
              <div className="p-3 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">#LZ-839201</div>
                  <div className="text-slate-500 text-[11px]">Lenovo Legion 5 Pro · Delivered</div>
                </div>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                  Completed
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
