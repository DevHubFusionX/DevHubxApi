"use client";

import React, { memo, useState } from "react";
import { FadeIn } from "@/lib/motion";

export default memo(function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="border-t border-white/5 bg-neutral-950 py-20 relative overflow-hidden select-none">
      {/* Glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-green/2 rounded-full blur-[120px] pointer-events-none" />

      {/* Background large watermark text */}
      <div className="absolute right-6 bottom-4 pointer-events-none select-none z-0 overflow-hidden w-full text-right">
        <span 
          className="text-[8vw] font-black text-transparent tracking-tighter uppercase select-none leading-none"
          style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.08)" }}
        >
          DEVHUBXAPI
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          
          {/* Brand Info & Newsletter (Left side - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-white mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="text-white">Devhub</span>
              <span className="text-brand-green">x</span>
              <span className="text-neutral-400 font-normal">api</span>
            </div>
            
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed mb-8">
              Unified telemetry proxy and regional API routing gateway running on multi-cloud edge nodes across Africa.
            </p>

            {/* Newsletter form */}
            <div className="w-full max-w-sm">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Subscribe to API updates
              </h4>
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/2 border border-white/5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-green/40 focus:ring-1 focus:ring-brand-green/20 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-400 text-neutral-950 text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer shadow-md shadow-emerald-500/10"
                >
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </button>
              </form>
            </div>
          </div>

          {/* Nav Links Column Group (Right side - 7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 w-full">
            
            {/* APIs */}
            <div className="text-left">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">APIs</h5>
              <ul className="flex flex-col gap-3">
                <li><a href="#features" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">NIN Verification</a></li>
                <li><a href="#features" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Mobile Money</a></li>
                <li><a href="#features" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Bank Resolve</a></li>
                <li><a href="#features" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Address Geocoder</a></li>
              </ul>
            </div>

            {/* Developers */}
            <div className="text-left">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Developers</h5>
              <ul className="flex flex-col gap-3">
                <li><a href="#docs" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Documentation</a></li>
                <li><a href="#changelog" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Changelog</a></li>
                <li><a href="#docs" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">SDK Libraries</a></li>
                <li><a href="#docs" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">System Status</a></li>
              </ul>
            </div>

            {/* Company / Legal */}
            <div className="text-left col-span-2 sm:col-span-1">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company</h5>
              <ul className="flex flex-col gap-3">
                <li><a href="#pricing" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Pricing Plans</a></li>
                <li><a href="#faq" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Security Core</a></li>
                <li><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Privacy Shield</a></li>
                <li><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Contact Desk</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom copyright details */}
        <FadeIn delay={0.2} className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600 text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <span>&copy; {new Date().getFullYear()} Devhubxapi Inc. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-neutral-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-neutral-400 transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </FadeIn>



      </div>
    </footer>
  );
});
