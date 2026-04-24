"use client";
import { ShieldCheck, Lock, Eye, Bell, RefreshCw, Award } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: ShieldCheck, title: "256-bit SSL Encryption", desc: "Every transaction and piece of data is encrypted with military-grade security." },
  { icon: Lock, title: "Two-Factor Authentication", desc: "Add an extra layer of protection with biometric or SMS verification." },
  { icon: Eye, title: "Real-Time Fraud Detection", desc: "AI monitors every transaction 24/7 and flags suspicious activity instantly." },
  { icon: Bell, title: "Instant Alerts", desc: "Get notified immediately for every transaction, login, and account change." },
  { icon: RefreshCw, title: "Automatic Backups", desc: "Your data is backed up across multiple secure data centers globally." },
  { icon: Award, title: "Fully Regulated", desc: "CryptoBanking is fully licensed and compliant with international banking regulations." },
];

export default function Security() {
  return (
    <section id="security" className="py-20 lg:py-32 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <motion.span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold rounded-full mb-6"
              whileHover={{ scale: 1.05 }}>
              Security First
            </motion.span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              Your money is<br />
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">always protected</span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              We take security seriously. CryptoBanking uses the same level of protection as the world&apos;s largest financial institutions.
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Security Score</span>
                <motion.span className="text-2xl font-black text-blue-600 dark:text-blue-400"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.5 }}>
                  98/100
                </motion.span>
              </div>
              <div className="w-full bg-blue-100 dark:bg-blue-900/40 rounded-full h-3 overflow-hidden">
                <motion.div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full"
                  initial={{ width: 0 }} whileInView={{ width: "98%" }}
                  viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }} />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Rated by independent security auditors</p>
            </div>
          </motion.div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all duration-200">
                <motion.div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-3"
                  whileHover={{ rotate: 15, scale: 1.1 }}>
                  <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
