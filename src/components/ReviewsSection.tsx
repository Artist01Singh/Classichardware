import React, { useState } from 'react';
import { Star, ExternalLink, MessageSquarePlus, Check, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ReviewsSection: React.FC = () => {
  const { reviews, business, addReview } = useStore();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    addReview({
      author: author.trim(),
      role: role.trim() || 'Client',
      rating,
      comment: comment.trim(),
      source: 'Verified Client'
    });

    setSubmitted(true);
    setTimeout(() => {
      setAuthor('');
      setRole('');
      setComment('');
      setRating(5);
      setSubmitted(false);
      setShowReviewForm(false);
    }, 2000);
  };

  return (
    <section id="reviews" className="py-20 bg-[#FBFBFC] text-[#191C21] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#D97706] font-semibold mb-2">
              Verified Client Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#17191E] leading-tight mb-2">
              Trusted by Architects, Contractors & Homeowners.
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Google Business Rating</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-slate-900 font-bold">4.9 / 5.0</span>
              <span aria-hidden="true">·</span>
              <span>Based on {business.reviewCount}+ verified reviews</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-[#D97706]" />
              Write a Review
            </button>

            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#17191E] hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              View on Google Maps
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Optional Review Form */}
        {showReviewForm && (
          <div className="mb-12 p-6 bg-white border border-slate-200 rounded-xl shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Submit Client Review
              </h3>
              <button
                onClick={() => setShowReviewForm(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                Thank you! Your verified review has been published.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ar. Rohit Sharma"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Designation / Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Interior Designer / Homeowner"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Rating *
                    </label>
                    <div className="flex items-center gap-1 py-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 text-slate-300 hover:text-[#D97706] transition-colors"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              star <= rating
                                ? 'text-[#D97706] fill-[#D97706]'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Your Experience & Review *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Share your experience regarding our hardware quality, finishes, and customer service..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#17191E] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating
                          ? 'text-[#D97706] fill-[#D97706]'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                  <span className="text-[11px] font-mono font-semibold text-slate-700 ml-1">
                    {rev.rating}.0
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-900">{rev.author}</div>
                  <div className="text-[11px] text-slate-500">{rev.role}</div>
                </div>
                <div className="text-[10px] text-slate-400 text-right">
                  <div>{rev.date}</div>
                  <div className="text-slate-600 font-medium">{rev.source}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
