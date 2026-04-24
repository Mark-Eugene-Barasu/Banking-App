"use client";
import Link from "next/link";
import { ArrowRight, Coins } from "lucide-react";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 rounded-3xl p-10 sm:p-16 text-center overflow-hidden">
          {/* Animated blobs */}
          <motion.div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} />

          <div className="relative">
            <motion.div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl mb-6 shadow-xl shadow-emerald-500/30 mx-auto"
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <Coins className="w-8 h-8 text-white" />
            </motion.div>

            <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.2 }}>
              Ready to take control<br />of your finances?
            </motion.h2>

            <motion.p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.3 }}>
              Join 250,000+ people who trust CryptoBanking with their money. Open your free account today — no credit check, no minimum balance.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 shadow-xl shadow-emerald-500/30 text-base">
                  Open Free Account <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-200 text-base border border-white/20">
                  Sign In
                </Link>
              </motion.div>
            </motion.div>
            <p className="text-gray-500 text-sm mt-6">No credit card required · Free forever · Cancel anytime</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
