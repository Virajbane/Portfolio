"use client";
import { useState, useEffect } from "react";
import { Plus, Star, X, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// Blog Review Component
export default function BlogReviews() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // Initial reviews data
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Alex Chen",
      rating: 5,
      comment:
        "The animation principles article changed how I approach UI motion design. Incredibly useful!",
      date: "April 20, 2025",
      avatar: "A",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      rating: 4,
      comment:
        "Great insights on Next.js optimization. Implemented some techniques and saw immediate improvements.",
      date: "April 3, 2025",
      avatar: "S",
    },
  ]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching reviews:", error);
      } else {
        setReviews((prev) => [...prev, ...(data || [])]);
      }
    };

    fetchReviews();
  }, []);

  // Inside BlogReviews.js or wherever you handle the review form
  const handleSubmitReview = async () => {
    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, comment, rating }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit review");
      }

      const newReview = await response.json();
      setReviews((prev) => [...prev, newReview]);

      setName("");
      setComment("");
      setRating(0);
      setShowReviewForm(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white overflow-hidden relative">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-white to-transparent opacity-5 blur-3xl rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-l from-white to-transparent opacity-5 blur-3xl rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header with Glitch Animation */}
      <header className="py-16 text-center opacity-0 animate-fadeIn relative z-10">
        <h1 className="text-7xl font-bold mb-3 tracking-tighter glitch-text">
          <span className="">Reader Reviews</span>
        </h1>
        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-white via-gray-500 to-black mb-6"></div>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Community feedback and impressions on articles and insights
        </p>
      </header>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Reviews Header with Add Button */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Latest Feedback</h2>
          <button
            onClick={() => setShowReviewForm(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-black to-gray-900 rounded-full border-x border-white border-opacity-10 hover:shadow-white hover:shadow-inner transition-all duration-300 group"
          >
            <Plus
              size={18}
              className="mr-2 transition-all duration-300 group-hover:rotate-90"
            />
            <span>Add Review</span>
          </button>
        </div>

        {/* Reviews Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {reviews.map((review, index) => (
            <div
              key={`review-${review.id ?? `fallback-${index}`}`}
              className="opacity-0 animate-slideUp"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <ReviewCard review={review} index={index} />
            </div>
          ))}
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <ReviewForm
            name={name}
            setName={setName}
            comment={comment}
            setComment={setComment}
            rating={rating}
            setRating={setRating}
            onClose={() => setShowReviewForm(false)}
            onSubmit={handleSubmitReview}
          />
        )}
      </div>

      {/* CSS for custom animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 rgba(255, 255, 255, 0.75),
              -0.05em -0.025em 0 rgba(255, 255, 255, 0.75);
          }
          14% {
            text-shadow: 0.05em 0 0 rgba(255, 255, 255, 0.75),
              -0.05em -0.025em 0 rgba(255, 255, 255, 0.75);
          }
          15% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 255, 255, 0.75),
              0.025em 0.025em 0 rgba(255, 255, 255, 0.75);
          }
          49% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 255, 255, 0.75),
              0.025em 0.025em 0 rgba(255, 255, 255, 0.75);
          }
          50% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 255, 255, 0.75),
              0.05em 0 0 rgba(255, 255, 255, 0.75);
          }
          99% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 255, 255, 0.75),
              0.05em 0 0 rgba(255, 255, 255, 0.75);
          }
          100% {
            text-shadow: -0.025em 0 0 rgba(255, 255, 255, 0.75),
              -0.025em -0.025em 0 rgba(255, 255, 255, 0.75);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse 3s infinite ease-in-out;
        }

        .glitch-text {
          position: relative;
        }

        .glitch-text .glitch-span {
          animation: glitch 5s infinite;
        }
      `}</style>
    </div>
  );
}

// Review Card Component
function ReviewCard({ review, index }) {
  const [isHovered, setIsHovered] = useState(false);

  // Alternate gradient direction based on index
  const gradientDirection = index % 2 === 0 ? "to-tr" : "to-bl";

  return (
    <div
      className={`rounded-lg p-8 transition-all duration-500 overflow-hidden relative ${
        isHovered ? "transform scale-102" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: `linear-gradient(${
          index % 2 === 0 ? "135deg" : "225deg"
        }, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)`,
      }}
    >
      {/* Animated border gradient */}
      <div
        className={`absolute inset-0 border border-transparent ${
          isHovered ? "border-gradient" : ""
        }`}
      ></div>

      {/* Content container with offset to make room for border */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mr-3 border border-gray-800">
              <span className="font-bold text-white">{review.avatar}</span>
            </div>
            <div>
              <h4 className="font-bold">{review.name}</h4>
              <span className="text-xs text-gray-400 font-mono tracking-wider">
                {review.created_at || review.date
                  ? new Date(
                      review.created_at || review.date
                    ).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </span>
            </div>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`transition-all duration-300 ${
                  i < review.rating
                    ? `text-white ${isHovered ? "scale-110" : ""}`
                    : "text-gray-600"
                }`}
                fill={i < review.rating ? "white" : "none"}
              />
            ))}
          </div>
        </div>

        <p className="text-gray-300 mb-4 leading-relaxed">{review.comment}</p>

        <div className="flex justify-end mt-6">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500
                         ${
                           isHovered
                             ? "bg-white bg-opacity-10"
                             : "bg-transparent"
                         }`}
          >
            <ChevronRight
              size={18}
              className={`transition-all duration-500 ease-in-out 
                        ${
                          isHovered
                            ? "opacity-100 text-white"
                            : "opacity-0 text-gray-600"
                        }`}
            />
          </div>
        </div>
      </div>

      {/* Gradient glow effect on hover */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`absolute -inset-1 bg-gradient-to-r from-white via-gray-500 to-black opacity-10 blur-sm rounded-lg`}
        ></div>
      </div>

      <style jsx>{`
        .border-gradient {
          background-image: linear-gradient(
            ${gradientDirection},
            rgba(255, 255, 255, 0.3),
            transparent 60%
          );
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          mask-clip: padding-box, border-box;
          padding: 1px;
        }

        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}

// Review Form Component
function ReviewForm({
  name,
  setName,
  comment,
  setComment,
  rating,
  setRating,
  onClose,
  onSubmit,
}) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Add event listener to prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500); // Delay actual close to allow animation
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div
        className={`rounded-lg p-8 max-w-lg w-full transform transition-all duration-500 relative overflow-hidden
                    ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
        style={{
          background:
            "linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)",
        }}
      >
        {/* Border gradient */}
        <div className="absolute inset-0 border border-white border-opacity-10"></div>

        {/* Animated background elements */}
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-r from-white to-transparent opacity-5 blur-3xl rounded-full"></div>
        <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-gradient-to-l from-white to-transparent opacity-5 blur-3xl rounded-full"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold tracking-tight">
              Share Your Feedback
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-10"
            >
              <X size={20} />
            </button>
          </div>

          <div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2 text-sm">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black bg-opacity-50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-20 transition-all duration-300"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2 text-sm">Rating</label>
              <div className="flex space-x-3 p-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className={`cursor-pointer transition-all duration-200 ${
                      star <= (hoveredRating || rating)
                        ? "text-white fill-white scale-110"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-gray-300 mb-2 text-sm">
                Your Feedback
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full bg-black bg-opacity-50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-20 transition-all duration-300"
                placeholder="Share your thoughts on the article..."
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 border border-gray-800 rounded-full hover:bg-white hover:bg-opacity-5 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSubmit}
                disabled={!name || !comment || rating === 0}
                className="px-6 py-3 bg-gradient-to-r from-white to-gray-300 text-black rounded-full hover:opacity-90 transition-all duration-300 flex items-center group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Submit Review</span>
                <ChevronRight
                  size={16}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
