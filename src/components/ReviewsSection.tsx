import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, X } from 'lucide-react';
import { ReviewItem } from '../types/laptop';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  onAddReview: (review: ReviewItem) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onAddReview }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Computer Science Student');
  const [city, setCity] = useState('Karachi');
  const [laptopName, setLaptopName] = useState('Lenovo Legion 5 Pro (RTX 4060)');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: name,
      role,
      city,
      laptopName,
      rating,
      date: 'Just now',
      comment,
      verifiedPurchase: true,
    };

    onAddReview(newRev);
    setIsModalOpen(false);
    setName('');
    setComment('');
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-[#06B6D4] uppercase tracking-wider mb-1">
              Verified Buyer Experiences
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              What Tech Professionals & Students Say
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="font-bold text-amber-500 font-mono text-sm">4.9 / 5.0</span>
              <span className="text-slate-400">·</span>
              <span>Based on 340+ verified deliveries</span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-[#06B6D4]" />
              Write Review
            </button>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-slate-400 text-[11px]">{rev.date}</span>
                </div>

                {/* Machine title */}
                <div className="text-xs font-bold text-slate-800 font-mono line-clamp-1">
                  {rev.laptopName}
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author info */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-xs">{rev.author}</div>
                  <div className="text-[11px] text-slate-500">{rev.role}</div>
                  <div className="text-[10px] text-slate-400">{rev.city}</div>
                </div>
                {rev.verifiedPurchase && (
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-100 font-medium px-1.5 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Write a Customer Review</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Daniyal Khan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:border-[#06B6D4] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Profession / Role</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Software Engineer"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:border-[#06B6D4] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City / Campus</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lahore / GIKI"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:border-[#06B6D4] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Purchased Machine</label>
                <input
                  type="text"
                  required
                  value={laptopName}
                  onChange={(e) => setLaptopName(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:border-[#06B6D4] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRating(val)}
                      className={`px-3 py-1 text-xs rounded border cursor-pointer font-bold ${
                        rating === val
                          ? 'bg-amber-500 text-white border-amber-500'
                          : 'border-slate-300 text-slate-600'
                      }`}
                    >
                      {val} ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Experience & Performance Feedback</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share details about performance, battery life, packaging and delivery..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:border-[#06B6D4] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs px-3 py-2 text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  Submit Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
