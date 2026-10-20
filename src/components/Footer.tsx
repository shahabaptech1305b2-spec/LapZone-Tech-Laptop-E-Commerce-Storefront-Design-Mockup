import React, { useState } from 'react';
import { Laptop, Send, ShieldAlert, PackageCheck, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenWarrantyModal: () => void;
  onOpenTrackingModal: () => void;
  onOpenFaqModal: () => void;
}

const BRANDS = [
  { name: 'Apple', tag: 'Authorized Partner' },
  { name: 'Dell', tag: 'Direct Commercial' },
  { name: 'HP', tag: 'Pro / OMEN Reseller' },
  { name: 'Lenovo', tag: 'Legion & ThinkPad' },
  { name: 'ASUS', tag: 'ROG & Zenbook' },
  { name: 'Acer', tag: 'Swift & Predator' },
];

export const Footer: React.FC<FooterProps> = ({
  onOpenWarrantyModal,
  onOpenTrackingModal,
  onOpenFaqModal,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Brand Logos Bar */}
        <div className="pb-10 border-b border-slate-800">
          <div className="text-center mb-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#06B6D4]">
              Official Brand Distribution & Direct Warranty
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 p-4 rounded-xl text-center transition-colors group"
              >
                <div className="font-extrabold text-lg text-white group-hover:text-[#06B6D4] transition-colors">
                  {brand.name}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">{brand.tag}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand Story & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-xl font-black text-white">
              <div className="w-8 h-8 rounded-lg bg-[#06B6D4] flex items-center justify-center text-slate-950 font-bold">
                <Laptop className="w-5 h-5" />
              </div>
              <span>
                Lap<span className="text-[#06B6D4]">Zone</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Pakistan's dedicated specialist in authentic laptops, ultrabooks, and mobile workstations. Official box-packed devices with online serial verification, zero hidden markup, and door-to-door courier insurance.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <div className="text-xs font-bold text-white mb-1.5">
                Stay updated on Laptop Price Drops & Tech Deals
              </div>
              {subscribed ? (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-800/80 p-2.5 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Subscribed! We will alert you on flash sales & student vouchers.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-800/90 border border-slate-700 text-xs text-white px-3 py-2 rounded-lg flex-1 focus:outline-none focus:border-[#06B6D4]"
                  />
                  <button
                    type="submit"
                    className="bg-[#06B6D4] hover:bg-cyan-400 text-slate-950 font-bold px-3.5 py-2 rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 3: Support Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase text-white tracking-wider">
              Customer Support
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenWarrantyModal}
                  className="hover:text-[#06B6D4] transition-colors flex items-center gap-1.5 text-slate-400 hover:text-white cursor-pointer"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                  Warranty Claim Portal
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTrackingModal}
                  className="hover:text-[#06B6D4] transition-colors flex items-center gap-1.5 text-slate-400 hover:text-white cursor-pointer"
                >
                  <PackageCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Live Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFaqModal}
                  className="hover:text-[#06B6D4] transition-colors flex items-center gap-1.5 text-slate-400 hover:text-white cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                  Buying Guide & FAQs
                </button>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Official WhatsApp Support Helpline: +92 300 1234567 (Mon-Sat 10am-9pm PKT)');
                  }}
                  className="hover:text-[#06B6D4] transition-colors flex items-center gap-1.5 text-slate-400 hover:text-white"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  Corporate Bulk Orders (B2B)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Categories */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase text-white tracking-wider">
              Popular Catalog
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Gaming Laptops (RTX 40-Series)</li>
              <li>Apple MacBooks (M2, M3 Max)</li>
              <li>Business Ultrabooks (XPS & ThinkPad)</li>
              <li>Student Laptops under 150k PKR</li>
              <li>Creator 4K OLED Workstations</li>
            </ul>
          </div>

          {/* Col 5: Security & Payment Options */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase text-white tracking-wider">
              Payment & Security
            </h5>
            <p className="text-[11px] text-slate-400">
              Encrypted 256-bit checkout with 0% interest bank installments.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Visa', 'Mastercard', 'Bank Transfer', 'EasyPaisa', 'JazzCash', 'Cash on Delivery'].map((badge) => (
                <span
                  key={badge}
                  className="bg-slate-800 text-[10px] text-slate-300 px-2 py-1 rounded border border-slate-700 font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
            <div className="text-[11px] text-slate-500 pt-2">
              National Tax Number (NTN): 7291048-3 · Registered SECP
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 LapZone Pakistan (Pvt) Ltd. All brand logos and trademarks belong to their respective manufacturers.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Primary: #0F172A</span>
            <span>·</span>
            <span className="text-[#06B6D4]">Accent: #06B6D4</span>
            <span>·</span>
            <span>Karachi · Lahore · Islamabad</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
