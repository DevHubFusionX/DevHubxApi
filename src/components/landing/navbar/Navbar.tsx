"use client";

import React, { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavbarLogo from "./NavbarLogo";
import ApisDropdown from "./ApisDropdown";
import DocsDropdown from "./DocsDropdown";
import NavbarActions from "./NavbarActions";

export default memo(function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"apis" | "docs" | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-18 flex items-center transition-all duration-200 ${activeMenu
          ? "bg-neutral-950 border-b border-white/10"
          : isScrolled
            ? "bg-neutral-950/75 backdrop-blur-md border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl w-full mx-auto px-6 flex items-center justify-between">

        {/* Logo Wordmark */}
        <NavbarLogo />

        {/* Center Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8 relative h-full"
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div
            className="py-6 cursor-pointer"
            onMouseEnter={() => setActiveMenu("apis")}
          >
            <button className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 cursor-pointer ${activeMenu === "apis" ? "text-white" : "text-neutral-400 hover:text-white"}`}>
              APIs
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "apis" ? "rotate-180 text-brand-green" : "text-neutral-500"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div
            className="py-6 cursor-pointer"
            onMouseEnter={() => setActiveMenu("docs")}
          >
            <button className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 cursor-pointer ${activeMenu === "docs" ? "text-white" : "text-neutral-400 hover:text-white"}`}>
              Docs
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "docs" ? "rotate-180 text-brand-green" : "text-neutral-500"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <a
            href="#pricing"
            onMouseEnter={() => setActiveMenu(null)}
            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 py-6"
          >
            Pricing
          </a>

          <a
            href="#blog"
            onMouseEnter={() => setActiveMenu(null)}
            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 py-6"
          >
            Blog
          </a>

          {/* Absolute Dropdowns */}
          <AnimatePresence>
            {activeMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 rounded-2xl border border-white/10 glass-dropdown backdrop-blur-2xl shadow-2xl p-6 ${activeMenu === "apis" ? "w-[850px]" : "w-[820px]"
                  }`}
              >
                {activeMenu === "apis" && <ApisDropdown />}
                {activeMenu === "docs" && <DocsDropdown />}
              </motion.div>
            )}
          </AnimatePresence>

        </nav>

        {/* Right CTA Actions */}
        <NavbarActions />

      </div>
    </header>
  );
});
