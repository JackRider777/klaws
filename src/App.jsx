import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ChevronRight } from "lucide-react";

// Analysis of https://klaws-co.netlify.app/
// ===========================================
// Vibe: The site has a very modern, edgy, and minimalist aesthetic. It feels luxurious and exclusive.
// Color Palette:
//   - Background: A deep, dark charcoal/almost black (#121212 or similar).
//   - Primary/Accent: A vibrant, hot pink/magenta used for key elements and hover effects.
//   - Text: Clean white.
// Typography: A clean, geometric sans-serif font. It's bold and confident.
// Imagery: High-quality, professional product shots of nails, often with a creative or artistic flair.
// UI/UX: Minimalist layout, focus on visuals, smooth transitions, and clear calls to action.

// Icon for social media links
const SocialIcon = ({ children, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition-colors duration-300"
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    {children}
  </motion.a>
);

// NEW: Animated Gradient Background Component
const AnimatedGradientBackground = () => {
  // Configuration for each moving blob
  const blobs = [
    {
      id: 1,
      initial: { x: "0%", y: "0%" },
      animate: { x: "80vw", y: "60vh" },
      transition: {
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
      style: {
        top: "10vh",
        left: "10vw",
        width: "300px",
        height: "300px",
        background: "rgba(236, 72, 153, 0.4)",
      }, // Pink
    },
    {
      id: 2,
      initial: { x: "0%", y: "0%" },
      animate: { x: "-50vw", y: "-40vh" },
      transition: {
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: 3,
      },
      style: {
        top: "70vh",
        left: "80vw",
        width: "400px",
        height: "400px",
        background: "rgba(139, 92, 246, 0.3)",
      }, // Purple
    },
    {
      id: 3,
      initial: { x: "0%", y: "0%" },
      animate: { x: "40vw", y: "-70vh" },
      transition: {
        duration: 25,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: 1,
      },
      style: {
        top: "50vh",
        left: "5vw",
        width: "250px",
        height: "250px",
        background: "rgba(96, 165, 250, 0.25)",
      }, // Blue
    },
    {
      id: 4,
      initial: { x: "0%", y: "0%" },
      animate: { x: "-30vw", y: "50vh" },
      transition: {
        duration: 18,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: 5,
      },
      style: {
        top: "5vh",
        left: "70vw",
        width: "200px",
        height: "200px",
        background: "rgba(236, 72, 153, 0.3)",
      }, // Pink
    },
  ];

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          initial={blob.initial}
          animate={blob.animate}
          transition={blob.transition}
          className="absolute rounded-full filter blur-3xl"
          style={blob.style}
        />
      ))}
    </div>
  );
};

// Main App Component
export default function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    // Here you would typically send the email to your backend service
    console.log("Email submitted:", email);
  };

  return (
    <div className="bg-[#101010] min-h-screen w-full flex flex-col items-center justify-center p-4 font-sans text-white overflow-hidden relative">
      {/* NEW: Replaced the old background with the new animated component */}
      <AnimatedGradientBackground />

      <main className="z-10 flex flex-col items-center text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mb-4 text-2xl md:text-3xl font-light tracking-widest text-pink-400"
        >
          K L A W S
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
        >
          Nails That Make a Statement.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="text-lg md:text-xl text-gray-300 max-w-lg mb-8"
        >
          Get ready to elevate your look. We're crafting bespoke, reusable
          press-on nails for every mood and moment. Launching soon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.8 }}
          className="w-full max-w-md"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thank-you"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-center bg-white/10 p-4 rounded-lg backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold text-pink-400">
                  You're on the list!
                </h3>
                <p className="text-gray-200">
                  Thanks for joining. We'll be in your inbox soon.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col sm:flex-row items-center gap-2 w-full"
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
                    className="w-full h-12 pl-10 pr-4 bg-gray-800/50 border border-gray-700 rounded-md focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all duration-300 placeholder-gray-500 backdrop-blur-sm"
                    aria-label="Email Address"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="flex items-center justify-center w-full sm:w-auto h-12 px-6 bg-pink-500 text-white font-semibold rounded-md shadow-lg shadow-pink-500/20 whitespace-nowrap"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 5px 20px rgba(236, 72, 153, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span>Notify Me</span>
                  <ChevronRight className="ml-1" size={20} />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-2 text-left sm:text-center w-full"
            >
              {error}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
          className="flex items-center space-x-6 mt-12"
        >
          <SocialIcon href="#">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-1.625C8.724.538 8.333.525 7.053.472 3.498.322.926 2.922.781 6.521.729 7.802.717 8.192.717 12s.012 4.198.064 5.479c.145 3.599 2.717 6.194 6.272 6.338 1.279.053 1.67.065 4.947.065s3.668-.012 4.947-.065c3.555-.144 6.127-2.739 6.272-6.338.052-1.281.064-1.671.064-5.479s-.012-4.198-.064-5.479C23.078 2.922 20.506.322 16.951.472c-1.279-.053-1.67-.065-4.947-.065H12z M12 6.837a5.163 5.163 0 100 10.326 5.163 5.163 0 000-10.326zm0 8.704a3.541 3.541 0 110-7.082 3.541 3.541 0 010 7.082zM17.636 5.418a1.227 1.227 0 100 2.454 1.227 1.227 0 000-2.454z" />
            </svg>
          </SocialIcon>
          <SocialIcon href="#">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
          </SocialIcon>
          <SocialIcon href="#">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </SocialIcon>
        </motion.div>
      </main>

      <footer className="absolute bottom-4 text-center text-gray-500 text-sm z-10">
        &copy; {new Date().getFullYear()} Klaws Co. All Rights Reserved.
      </footer>
    </div>
  );
}
