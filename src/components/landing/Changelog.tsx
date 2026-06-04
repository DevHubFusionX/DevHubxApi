"use client";

import React, { memo } from "react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/lib/motion";

const changelogEvents = [
  {
    date: "Jun 2, 2026",
    title: "NIN verification now resolves in <3ms from Lagos edge node",
    description: "Re-routed Lagos traffic through a co-located node 12km from NIMC's data centre. Previously averaging 6.8ms; now consistently sub-3ms for Lagos-origin requests.",
    tags: [
      { name: "Performance", color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" },
      { name: "Identity", color: "text-blue-400 bg-blue-500/5 border-blue-500/10" },
    ],
  },
  {
    date: "May 27, 2026",
    title: "Webhook delivery now guaranteed with 3-attempt retry",
    description: "Webhook events that fail on first delivery are retried at 1min, 10min, and 1hr intervals. Delivery log is visible in the dashboard under Events. This was the most-requested feature from Pro plan users.",
    tags: [
      { name: "New feature", color: "text-purple-400 bg-purple-500/5 border-purple-500/10" },
    ],
  },
  {
    date: "May 19, 2026",
    title: "M-Pesa payout endpoint — response schema updated",
    description: "The transaction_ref field is now always a string (was inconsistently returning int on Safaricom staging). Existing integrations should validate the type on their end — existing string handling is unaffected.",
    tags: [
      { name: "Fix", color: "text-amber-400 bg-amber-500/5 border-amber-500/10" },
      { name: "Heads-up", color: "text-red-400 bg-red-500/5 border-red-500/10" },
    ],
  },
  {
    date: "May 11, 2026",
    title: "Node.js SDK v2.1.0 released",
    description: "Added TypeScript types for all 24 endpoints, auto-retry on 429, and a devhub.mock() helper for testing without hitting live APIs. Install via npm install devhubx@2.1.0.",
    tags: [
      { name: "SDK", color: "text-cyan-400 bg-cyan-500/5 border-cyan-500/10" },
    ],
  },
  {
    date: "Apr 29, 2026",
    title: "Address geocoder expanded to 34 Nigerian states",
    description: "Coverage was previously limited to Lagos, Abuja, Kano, Rivers, and Oyo states. Now resolves addresses across all 36 states including rural LGAs. Accuracy in newly added states is 91% — improving as we index more postal data.",
    tags: [
      { name: "Expansion", color: "text-pink-400 bg-pink-500/5 border-pink-500/10" },
    ],
  },
];

export default memo(function Changelog() {
  return (
    <section
      id="changelog"
      className="bg-neutral-950 py-24 sm:py-32 select-none border-b border-white/5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/2 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
              Updates
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
              Changelog
            </h2>
          </div>
          <button className="shrink-0 self-start sm:self-auto flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-emerald-400 transition-colors duration-200 cursor-pointer group">
            Subscribe to updates
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
        </FadeUp>

        {/* Timeline Events */}
        <StaggerContainer stagger={0.1} className="relative pl-6 sm:pl-8 border-l border-white/10 flex flex-col gap-12 sm:gap-16">
          {changelogEvents.map((event, index) => (
            <StaggerItem key={index} className="relative group text-left">
              {/* Glowing Dot indicator */}
              <div className="absolute left-[-31px] sm:left-[-39px] top-1.5 w-4 h-4 rounded-full bg-neutral-950 border-2 border-white/20 flex items-center justify-center group-hover:border-brand-green transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-brand-green transition-colors duration-300" />
              </div>

              {/* Date Header */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs font-bold text-neutral-500 tracking-wider font-mono">
                  {event.date}
                </span>
                
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {event.tags.map((tag) => (
                    <span
                      key={tag.name}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${tag.color}`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content Body */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-brand-green transition-colors duration-200 mb-2">
                  {event.title}
                </h3>
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                  {event.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
});
