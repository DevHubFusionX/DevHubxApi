"use client";

import React, { memo } from "react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/lib/motion";

const testimonialsList = [
  {
    quote: "We dropped 11 separate identity vendor contracts after switching. NIN, BVN, and face match all normalize to the same response schema — our review cycles dropped by 40%.",
    initials: "AO",
    name: "Adebayo Onajobi",
    role: "Lead Platform Engineer",
    company: "Vanguard Tech",
    gradient: "from-brand-green to-emerald-400",
  },
  {
    quote: "KYC used to be our biggest integration bottleneck in Lagos. DevhubxAPI's unified endpoint went live in a day. We didn't touch the integration for 3 months after that.",
    initials: "FM",
    name: "Florence Mwangi",
    role: "CTO",
    company: "PesaFlow",
    gradient: "from-brand-purple to-pink-500",
  },
];

export default memo(function Testimonials() {
  return (
    <section className="bg-neutral-950 py-24 sm:py-32 select-none border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <FadeUp className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
            Social Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3 mb-6">
            Loved by developers building regional platforms
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            See how engineering teams use our unified gateway to streamline checkout flows and verification pipelines.
          </p>
        </FadeUp>

        {/* Testimonials 2-Card Grid */}
        <StaggerContainer 
          stagger={0.15}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-4"
        >
          {testimonialsList.map((item, index) => (
            <StaggerItem
              key={index}
              className="p-8 rounded-xl border border-white/5 bg-neutral-900/40 backdrop-blur-sm flex flex-col justify-between items-start text-left transition-all duration-300 hover:border-white/10 hover:bg-neutral-900/60 cursor-default"
            >
              {/* Quote Text */}
              <p className="text-neutral-300 text-sm sm:text-base italic leading-relaxed mb-8">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Developer Metadata */}
              <div className="flex items-center gap-3.5 mt-auto">
                {/* Initials Badge */}
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-brand-green to-emerald-400 flex items-center justify-center text-xs font-black text-neutral-950 shrink-0">
                  {item.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {item.name}
                  </h4>
                  <div className="text-xs text-neutral-500 font-medium mt-0.5">
                    {item.role} &bull; <span className="font-semibold text-brand-green">{item.company}</span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
});
