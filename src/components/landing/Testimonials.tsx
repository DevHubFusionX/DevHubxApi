"use client";

import React, { memo } from "react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/lib/motion";

const testimonialsList = [
  {
    quote: "Integrating regional mobile money networks went from a month-long research task to a 20-minute sandbox run. The latency SLAs are incredibly solid.",
    name: "Adebayo Onajobi",
    role: "Lead Platform Engineer",
    company: "Vanguard Tech",
  },
  {
    quote: "Devhubxapi's identity database queries solved our KYC verification pipeline bottleneck in Lagos. We reduced checkout drops by 40%.",
    name: "Florence Mwangi",
    role: "CTO",
    company: "PesaFlow",
  },
  {
    quote: "The OpenAPI docs are interactive and clean. We dropped their Node SDK into our backend cluster and had NIN queries running instantly.",
    name: "Chinedu Okafor",
    role: "Senior Backend Developer",
    company: "Shuttlers",
  },
];

export default memo(function Testimonials() {
  return (
    <section className="bg-white py-24 sm:py-32 select-none border-b border-neutral-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <FadeUp className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
            Social Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-3 mb-6">
            Loved by developers building regional platforms
          </h2>
          <p className="text-base sm:text-lg text-neutral-500 leading-relaxed">
            See how engineering teams use our telemetry and regional endpoints to launch payment gateways and verification systems.
          </p>
        </FadeUp>

        {/* Testimonials 3-Card Grid */}
        <StaggerContainer 
          stagger={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-4"
        >
          {testimonialsList.map((item, index) => (
            <StaggerItem
              key={index}
              className="p-8 rounded-xl border border-neutral-200 border-l-4 border-l-brand-green bg-white shadow-sm flex flex-col justify-between items-start text-left transition-all duration-300 hover:shadow-md cursor-default"
            >
              {/* Quote Text */}
              <p className="text-neutral-700 text-sm sm:text-base italic leading-relaxed mb-8">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Developer Metadata */}
              <div className="mt-auto">
                <h4 className="text-sm font-bold text-neutral-950">
                  {item.name}
                </h4>
                <div className="text-xs text-neutral-500 font-medium mt-0.5">
                  {item.role} &bull; <span className="font-semibold text-neutral-600">{item.company}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
});
