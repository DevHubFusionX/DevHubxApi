"use client";

import React, { memo } from "react";

const companies = [
  { name: "Brass", isSpecial: false },
  { name: "PesaFlow", isSpecial: false },
  { name: "Shuttlers", isSpecial: false },
  { name: "Kippa", isSpecial: false },
  { name: "Vanguard Tech", isSpecial: false },
  { name: "+ your company", isSpecial: true },
];

export default memo(function TrustStrip() {
  return (
    <section className="bg-black py-12 border-y border-white/5 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-8">
        
        {/* Label */}
        <div className="shrink-0 flex flex-col gap-1 text-left md:max-w-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-green">
            Trusted by developers at
          </div>
          <div className="text-sm font-semibold text-neutral-400">
            Companies currently using DevhubxAPI in production
          </div>
        </div>

        {/* Flex Wrap List of Companies */}
        <div className="flex flex-wrap items-center gap-3">
          {companies.map((company) => (
            <div
              key={company.name}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 ${
                company.isSpecial
                  ? "border border-dashed border-white/10 text-neutral-500 hover:border-brand-green/30 hover:text-brand-green cursor-pointer"
                  : "bg-white/2 border border-white/5 text-neutral-300 hover:border-white/15 hover:text-white"
              }`}
            >
              {company.name}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});
