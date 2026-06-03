
"use client";

import React, { memo } from "react";
import { FadeUp, FadeIn, motion } from "@/lib/motion";

export default memo(function Footer() {
  return (
    <footer className="border-t border-white/5 bg-neutral-950 py-20 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Footer Links */}
        <FadeUp className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          
          {/* Logo Brand Info Column */}
          <div className="col-span-2 text-left">
            <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-white mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="text-white">Devhub</span>
              <span className="text-brand-green">x</span>
              <span className="text-neutral-400 font-normal">api</span>
            </div>
            <p className="text-sm text-neutral-500 max-w-xs leading-relaxed mb-6">
              Unified telemetry proxy and regional API routing gateway running on multi-cloud edge nodes.
            </p>
          </div>

          {/* Links Column 1: APIs */}
          <div className="text-left">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">APIs</h5>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">NIN Verification</a></li>
              <li><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Mobile Money</a></li>
              <li><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Bank Resolve</a></li>
              <li><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Address Geocoder</a></li>
            </ul>
          </div>

          {/* Links Column 2: Developers */}
          <div className="text-left">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Developers</h5>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Documentation</a></li>
              <li><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">API Status</a></li>
              <li><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Changelog</a></li>
              <li><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">SDK Libraries</a></li>
            </ul>
          </div>

          {/* Links Column 3: Scaling */}
          <div className="text-left">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Scaling</h5>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Free Sandbox</a></li>
              <li><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Pro Plan</a></li>
              <li><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Enterprise SLA</a></li>
              <li><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Volume Pricing</a></li>
            </ul>
          </div>

          {/* Links Column 4: Trust */}
          <div className="text-left">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Trust</h5>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Security Core</a></li>
              <li><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Privacy Shield</a></li>
              <li><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Uptime SLA</a></li>
              <li><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Contact Desk</a></li>
            </ul>
          </div>

        </FadeUp>

        {/* Bottom copyright details */}
        <FadeIn delay={0.2} className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
          <span>
            &copy; {new Date().getFullYear()} Devhubxapi Inc. All rights reserved.
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-400 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-400 transition-colors duration-200">Terms of Service</a>
          </div>
        </FadeIn>

        {/* Huge aesthetic desaturated footer signature wordmark */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
              }
            }
          }}
          className="mt-16 text-center select-none overflow-hidden flex justify-center items-center"
        >
          {"Devhubxapi".split("").map((char, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, y: 100 },
                visible: {
                  opacity: 1,
                  y: 24,
                  transition: {
                    type: "spring",
                    damping: 15,
                    stiffness: 120,
                  }
                }
              }}
              className="text-[12vw] font-black text-neutral-900 leading-none tracking-tighter inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

      </div>
    </footer>
  );
});
