import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
} from "framer-motion";
import { Mail, ChevronRight } from "lucide-react";

/*
  FINAL VERSION NOTES:
  - Added a "Launching Soon" message.
  - Adjusted headline size and spacing for a balanced layout.
*/

// LAYER 1: Fluid Blob Background
const FluidBlobBackground = () => {
  const blobs = [
    {
      id: 1,
      initial: { x: "10vw", y: "15vh", scale: 1.2, rotate: 0 },
      animate: {
        x: "80vw",
        y: "70vh",
        scale: [1.2, 1.4, 1.1],
        rotate: [0, 80, 160],
      },
      transition: {
        duration: 22,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
      style: {
        background: "rgba(217, 126, 138, 0.2)",
        width: "35vw",
        height: "35vw",
      },
    },
    {
      id: 2,
      initial: { x: "70vw", y: "60vh", scale: 1, rotate: 0 },
      animate: {
        x: "20vw",
        y: "20vh",
        scale: [1, 1.3, 0.9],
        rotate: [0, -70, -140],
      },
      transition: {
        duration: 28,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: 2,
      },
      style: {
        background: "rgba(236, 159, 171, 0.22)",
        width: "40vw",
        height: "40vw",
      },
    },
    {
      id: 3,
      initial: { x: "50vw", y: "90vh", scale: 0.9, rotate: 30 },
      animate: {
        x: "30vw",
        y: "10vh",
        scale: [0.9, 1.1, 0.8],
        rotate: [30, 10, -50],
      },
      transition: {
        duration: 25,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: 1,
      },
      style: {
        background: "rgba(217, 126, 138, 0.18)",
        width: "30vw",
        height: "30vw",
      },
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
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

// LAYER 2: Interactive Shimmer Grid
const ShimmeringGridBackground = ({ mouseX, mouseY }) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] grid h-full w-full grid-cols-[repeat(25,1fr)] grid-rows-[repeat(20,1fr)]">
      {Array.from(Array(25 * 20)).map((_, i) => (
        <Square key={i} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
};

const Square = ({ mouseX, mouseY }) => {
  const ref = useRef(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCenter({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  }, []);

  const distance = useTransform([mouseX, mouseY], ([newX, newY]) => {
    if (center.x === 0) return 1000;
    return Math.sqrt(
      Math.pow(newX - center.x, 2) + Math.pow(newY - center.y, 2)
    );
  });

  const opacity = useTransform(distance, [0, 100, 200], [1, 0.5, 0]);
  const scale = useTransform(distance, [0, 80], [1.2, 0.7]);
  const backgroundColor = useTransform(
    distance,
    [0, 100],
    ["#D97E8A", "#EC9FAB"]
  );

  return (
    <motion.div
      ref={ref}
      className="h-full w-full"
      style={{ backgroundColor, opacity, scale }}
    />
  );
};

// Main App Component
export default function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const mouseX = useSpring(0, { stiffness: 200, damping: 40 });
  const mouseY = useSpring(0, { stiffness: 200, damping: 40 });

  const handleMouseMove = ({ clientX, clientY }) => {
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  const handleMouseLeave = () => {
    mouseX.set(window.innerWidth * -1);
    mouseY.set(window.innerHeight * -1);
  };

  useEffect(() => {
    handleMouseLeave();
  }, []);

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

  return (
    <div
      className="bg-[#FEF9FA] min-h-screen w-full flex flex-col items-center justify-center p-4 text-gray-800 overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <FluidBlobBackground />
      <ShimmeringGridBackground mouseX={mouseX} mouseY={mouseY} />

      <main className="z-10 flex flex-col items-center justify-center text-center max-w-2xl font-grotesk">
        <div className="bg-[#fef9fa99] backdrop-blur-sm p-6 sm:p-8 rounded-2xl flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mb-4 text-2xl md:text-3xl font-thin tracking-[0.3em] text-[#D97E8A] font-josefin"
          >
            K L A W S
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 tracking-tight text-[#3d3d3d] font-josefin"
          >
            Your Ultimate Style Statement.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="text-lg md:text-xl text-gray-500 max-w-lg mb-4"
          >
            Discover bespoke, reusable press-on nails crafted to empower your
            self-expression. The revolution in nail artistry is coming.
          </motion.p>

          {/* NEW "LAUNCHING SOON" MESSAGE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
            className="font-josefin text-lg text-[#D97E8A] tracking-wider mb-8 font-light"
          >
            Launching Fall 2025
          </motion.div>

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
                >
                  <h3 className="text-xl font-semibold text-[#D97E8A] font-josefin">
                    Welcome to the inner circle.
                  </h3>
                  <p className="text-gray-600">
                    Thank you! Keep an eye on your inbox for launch news and
                    exclusives.
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
                      className="w-full h-12 pl-10 pr-4 bg-white/80 border border-gray-200/80 rounded-md focus:ring-2 focus:ring-[#EC9FAB] focus:outline-none transition-all duration-300 placeholder-gray-400"
                      aria-label="Email Address"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="flex items-center justify-center w-full sm:w-auto h-12 px-6 bg-[#D97E8A] text-white font-semibold rounded-md shadow-lg shadow-[#D97E8A]/40 whitespace-nowrap"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0px 5px 20px rgba(217, 126, 138, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
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
                className="text-red-500 text-sm mt-2 w-full text-center"
              >
                {error}
              </motion.p>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
