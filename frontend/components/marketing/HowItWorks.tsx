"use client";
import Link from "next/link";
import { UserPlus, CreditCard, Zap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: UserPlus, title: "Create Your Account", desc: "Sign up in under 2 minutes. No paperwork, no branch visits.", color: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/30" },
  { icon: CreditCard, title: "Choose Your Accounts", desc: "Open Checking, Savings, or Investment accounts — completely free.", color: "from-cyan-500 to-blue-500", shadow: "shadow-cyan-500/30" },
  { icon: Zap, title: "Fund Your Account", desc: "Deposit instantly via bank transfer, card, or crypto.", color: "from-violet-500 to-purple-500", shadow: "shadow-violet-500/30" },
  { icon: TrendingUp, title: "Start Growing", desc: "Send, receive, invest, and track your money with powerful tools.", color: "from-orange-500 to-pink-500", shadow: "shadow-orange-500/30" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <motion.span className="inline-block px-4 py-1.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 text-sm font-semibold rounded-full mb-4"
            whileHover={{ scale: 1.05 }}>
            Simple Process
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Up and running<br />
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">in 4 easy steps</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Getting started with CryptoBanking is the easiest thing you&apos;ll do today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Animated connector line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 via-violet-500 to-orange-500"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }} />
          </div>

          {steps.map(({ icon: Icon, title, desc, color, shadow }, i) => (
            <motion.div key={title} className="relative text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}>
              <div className="relative inline-flex mb-6">
                <motion.div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${color} flex items-center justify-center shadow-xl ${shadow} mx-auto`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ y: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }, scale: { duration: 0.2 } }}>
                  <Icon className="w-9 h-9 text-white" />
                </motion.div>
                <motion.span className="absolute -top-2 -right-2 w-7 h-7 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-full text-xs font-black text-gray-700 dark:text-gray-300 flex items-center justify-center shadow-sm"
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 300 }}>
                  {i + 1}
                </motion.span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-14"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 shadow-xl shadow-emerald-500/30 text-base">
              Start Your Journey Today →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
