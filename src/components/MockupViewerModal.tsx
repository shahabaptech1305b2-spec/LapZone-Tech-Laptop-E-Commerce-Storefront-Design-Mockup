import React, { useState } from 'react';
import { X, Download, Layers, Palette, Eye, Copy, Check, FileCode, Monitor } from 'lucide-react';

interface MockupViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MockupViewerModal: React.FC<MockupViewerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'mockup' | 'psd_specs' | 'tokens'>('mockup');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedHex(text);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleDownloadMockupJpg = () => {
    const link = document.createElement('a');
    link.href = '/src/assets/images/lapzone_website_mockup_1792487010728.jpg';
    link.download = 'LapZone-TechStore-Website-Mockup.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const PSD_LAYERS = [
    {
      group: '01_ANNOUNCEMENT_TOPBAR',
      details: 'Dark slate banner #0F172A (h: 36px) · Text "⚡ Special Student Discount: Get 10% OFF" · Voucher Pill #STUDENT10',
    },
    {
      group: '02_HEADER_NAVIGATION',
      details: 'Nav bar container (h: 72px) · LapZone Wordmark & Cyan Icon · 6 Menu links · Search Bar, Wishlist, Bag Counter',
    },
    {
      group: '03_HERO_ABOVE_THE_FOLD',
      details: 'Two-column layout · H1 Display typography · Primary CTA #06B6D4 · Secondary Outlined Button · Hero Titanium Laptop 16:9 Image',
    },
    {
      group: '04_CATEGORY_CARDS_4COL',
      details: '4 Bento category cards · Gaming (RTX), Business (MacBook), Student (Budget), Creator (4K OLED) · Dark gradient scrims',
    },
    {
      group: '05_SPECS_FILTER_WIDGET',
      details: 'Interactive filter container · Brand selector · Processor selector · Segmented RAM buttons · Budget Range slider (PKR)',
    },
    {
      group: '06_FEATURED_PRODUCT_GRID_4COL',
      details: '4-Column Card Grid · Image layer · Status badge · Title · 3-row icon specs · PKR price baseline · Add to Cart button',
    },
    {
      group: '07_SIDE_BY_SIDE_COMPARISON_TABLE',
      details: 'Comparison Matrix Table · MacBook Air vs Dell XPS 13 vs ASUS ROG Strix · 6 spec rows · Action buttons',
    },
    {
      group: '08_TRUST_GUARANTEE_BADGES',
      details: '4 Trust tiles · 1-Year Brand Warranty · Insured Courier Delivery · 7-Day Replacement · 0% EMI Installments & Calculator',
    },
    {
      group: '09_CUSTOMER_TESTIMONIALS',
      details: '4 Testimonial cards · Verified buyer checkmarks · 5-Star ratings · Reviews from students & developers',
    },
    {
      group: '10_FOOTER_COMPREHENSIVE',
      details: 'Official partner logos (Apple, Dell, HP, Lenovo, ASUS, Acer) · Support links · Newsletter input · Payment badges',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl text-white">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#06B6D4] flex items-center justify-center text-slate-950 font-bold">
              <Monitor className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                LapZone Website Mockup (JPG) & PSD Architecture
              </h3>
              <p className="text-xs text-slate-400">
                Generated presentation mockup and complete layer breakdown for designers and developers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadMockupJpg}
              className="bg-[#06B6D4] hover:bg-cyan-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download Mockup JPG
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-950/60 border-b border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('mockup')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'mockup'
                ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Mockup JPG Graphic
          </button>
          <button
            onClick={() => setActiveTab('psd_specs')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'psd_specs'
                ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            PSD / Figma Layer Structure
          </button>
          <button
            onClick={() => setActiveTab('tokens')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tokens'
                ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            Color Palette & Tokens
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {activeTab === 'mockup' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Displaying 1920x1080 High-Resolution UI Mockup Artboard</span>
                <span className="font-mono text-cyan-400">Format: Progressive JPG · 8k Rendered</span>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 group">
                <img
                  src="/src/assets/images/lapzone_website_mockup_1792487010728.jpg"
                  alt="LapZone Website Mockup High-Resolution Presentation"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain max-h-[65vh] mx-auto rounded-lg shadow-2xl"
                />
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-white font-bold">Need this artboard for your pitch deck or portfolio?</span>
                  <p className="text-slate-400">Click download to save the full 16:9 presentation JPG to your computer.</p>
                </div>
                <button
                  onClick={handleDownloadMockupJpg}
                  className="bg-[#06B6D4] hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <Download className="w-4 h-4" />
                  Save Image JPG
                </button>
              </div>
            </div>
          )}

          {activeTab === 'psd_specs' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Artboard Resolution</div>
                  <div className="text-lg font-bold font-mono text-white mt-1">1440 x 4280 px</div>
                  <div className="text-xs text-slate-500">72 DPI · RGB 8-Bit (Desktop 1440 Baseline)</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Layout Grid</div>
                  <div className="text-lg font-bold font-mono text-cyan-400 mt-1">12 Columns</div>
                  <div className="text-xs text-slate-500">Gutter: 24px · Margin: 80px · Max-width: 1280px</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Typography Pairing</div>
                  <div className="text-lg font-bold text-white mt-1">Plus Jakarta Sans</div>
                  <div className="text-xs text-slate-500">Display (800) + Body (400/600) + JetBrains Mono</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#06B6D4]" />
                  Photoshop (PSD) / Figma Layer Hierarchy Breakdown
                </div>
                <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl bg-slate-900/60 overflow-hidden text-xs">
                  {PSD_LAYERS.map((layer, idx) => (
                    <div key={idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-slate-500 text-[11px]">📁</span>
                        <span className="font-mono font-bold text-cyan-300">{layer.group}</span>
                      </div>
                      <span className="text-slate-400 text-xs sm:text-right max-w-md">{layer.details}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tokens' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="text-sm font-bold text-white">Project Color Palette</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'Primary: Deep Tech Blue', hex: '#0F172A', role: 'Headers, Hero, Footers & Primary Buttons' },
                    { name: 'Secondary: Electric Neon Teal', hex: '#06B6D4', role: 'Badges, Accents, Key Highlights & CTAs' },
                    { name: 'Background: Soft Slate / White', hex: '#F8FAFC', role: 'Main Page Canvas & Product Backdrops' },
                    { name: 'Text: Charcoal Black', hex: '#1E293B', role: 'Body Copy, Spec Bullet Typography' },
                  ].map((color) => (
                    <div key={color.hex} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                      <div
                        className="w-full h-16 rounded-lg border border-slate-700/50 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div>
                        <div className="font-bold text-xs text-white">{color.name}</div>
                        <div className="flex items-center justify-between pt-1">
                          <code className="text-xs font-mono text-cyan-400">{color.hex}</code>
                          <button
                            onClick={() => copyToClipboard(color.hex)}
                            className="p-1 hover:text-white text-slate-400 transition-colors"
                            title="Copy HEX"
                          >
                            {copiedHex === color.hex ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1 leading-tight">{color.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-[#06B6D4]" />
                    Design Tokens JSON Export
                  </span>
                  <button
                    onClick={() => {
                      const tokens = JSON.stringify(
                        {
                          brand: 'LapZone',
                          colors: {
                            primary: '#0F172A',
                            accent: '#06B6D4',
                            canvas: '#F8FAFC',
                            text: '#1E293B',
                          },
                          typography: {
                            display: 'Plus Jakarta Sans',
                            body: 'Plus Jakarta Sans',
                            mono: 'JetBrains Mono',
                          },
                        },
                        null,
                        2
                      );
                      copyToClipboard(tokens);
                    }}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
                  >
                    {copiedHex ? 'Copied Tokens!' : 'Copy Tokens JSON'}
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-slate-300 bg-slate-950 p-3 rounded-lg overflow-x-auto">
{`{
  "brand": "LapZone",
  "palette": {
    "primary": "#0F172A",
    "accent": "#06B6D4",
    "background": "#F8FAFC",
    "text": "#1E293B"
  },
  "fonts": {
    "display": "Plus Jakarta Sans, sans-serif",
    "monospace": "JetBrains Mono, monospace"
  }
}`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400">
          <span>LapZone Design Assets & Mockup Suite</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
