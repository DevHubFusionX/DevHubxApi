"use client";

import React, { memo, useState, useEffect, useRef } from "react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/lib/motion";
import DotWaveBackground from "@/components/landing/DotWaveBackground";

// ─── Animated Price Counter (memoized) ───
const AnimatedPrice = memo(function AnimatedPrice({
  value,
  prefix = "$",
}: {
  value: number;
  prefix?: string;
}) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    const duration = 400;
    const start = Date.now();

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplay(Math.round(from + (to - from) * ease));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    prevRef.current = value;
  }, [value]);

  return <span className="tabular-nums">{prefix}{display}</span>;
});

// ─── Pricing Card List Wrapper (memoized) ───
export default memo(function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const proPrice = isAnnual ? 24 : 29;

  return (
    <section
      id="pricing"
      className="bg-neutral-950 py-24 sm:py-32 select-none overflow-hidden relative text-left"
    >
      {/* Wave Dot Animation background */}
      <DotWaveBackground />

      {/* Ambient background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-green/3 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3 mb-6">
            Start free. Scale without surprises.
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            No hidden fees. No per-seat pricing. Pay only for the API calls you consume.
          </p>
        </FadeUp>

        {/* Toggle */}
        <FadeUp delay={0.15} className="flex items-center justify-center gap-3 mb-16">
          <div className="bg-neutral-900 rounded-full p-1 border border-white/5 flex items-center gap-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                !isAnnual
                  ? "bg-white text-neutral-950 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                isAnnual
                  ? "bg-white text-neutral-950 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              Annual
              <span className="text-[9px] font-bold bg-brand-green text-neutral-950 px-1.5 py-0.5 rounded-full">
                -15%
              </span>
            </button>
          </div>
        </FadeUp>

        {/* 3-Tier Grid */}
        <StaggerContainer
          stagger={0.1}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto"
        >

          {/* Free Tier */}
          <StaggerItem className="rounded-2xl border border-white/5 bg-neutral-900/40 backdrop-blur-sm p-8 flex flex-col justify-between transition-all duration-300 hover:border-white/10">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Free</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-800 px-2.5 py-1 rounded-full">
                  Sandbox
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-extrabold text-white tracking-tight">$0</span>
              </div>
              <p className="text-neutral-500 text-sm mb-8">
                1,000 calls/month &bull; Forever free
              </p>

              <div className="border-t border-white/5 pt-6">
                <ul className="flex flex-col gap-3.5">
                  {[
                    "1,000 API calls per month",
                    "Sandbox environment access",
                    "Community Discord support",
                    "Standard edge routing",
                    "Basic request logging",
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-400">
                      <svg className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button className="w-full mt-8 py-3.5 rounded-xl text-sm font-semibold text-neutral-300 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-200 cursor-pointer">
              Get started free
            </button>
          </StaggerItem>

          {/* Pro Tier (Hero Card) */}
          <StaggerItem className="rounded-2xl p-px bg-gradient-to-b from-brand-green/40 via-brand-green/10 to-transparent lg:-translate-y-4">
            <div className="rounded-2xl bg-neutral-950 h-full p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-green/8 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Pro</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-950 bg-brand-green px-2.5 py-1 rounded-full shadow-sm shadow-emerald-500/20">
                    Most popular
                  </span>
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-extrabold text-white tracking-tight">
                    <AnimatedPrice value={proPrice} />
                  </span>
                  <span className="text-neutral-500 text-sm font-medium">/mo</span>
                </div>
                <p className="text-neutral-500 text-sm mb-8">
                  100K calls/month &bull; {isAnnual ? "Billed $288/yr" : "Cancel anytime"}
                </p>

                <div className="border-t border-white/5 pt-6">
                  <ul className="flex flex-col gap-3.5">
                    {[
                      "100,000 API calls per month",
                      "All Identity, Finance & Address APIs",
                      "Guaranteed < 10ms latency SLA",
                      "Priority email support (1hr)",
                      "Webhook integrations",
                      "Usage analytics dashboard",
                      "Custom rate limiting rules",
                    ].map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-300">
                        <svg className="w-4 h-4 text-brand-green shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button className="relative z-10 w-full mt-8 py-3.5 rounded-xl text-sm font-bold text-neutral-950 bg-brand-green hover:bg-emerald-400 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
                Upgrade to Pro
              </button>
            </div>
          </StaggerItem>

          {/* Enterprise Tier */}
          <StaggerItem className="rounded-2xl border border-white/5 bg-neutral-900/40 backdrop-blur-sm p-8 flex flex-col justify-between transition-all duration-300 hover:border-white/10">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Enterprise</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-800 px-2.5 py-1 rounded-full">
                  Custom
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-extrabold text-white tracking-tight">Custom</span>
              </div>
              <p className="text-neutral-500 text-sm mb-8">
                Unlimited calls &bull; Volume contracts
              </p>

              <div className="border-t border-white/5 pt-6">
                <ul className="flex flex-col gap-3.5">
                  {[
                    "Unlimited API requests",
                    "Dedicated edge infrastructure",
                    "Custom regional endpoints",
                    "SOC2 compliance reporting",
                    "24/7 phone & Slack support",
                    "Dedicated solutions architect",
                    "Custom SLA & uptime guarantees",
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-400">
                      <svg className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button className="w-full mt-8 py-3.5 rounded-xl text-sm font-semibold text-neutral-300 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-200 cursor-pointer">
              Contact sales
            </button>
          </StaggerItem>

        </StaggerContainer>

        {/* Feature Comparison Toggle */}
        <div className="max-w-6xl mx-auto mt-16">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="mx-auto flex items-center gap-2 text-sm font-semibold text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <span>{showComparison ? "Hide" : "Compare all"} features</span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${showComparison ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Comparison Table */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showComparison ? "max-h-[600px] opacity-100 mt-10" : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <div className="rounded-xl border border-white/5 bg-neutral-900/30 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="py-4 px-6 text-neutral-500 font-semibold text-xs uppercase tracking-wider">Feature</th>
                    <th className="py-4 px-6 text-neutral-500 font-semibold text-xs uppercase tracking-wider text-center">Free</th>
                    <th className="py-4 px-6 text-brand-green font-semibold text-xs uppercase tracking-wider text-center">Pro</th>
                    <th className="py-4 px-6 text-neutral-500 font-semibold text-xs uppercase tracking-wider text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Monthly API calls", free: "1,000", pro: "100,000", enterprise: "Unlimited" },
                    { feature: "Latency SLA", free: "Best effort", pro: "< 10ms", enterprise: "Custom" },
                    { feature: "Identity APIs", free: "Basic", pro: "Full suite", enterprise: "Full suite" },
                    { feature: "Finance APIs", free: "—", pro: "Full suite", enterprise: "Full + custom" },
                    { feature: "Webhook integrations", free: "—", pro: "✓", enterprise: "✓" },
                    { feature: "Analytics dashboard", free: "—", pro: "✓", enterprise: "✓" },
                    { feature: "SOC2 compliance", free: "—", pro: "—", enterprise: "✓" },
                    { feature: "Dedicated support", free: "Community", pro: "Email (1hr)", enterprise: "24/7 phone" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-b-0 hover:bg-white/2 transition-colors duration-150">
                      <td className="py-3.5 px-6 text-neutral-300 font-medium">{row.feature}</td>
                      <td className="py-3.5 px-6 text-neutral-500 text-center text-xs">{row.free}</td>
                      <td className="py-3.5 px-6 text-emerald-400 text-center text-xs font-semibold">{row.pro}</td>
                      <td className="py-3.5 px-6 text-neutral-400 text-center text-xs">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
});
