"use client";

import { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";

export default function ReviewsTab({ reviews = [] }) {
  const [allReviews, setAllReviews] = useState(reviews);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    comment: "",
    rating: 5,
  });

  // ⭐ Average rating
  const avgRating =
    allReviews.length > 0
      ? (
          allReviews.reduce((acc, r) => acc + r.rating, 0) /
          allReviews.length
        ).toFixed(1)
      : 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      id: Date.now(),
      name: form.name,
      comment: form.comment,
      rating: form.rating,
      date: new Date().toLocaleDateString(),
    };

    setAllReviews([newReview, ...allReviews]);

    setForm({
      name: "",
      comment: "",
      rating: 5,
    });

    setOpen(false);
  };

  return (
    <div className="space-y-10">

      {/* 🔥 HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            Customer Reviews
          </h3>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex text-yellow-400 text-sm">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <span className="text-sm text-gray-500">
              {avgRating} ({allReviews.length} reviews)
            </span>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="px-5 py-2.5 text-sm rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium hover:opacity-90 transition"
        >
          Write a Review
        </button>

      </div>

      {/* 🔥 REVIEWS LIST */}
      <div className="space-y-5">

        {allReviews.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >

            {/* TOP */}
            <div className="flex items-center justify-between mb-3">

              <div className="flex items-center gap-3">

                {/* AVATAR */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center text-sm font-medium">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.date}
                  </p>
                </div>

              </div>

              {/* STARS */}
              <div className="flex text-yellow-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < item.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

            </div>

            {/* COMMENT */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {item.comment}
            </p>

          </div>
        ))}

      </div>

      {/* 🔥 MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* MODAL */}
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl z-10 animate-fadeIn">

            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <FaTimes />
            </button>

            <h3 className="text-lg font-semibold text-gray-900 mb-5">
              Submit Your Review
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />

              <textarea
                placeholder="Write your review..."
                value={form.comment}
                onChange={(e) =>
                  setForm({ ...form, comment: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2 text-sm h-24 resize-none focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />

              {/* RATING */}
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() =>
                      setForm({ ...form, rating: num })
                    }
                  >
                    <FaStar
                      className={
                        num <= form.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition"
              >
                Submit Review
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}