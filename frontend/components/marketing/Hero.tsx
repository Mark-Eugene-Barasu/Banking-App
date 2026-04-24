"use client";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / 80;
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const floatingCards = [
  { label: "Monthly Growth", value: "+12.4%", color: "text-emerald-500", delay: 0 },
  { label: "Active Users", value: "250K+", color: "text-indigo-500", delay: 0.3 },
  { label: "Transactions", value: "2M+/day", color: "text-cyan-500", delay: 0.6 },
];

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-gray-950 pt-20">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute top-1/2 -left-40 w-80 h-80 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        <motion.div className="absolute bottom-0 right-1/3 w-64 h-64 bg-violet-400/10 dark:bg-violet-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <motion.div style={{ y, opacity }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-full">
              <motion.span className="w-2 h-2 bg-emerald-500 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">The Future of Banking is Here</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight">
              Bank Smarter.<br />
              <motion.span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent inline-block"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}>
                Grow Faster.
              </motion.span><br />
              Live Better.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
              CryptoBanking combines the power of modern finance with cutting-edge security. Open an account in minutes, earn more on savings, and transfer money instantly.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 shadow-xl shadow-emerald-500/30 text-base w-full sm:w-auto">
                  Open Free Account <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 text-base w-full sm:w-auto">
                  See How It Works
                </a>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 pt-2">
              {[{ icon: ShieldCheck, text: "Bank-grade Security" }, { icon: Zap, text: "Instant Transfers" }, { icon: Globe, text: "Available Worldwide" }]
                .map(({ icon: Icon, text }, i) => (
                  <motion.div key={text} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}>
                    <Icon className="w-4 h-4 text-emerald-500" />{text}
                  </motion.div>
                ))}
            </motion.div>
          </div>

          {/* Right — Dashboard Preview */}
          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative">
            <motion.div className="relative bg-gradient-to-br from-gray-900 to-indigo-950 rounded-3xl p-6 shadow-2xl shadow-gray-900/40"
              whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-3xl" />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs">Total Balance</p>
                    <motion.p className="text-white text-3xl font-black mt-0.5"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                      $48,250.00
                    </motion.p>
                  </div>
                  <motion.div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center"
                    animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                    <span className="text-emerald-400 text-lg">₿</span>
                  </motion.div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {[
                    { label: "Checking", amount: "$12,400", color: "from-blue-500 to-indigo-600" },
                    { label: "Savings", amount: "$28,850", color: "from-emerald-500 to-teal-600" },
                    { label: "Invest", amount: "$7,000", color: "from-violet-500 to-purple-600" },
                  ].map(({ label, amount, color }, i) => (
                    <motion.div key={label} className={`bg-gradient-to-br ${color} rounded-2xl p-3`}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      whileHover={{ scale: 1.05 }}>
                      <p className="text-white/70 text-xs">{label}</p>
                      <p className="text-white font-bold text-sm mt-1">{amount}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-white/5 rounded-2xl p-4 space-y-3">
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Recent</p>
                  {[
                    { name: "Netflix", amount: "-$15.99", color: "text-red-400" },
                    { name: "Salary", amount: "+$5,200", color: "text-emerald-400" },
                    { name: "Transfer", amount: "-$500", color: "text-red-400" },
                  ].map(({ name, amount, color }, i) => (
                    <motion.div key={name} className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + i * 0.1 }}>
                      <div className="flex items-center gap-2">
                        <motion.div className="w-7 h-7 bg-white/10 rounded-lg"
                          whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.2)" }} />
                        <span className="text-white text-sm">{name}</span>
                      </div>
                      <span className={`text-sm font-semibold ${color}`}>{amount}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating badges */}
            {floatingCards.map(({ label, value, color, delay }) => (
              <motion.div key={label}
                className={`absolute bg-white dark:bg-gray-800 rounded-2xl px-4 py-2 shadow-xl border border-gray-100 dark:border-gray-700 ${label === "Monthly Growth" ? "-top-4 -right-4" : label === "Active Users" ? "-bottom-4 -left-4" : "top-1/2 -right-8"}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                transition={{ opacity: { delay: 1.2 + delay, duration: 0.4 }, scale: { delay: 1.2 + delay, duration: 0.4 }, y: { duration: 3 + delay, repeat: Infinity, ease: "easeInOut", delay: delay } }}>
                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                <p className={`text-lg font-black ${color}`}>{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
          {[
            { value: 250000, suffix: "+", label: "Active Customers" },
            { value: 99, suffix: ".9%", label: "Uptime Guarantee" },
            { value: 2, suffix: "M+", label: "Transactions Daily" },
            { value: 50, suffix: "+", label: "Countries Supported" },
          ].map(({ value, suffix, label }, i) => (
            <motion.div key={label}
              className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors duration-200"
              whileHover={{ scale: 1.05, y: -4 }} transition={{ duration: 0.2 }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              style={{ transitionDelay: `${0.6 + i * 0.1}s` }}>
              <p className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
                <CountUp end={value} suffix={suffix} />
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
