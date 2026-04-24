"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Sarah M.", role: "Freelance Designer", text: "CryptoBanking changed how I manage my finances. The instant transfers and high-yield savings are incredible. I've already earned more in 3 months than I did all year with my old bank.", avatar: "SM", color: "from-pink-500 to-rose-500" },
  { name: "James K.", role: "Software Engineer", text: "The investment account is a game changer. Clean UI, zero fees, and the analytics dashboard helps me understand exactly where my money goes. Best banking app I've ever used.", avatar: "JK", color: "from-blue-500 to-indigo-500" },
  { name: "Amara N.", role: "Small Business Owner", text: "I run a business across 3 countries. CryptoBanking's global payments feature saves me hundreds in fees every month. Setup took 5 minutes. Absolutely love it.", avatar: "AN", color: "from-emerald-500 to-teal-500" },
  { name: "David L.", role: "Medical Doctor", text: "Security was my biggest concern. CryptoBanking's 256-bit encryption and instant fraud alerts give me complete peace of mind. My money has never felt safer.", avatar: "DL", color: "from-violet-500 to-purple-500" },
  { name: "Priya S.", role: "Marketing Manager", text: "Opened my account in 2 minutes flat. The spending analytics showed me I was wasting $400/month on subscriptions I forgot about. Already saved more than I expected!", avatar: "PS", color: "from-orange-500 to-amber-500" },
  { name: "Tom W.", role: "Entrepreneur", text: "Switched from a traditional bank and never looked back. The virtual cards feature alone is worth it — I create a new one for every online purchase. Total control.", avatar: "TW", color: "from-cyan-500 to-sky-500" },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <motion.span className="inline-block px-4 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm font-semibold rounded-full mb-4"
            whileHover={{ scale: 1.05 }}>
            Customer Stories
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Loved by <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">250,000+</span> customers
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">Real people. Real results. Real money saved.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, text, avatar, color }, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300 cursor-default">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <motion.div key={j} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 + j * 0.05, type: "spring" }}>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">&ldquo;{text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <motion.div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                  whileHover={{ scale: 1.2, rotate: 10 }}>
                  {avatar}
                </motion.div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{name}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
