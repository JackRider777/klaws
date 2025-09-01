import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Instagram } from "lucide-react";

/*
  FINAL PROFESSIONAL DESIGN:
  - This version uses the specified brand color palette for a custom, high-end feel.
  - Colors used:
    - Background: bg-pink-50 (#FEF9FA)
    - Headline: brand-dark-maroon (#7F002E)
    - Primary Accent: brand-pink (#D97E8A)
    - Body Text: brand-maroon (#76253B)
    - Focus: brand-light-pink (#EC9FAB)
    - Footer Text: brand-footer (#370808)
*/

// A subtle background pattern component to add texture to the card.
const SubtlePattern = () => (
  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="pattern-circles"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle
            id="pattern-circle"
            cx="20"
            cy="20"
            r="1"
            fill="rgba(217, 126, 138, 0.1)"
          ></circle>
        </pattern>
      </defs>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#pattern-circles)"
      ></rect>
    </svg>
  </div>
);

// Main App Component
export default function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const contentAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay },
    }),
  };

  return (
    <div className="bg-pink-50 min-h-screen w-full flex items-center justify-center p-4 font-grotesk">
      <motion.div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white p-8 text-center shadow-2xl shadow-pink-200/50 sm:p-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      >
        <SubtlePattern />

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={contentAnimation}
            className="mb-2 text-xl font-thin tracking-[0.3em] text-[#D97E8A] font-josefin"
          >
            K L A W S
          </motion.div>

          <motion.h1
            custom={0.3}
            initial="hidden"
            animate="visible"
            variants={contentAnimation}
            className="text-4xl font-light tracking-tight text-[#7F002E] font-josefin sm:text-5xl"
          >
            Your Ultimate Style Statement.
          </motion.h1>

          <motion.p
            custom={0.4}
            initial="hidden"
            animate="visible"
            variants={contentAnimation}
            className="mt-4 max-w-sm text-base text-[#76253B]"
          >
            Discover bespoke, reusable press-on nails crafted to empower your
            self-expression. The revolution in nail artistry is coming.
          </motion.p>

          <motion.div
            custom={0.5}
            initial="hidden"
            animate="visible"
            variants={contentAnimation}
            className="mt-2 mb-6 font-josefin text-md text-[#76253B]"
          >
            Launching Fall 2025
          </motion.div>

          <motion.div
            custom={0.6}
            initial="hidden"
            animate="visible"
            variants={contentAnimation}
            className="w-full max-w-sm"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thank-you"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <h3 className="text-lg font-semibold text-[#D97E8A] font-josefin">
                    Welcome to the inner circle.
                  </h3>
                  <p className="text-[#76253B]">
                    Thank you! Keep an eye on your inbox for launch news and
                    exclusives.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex w-full flex-col items-center gap-2 sm:flex-row"
                >
                  <div className="relative w-full">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 w-full rounded-md border border-gray-200 bg-gray-50 pl-10 pr-4 transition-colors focus:border-[#EC9FAB] focus:outline-none focus:ring-1 focus:ring-[#EC9FAB]"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center whitespace-nowrap rounded-md bg-[#D97E8A] px-6 font-semibold text-white shadow-lg shadow-[#D97E8A]/40 sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Notify Me
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
            {error && (
              <p className="mt-2 w-full text-center text-sm text-red-500">
                {error}
              </p>
            )}
          </motion.div>

          <motion.div
            custom={0.7}
            initial="hidden"
            animate="visible"
            variants={contentAnimation}
            className="mt-8 w-full border-t border-gray-200 pt-6"
          >
            <a
              href="#"
              className="flex items-center justify-center text-[#370808] transition-colors hover:text-[#D97E8A]"
            >
              <Instagram size={18} />
              <span className="ml-2 text-sm">Follow us on Instagram</span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
