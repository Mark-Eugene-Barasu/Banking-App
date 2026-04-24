"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, TrendingUp, Globe, CreditCard, Smartphone, PiggyBank, BarChart3 } from "lucide-react";

const features = [
  { icon: Zap, title: "Instant Transfers", desc: "Send money to anyone, anywhere in seconds. No delays, no hidden fees.", color: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400", glow: "hover:shadow-yellow-500/20" },
  { icon: Shield, title: "Bank-Grade Security", desc: "256-bit encryption, biometric login, and real-time fraud detection.", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400", glow: "hover:shadow-blue-500/20" },
  { icon: TrendingUp, title: "Smart Investments", desc: "Grow your wealth with AI-powered investment accounts and competitive returns.", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400", glow: "hover:shadow-emerald-500/20" },
  { icon: Globe, title: "Global Payments", desc: "Pay and receive money in 50+ countries with real-time exchange rates.", color: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400", glow: "hover:shadow-violet-500/20" },
  { icon: CreditCard, title: "Virtual Cards", desc: "Create unlimited virtual cards for online shopping with one-click controls.", color: "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400", glow: "hover:shadow-pink-500/20" },
  { icon: Smartphone, title: "Mobile First", desc: "Full-featured mobile experience. Bank on the go from any device, anytime.", color: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400", glow: "hover:shadow-cyan-500/20" },
  { icon: PiggyBank, title: "High-Yield Savings", desc: "Earn up to 5.2% APY on your savings — 10x the national average.", color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400", glow: "hover:shadow-orange-500/20" },
  { icon: BarChart3, title: "Spending Analytics", desc: "Understand your spending with beautiful charts and AI-powered insights.", color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400", glow: "hover:shadow-indigo-500/20" },
];

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <motion.span className="inline-block px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-semibold rounded-full mb-4"
            whileHover={{ scale: 1.05 }}>
            Everything You Need
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Banking reimagined<br />
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">for the digital age</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage, grow, and protect your money — all in one powerful platform.
          </p>
        </motion.div>

        <motion.div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          initial="hidden" animate={inView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
          {features.map(({ icon: Icon, title, desc, color, glow }) => (
            <motion.div key={title}
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-xl ${glow} transition-shadow duration-300 cursor-default`}>
              <motion.div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${color}`}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}>
                <Icon className="w-6 h-6" />
              </motion.div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
