import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2, Ticket } from 'lucide-react';
import { CartItem } from '../types/laptop';
import { formatPKR } from '../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (laptopId: string, qty: number) => void;
  onRemoveItem: (laptopId: string) => void;
  onClearCart: () => void;
  promoCode: string;
  onApplyPromoCode: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  promoCode,
  onApplyPromoCode,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'easypaisa' | 'bank' | 'card_emi'>('cod');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('Karachi');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.laptop.price * item.quantity, 0);
  const isStudentDiscountApplied = promoCode.toUpperCase() === 'STUDENT10';
  const discountAmount = isStudentDiscountApplied ? Math.round(rawSubtotal * 0.1) : 0;
  const shippingFee = shippingMethod === 'express' ? 1500 : 0;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      onApplyPromoCode(couponInput.trim().toUpperCase());
      setCouponInput('');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) return;
    setCheckoutStep('success');
  };

  const handleCloseAndReset = () => {
    if (checkoutStep === 'success') {
      onClearCart();
      setCheckoutStep('cart');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#06B6D4]" />
            <h3 className="font-extrabold text-[#0F172A] text-base">
              {checkoutStep === 'cart' && `Your Bag (${items.reduce((acc, i) => acc + i.quantity, 0)} items)`}
              {checkoutStep === 'checkout' && 'Fast Checkout & Delivery'}
              {checkoutStep === 'success' && 'Order Confirmed!'}
            </h3>
          </div>
          <button
            onClick={handleCloseAndReset}
            aria-label="Close cart"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {checkoutStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="text-center py-20 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">Your cart is empty</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Explore our gaming, business, or budget laptop catalog to add high-performance hardware.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    Browse Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Items List */}
                  <div className="divide-y divide-slate-100">
                    {items.map(({ laptop, quantity }) => (
                      <div key={laptop.id} className="py-3 flex gap-3 items-center">
                        <img
                          src={laptop.image}
                          alt={laptop.name}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-lg object-cover bg-slate-900 border border-slate-200"
                        />
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {laptop.name}
                          </h4>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {formatPKR(laptop.price)} each
                          </div>
                          <div className="flex items-center gap-2 pt-1">
                            <div className="flex items-center border border-slate-200 rounded">
                              <button
                                onClick={() => onUpdateQuantity(laptop.id, quantity - 1)}
                                className="p-1 text-slate-500 hover:text-slate-900"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold font-mono text-slate-800">
                                {quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(laptop.id, quantity + 1)}
                                className="p-1 text-slate-500 hover:text-slate-900"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => onRemoveItem(laptop.id)}
                              className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right font-mono font-bold text-xs text-slate-900">
                          {formatPKR(laptop.price * quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Code Box */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 flex items-center gap-1">
                        <Ticket className="w-3.5 h-3.5 text-[#06B6D4]" /> Have a Voucher Code?
                      </span>
                      {isStudentDiscountApplied && (
                        <span className="text-[11px] font-bold text-emerald-600">
                          10% Student Discount Active
                        </span>
                      )}
                    </div>
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. STUDENT10"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 uppercase font-mono focus:outline-none focus:border-[#06B6D4]"
                      />
                      <button
                        type="submit"
                        className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="bg-cyan-50 border border-cyan-200 p-3 rounded-lg text-xs text-cyan-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
                <span>Insured Courier Dispatch directly to your home or office address in Pakistan.</span>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  1. Delivery Details
                </h4>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Muhammad Ahmed"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:border-[#06B6D4] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Phone (Active WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:border-[#06B6D4] focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      City *
                    </label>
                    <select
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:border-[#06B6D4] focus:outline-none"
                    >
                      <option value="Karachi">Karachi</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Quetta">Quetta</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Complete Street Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House / Apartment #, Street, Sector / Area"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:border-[#06B6D4] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  2. Payment Method
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'cod'
                        ? 'border-[#06B6D4] bg-cyan-50/50 font-bold text-slate-900'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <span>Cash on Delivery</span>
                    <span className="text-[10px] text-slate-400 font-normal">Pay upon inspection</span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('card_emi')}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'card_emi'
                        ? 'border-[#06B6D4] bg-cyan-50/50 font-bold text-slate-900'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <span>0% Bank EMI</span>
                    <span className="text-[10px] text-slate-400 font-normal">Credit card installments</span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'easypaisa'
                        ? 'border-[#06B6D4] bg-cyan-50/50 font-bold text-slate-900'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <span>EasyPaisa / JazzCash</span>
                    <span className="text-[10px] text-slate-400 font-normal">Direct wallet transfer</span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'bank'
                        ? 'border-[#06B6D4] bg-cyan-50/50 font-bold text-slate-900'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <span>Online Bank Transfer</span>
                    <span className="text-[10px] text-slate-400 font-normal">Meezan / Alfalah</span>
                  </label>
                </div>
              </div>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 mx-auto flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Order #LZ-{Math.floor(100000 + Math.random() * 900000)} Placed!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you <strong className="text-slate-900">{customerName}</strong>. Your laptop dispatch order has been sent to our Karachi fulfillment hub. A confirmation SMS & tracking code has been dispatched to {customerPhone}.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Destination:</span>
                  <span className="font-semibold text-slate-800">{customerCity}, Pakistan</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment:</span>
                  <span className="font-semibold uppercase text-slate-800">{paymentMethod.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold">
                  <span className="text-slate-700">Total Payable:</span>
                  <span className="font-mono text-cyan-700 text-sm">{formatPKR(finalTotal)}</span>
                </div>
              </div>
              <button
                onClick={handleCloseAndReset}
                className="w-full bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl cursor-pointer"
              >
                Return to LapZone Store
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer with Calculations & Trigger */}
        {checkoutStep !== 'success' && items.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span className="font-mono text-slate-800 font-semibold">{formatPKR(rawSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Student Promo (10% OFF):</span>
                  <span className="font-mono">-{formatPKR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>Nationwide Insured Delivery:</span>
                <span className="text-emerald-600 font-semibold uppercase">Free</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#0F172A] pt-2 border-t border-slate-200">
                <span>Estimated Total:</span>
                <span className="font-mono text-cyan-700">{formatPKR(finalTotal)}</span>
              </div>
            </div>

            {checkoutStep === 'cart' ? (
              <button
                onClick={() => setCheckoutStep('checkout')}
                className="w-full bg-[#06B6D4] hover:bg-cyan-400 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors cursor-pointer shadow-md shadow-cyan-500/20"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="px-4 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  Back to Bag
                </button>
                <button
                  form="checkout-form"
                  type="submit"
                  className="flex-1 bg-[#06B6D4] hover:bg-cyan-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer shadow-md shadow-cyan-500/20"
                >
                  Confirm & Place Order ({formatPKR(finalTotal)})
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
