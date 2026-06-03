"use client";

import React, { memo } from "react";
import { BlurFadeUp, FadeUp } from "@/lib/motion";
import { openAuthModal } from "@/lib/auth-trigger";
import DotWaveBackground from "@/components/landing/DotWaveBackground";

export default memo(function Cta() {
  return (
    <section className="py-24 sm:py-32 bg-black relative overflow-hidden border-t border-white/5 select-none">
      {/* Wave Dot Animation background */}
      <DotWaveBackground />

      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-brand-green/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        
        {/* Large non-generic typography */}
        <BlurFadeUp>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 max-w-5xl mx-auto">
            Build the next generation of fintech & telemetry.
          </h2>
        </BlurFadeUp>
        
        <FadeUp delay={0.2}>
          <p className="text-neutral-400 max-w-2xl mx-auto mb-10 text-base sm:text-lg lg:text-xl leading-relaxed">
            Stop writing custom payment loops and identity database integrations. Connect to regional APIs through a single, optimized edge gateway proxy.
          </p>
        </FadeUp>

        {/* Clean, premium CTAs */}
        <FadeUp delay={0.35} className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            onClick={() => openAuthModal("signup")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-neutral-950 bg-brand-green hover:bg-emerald-400 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            Get API key &rarr;
          </button>
          
          <button className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold text-neutral-300 hover:text-white border border-white/10 hover:border-white/20 bg-white/0 hover:bg-white/5 transition-all duration-200 cursor-pointer">
            Talk to integration engineering
          </button>
        </FadeUp>

        {/* Dynamic status pill */}
        <FadeUp delay={0.5} className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/10 bg-emerald-500/5 text-emerald-400 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            <span>All gateway nodes operational</span>
          </div>
        </FadeUp>

      </div>
    </section>
  );
});
