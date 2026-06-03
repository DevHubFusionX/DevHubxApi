"use client";

import React, { memo, useState, useEffect } from "react";
import { BlurFadeUp, StaggerContainer, StaggerItem } from "@/lib/motion";
import DotWaveBackground from "@/components/landing/DotWaveBackground";

// ─── LiveCounter (memoized) ───
const LiveCounter = memo(function LiveCounter() {
  const [count, setCount] = useState(2_847_291);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 12 + 3));
    }, 800);
    return () => clearInterval(interval);
  }, []);
  return <span className="tabular-nums">{count.toLocaleString()}</span>;
});

// ─── MiniBarChart (memoized) ───
const MiniBarChart = memo(function MiniBarChart() {
  const [heights, setHeights] = useState([40, 65, 55, 80, 45, 70, 60, 75, 50, 85, 65, 72]);
  useEffect(() => {
    const interval = setInterval(() => {
      setHeights((prev) =>
        prev.map((h) => Math.max(25, Math.min(90, h + (Math.random() * 20 - 10))))
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex items-end gap-1 h-16 w-full mt-3">
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 bg-brand-green/60 rounded-t-sm transition-all duration-700 ease-in-out"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
});

export default memo(function ApiCatalog() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Typing animation for the NIN card
  const [ninTyped, setNinTyped] = useState("");
  const ninFull = "23408102392";
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx <= ninFull.length) {
        setNinTyped(ninFull.slice(0, idx));
      } else if (idx > ninFull.length + 8) {
        idx = 0;
        setNinTyped("");
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-neutral-950 py-24 sm:py-32 overflow-hidden select-none border-y border-white/5 relative">
      {/* Wave Dot Animation background */}
      <DotWaveBackground />
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header Block */}
        <BlurFadeUp className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
            API Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3 mb-6">
            Every endpoint you need, in one gateway
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            Explore our bento of production-ready services — from identity verification to real-time logistics tracking.
          </p>
        </BlurFadeUp>

        {/* Bento Grid */}
        <StaggerContainer
          stagger={0.08}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]"
        >

          {/* Card 1: NIN Verification (Large — 2 col, 2 row) */}
          <StaggerItem className="lg:col-span-2 lg:row-span-2 rounded-2xl border border-white/5 bg-neutral-900/50 p-8 flex flex-col justify-between group cursor-default overflow-hidden relative">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-brand-green/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">Identity</span>
                <span className="text-[10px] font-mono text-neutral-600">from $0.012/call</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-green transition-colors duration-200">NIN Verification</h3>
              <p className="text-neutral-500 text-sm leading-relaxed max-w-md">
                Instantly verify Nigerian National Identity Numbers with biometric database checks across all 36 states.
              </p>
            </div>
            <div className="relative z-10 mt-auto">
              <div className="bg-neutral-950 rounded-xl border border-white/5 p-5 font-mono text-xs">
                <div className="text-neutral-600 mb-2 text-[10px] uppercase tracking-wider">// Live preview</div>
                <div className="text-neutral-400">
                  <span className="text-brand-green">GET</span> /v1/verify/nin/<span className="text-white font-semibold">{ninTyped}</span><span className="inline-block w-1 h-3.5 bg-brand-green ml-0.5 animate-pulse" />
                </div>
                <div className={`mt-3 text-emerald-400 transition-opacity duration-300 ${ninTyped.length === ninFull.length ? "opacity-100" : "opacity-0"}`}>
                  {"{"} &quot;status&quot;: &quot;valid&quot;, &quot;lga&quot;: &quot;Eti-Osa&quot; {"}"}
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Card 2: Mobile Money Payouts */}
          <StaggerItem
            className="rounded-2xl border border-white/5 bg-neutral-900/50 p-6 flex flex-col justify-between group cursor-default overflow-hidden relative"
          >
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-emerald-500/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Finance</span>
              <h3 className="text-lg font-bold text-white mt-3 group-hover:text-brand-green transition-colors duration-200">Mobile Money</h3>
            </div>
            <div className="relative z-10 mt-auto flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {["🇰🇪", "🇳🇬", "🇬🇭", "🇺🇬"].map((flag, i) => (
                  <span key={i} className="text-sm bg-neutral-800 w-6 h-6 rounded-full flex items-center justify-center text-[10px] border border-neutral-700">{flag}</span>
                ))}
              </div>
              <span className="text-neutral-600 text-[10px]">4 networks</span>
            </div>
          </StaggerItem>

          {/* Card 3: Live Request Counter */}
          <StaggerItem className="rounded-2xl border border-white/5 bg-gradient-to-br from-brand-green/10 to-neutral-900/50 p-6 flex flex-col justify-between overflow-hidden relative">
            <div className="text-[10px] font-bold uppercase tracking-wider text-brand-green">Live requests</div>
            <div>
              <div className="text-3xl font-extrabold text-white tracking-tight">
                <LiveCounter />
              </div>
              <div className="text-neutral-500 text-[10px] mt-1">processed this month</div>
            </div>
          </StaggerItem>

          {/* Card 4: Address Parser */}
          <StaggerItem
            className="rounded-2xl border border-white/5 bg-neutral-900/50 p-6 flex flex-col justify-between group cursor-default overflow-hidden relative"
          >
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Address</span>
              <h3 className="text-lg font-bold text-white mt-3 group-hover:text-brand-green transition-colors duration-200">Address Parser</h3>
            </div>
            <div className="relative z-10 mt-auto text-neutral-500 text-xs font-mono">
              <span className="text-neutral-600">&quot;</span>
              <span className={`transition-colors duration-200 ${hoveredCard === 3 ? "text-emerald-400" : "text-neutral-400"}`}>45+ postal networks</span>
              <span className="text-neutral-600">&quot;</span>
            </div>
          </StaggerItem>

          {/* Card 5: Bank Resolver */}
          <StaggerItem
            className="rounded-2xl border border-white/5 bg-neutral-900/50 p-6 flex flex-col justify-between group cursor-default overflow-hidden relative"
          >
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Finance</span>
              <h3 className="text-lg font-bold text-white mt-3 group-hover:text-brand-green transition-colors duration-200">Bank Resolver</h3>
            </div>
            <div className="relative z-10 mt-auto">
              <div className="text-2xl font-extrabold text-white">120<span className="text-brand-green text-lg">+</span></div>
              <div className="text-neutral-500 text-[10px]">partner banks connected</div>
            </div>
          </StaggerItem>

          {/* Card 6: Usage Dashboard (Wide — 2 col) */}
          <StaggerItem className="lg:col-span-2 rounded-2xl border border-white/5 bg-neutral-900/50 p-6 flex flex-col justify-between overflow-hidden relative">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Analytics</span>
                <h3 className="text-lg font-bold text-white mt-3">Usage Dashboard</h3>
              </div>
              <div className="text-right">
                <div className="text-xs text-neutral-500">avg latency</div>
                <div className="text-lg font-bold text-brand-green tabular-nums">4.2ms</div>
              </div>
            </div>
            <MiniBarChart />
          </StaggerItem>

          {/* Card 7: Waybill Tracking */}
          <StaggerItem
            className="rounded-2xl border border-white/5 bg-neutral-900/50 p-6 flex flex-col justify-between group cursor-default overflow-hidden relative"
          >
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Logistics</span>
              <h3 className="text-lg font-bold text-white mt-3 group-hover:text-brand-green transition-colors duration-200">Waybill Tracking</h3>
            </div>
            <div className="relative z-10 mt-auto flex flex-col gap-1.5">
              {[
                { label: "Picked up", done: true },
                { label: "In transit", done: true },
                { label: "Delivered", done: hoveredCard === 6 },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px]">
                  <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${step.done ? "bg-brand-green" : "bg-neutral-700"}`} />
                  <span className={`transition-colors duration-300 ${step.done ? "text-neutral-300" : "text-neutral-600"}`}>{step.label}</span>
                </div>
              ))}
            </div>
          </StaggerItem>

          {/* Card 8: Biometric Face Match */}
          <StaggerItem className="rounded-2xl border border-white/5 bg-gradient-to-br from-purple-500/5 to-neutral-900/50 p-6 flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">Identity</span>
              <h3 className="text-lg font-bold text-white mt-3">Face Match</h3>
            </div>
            <div className="relative z-10 mt-auto flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px] text-neutral-500">👤</div>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-500/40 to-transparent" />
              <div className="text-xs font-bold text-purple-400">98.7%</div>
            </div>
          </StaggerItem>

        </StaggerContainer>

        {/* Browse All Link */}
        <div className="text-center mt-14">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-neutral-400 hover:text-brand-green transition-colors duration-200"
          >
            <span>Browse all 24 APIs</span>
            <span>&rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
});
