import Link from "next/link";
import { Coins } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Security", "Pricing", "Changelog"],
  Company: ["About", "Careers", "Press", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Compliance"],
  Support: ["Help Center", "Community", "Status", "API Docs"],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-black text-white">Crypto</span>
                <span className="text-lg font-black text-emerald-500">Banking</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              The future of banking. Secure, fast, and built for the digital generation.
            </p>
            <div className="flex gap-3">
              {["𝕏", "⌥", "in", "📷"].map((icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 bg-gray-800 hover:bg-emerald-600 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110">
                  <span className="text-gray-400 hover:text-white text-sm font-bold">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-emerald-400 transition-colors duration-200">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2025 CryptoBanking. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm text-emerald-400">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
