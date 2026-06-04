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

  const plans = [
    {
      name: "Free",
      tagline: "Sandbox",
      price: 0,
      volume: "1,000 calls/mo",
      buttonText: "Get started free",
      isHero: false,
      badge: "Sandbox",
      features: [
        "1,000 API calls/month",
        "Sandbox environment",
        "Community Discord",
        "Identity APIs (limited)",
        "Webhooks",
      ],
    },
    {
      name: "Pro",
      tagline: "Growing teams",
      price: isAnnual ? 25 : 29,
      volume: "100K calls/mo",
      buttonText: "Upgrade to Pro",
      isHero: true,
      badge: "Most popular",
      features: [
        "100K API calls/month",
        "All identity & finance APIs",
        "<10ms latency SLA",
        "Webhooks + delivery log",
        "Email support (1hr)",
      ],
    },
    {
      name: "Growth",
      tagline: "Scaling fintechs",
      price: isAnnual ? 84 : 99,
      volume: "500K calls/mo",
      buttonText: "Start Growth plan",
      isHero: false,
      features: [
        "500K API calls/month",
        "All Pro features",
        "Team seats (up to 10)",
        "Usage analytics dashboard",
        "Priority support (30min)",
      ],
    },
    {
      name: "Enterprise",
      tagline: "Unlimited scale",
      price: "Custom",
      volume: "Unlimited calls",
      buttonText: "Contact sales",
      isHero: false,
      features: [
        "Unlimited API calls",
        "Dedicated edge nodes",
        "SOC2 compliance reports",
        "24/7 phone & Slack support",
        "Custom SLA & audit logs",
      ],
    },
  ];

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
              <span className="text-[10px] font-bold bg-brand-green text-neutral-950 px-2 py-0.5 rounded-full">
                Save 15% annually
              </span>
            </button>
          </div>
        </FadeUp>

        {/* 4-Tier Grid */}
        <StaggerContainer
          stagger={0.1}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch max-w-7xl mx-auto"
        >
          {plans.map((plan) => {
            const cardContent = (
              <div className="rounded-2xl bg-neutral-950 h-full p-8 flex flex-col justify-between relative overflow-hidden">
                {plan.isHero && (
                  <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-green/8 rounded-full blur-[80px] pointer-events-none" />
                )}

                <div className="relative z-10 animate-fade-up-word">
                  <div className="flex items-center justify-between mb-6 gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                      {plan.tagline && (
                        <p className="text-xs text-neutral-400 mt-1">{plan.tagline}</p>
                      )}
                    </div>
                    {plan.badge && (
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        plan.isHero
                          ? "text-neutral-950 bg-brand-green shadow-sm shadow-emerald-500/20"
                          : "text-neutral-400 bg-neutral-800"
                      }`}>
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1 mb-2">
                    {typeof plan.price === "number" ? (
                      <span className="text-5xl font-extrabold text-white tracking-tight">
                        <AnimatedPrice value={plan.price} />
                      </span>
                    ) : (
                      <span className="text-5xl font-extrabold text-white tracking-tight">
                        {plan.price}
                      </span>
                    )}
                    {typeof plan.price === "number" && (
                      <span className="text-neutral-500 text-sm font-medium">/mo</span>
                    )}
                  </div>
                  <p className="text-neutral-500 text-sm mb-8">
                    {plan.volume} &bull; {plan.name === "Free" ? "Forever free" : plan.name === "Enterprise" ? "Volume contracts" : isAnnual ? "Billed annually" : "Cancel anytime"}
                  </p>

                  <div className="border-t border-white/5 pt-6">
                    <ul className="flex flex-col gap-3.5">
                      {plan.features.map((feat, i) => (
                        <li key={i} className={`flex items-start gap-2.5 text-sm ${plan.isHero ? "text-neutral-300" : "text-neutral-400"}`}>
                          <svg className={`w-4 h-4 shrink-0 mt-0.5 ${plan.isHero ? "text-brand-green" : "text-neutral-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button className={`w-full mt-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  plan.isHero
                    ? "text-neutral-950 bg-brand-green hover:bg-emerald-400 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 hover:-translate-y-0.5 font-bold"
                    : "text-neutral-300 border border-white/10 hover:border-white/20 hover:bg-white/5"
                }`}>
                  {plan.buttonText}
                </button>
              </div>
            );

            if (plan.isHero) {
              return (
                <StaggerItem key={plan.name} className="rounded-2xl p-px bg-linear-to-b from-brand-green/40 via-brand-green/10 to-transparent lg:-translate-y-4">
                  {cardContent}
                </StaggerItem>
              );
            }

            return (
              <StaggerItem key={plan.name} className="rounded-2xl border border-white/5 bg-neutral-900/40 backdrop-blur-sm flex flex-col justify-between transition-all duration-300 hover:border-white/10">
                {cardContent}
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Overage pricing note */}
        <FadeUp delay={0.4}>
          <div className="max-w-6xl mx-auto mt-12 p-6 rounded-2xl border border-white/5 bg-neutral-900/20 backdrop-blur-sm text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <p className="text-neutral-300 text-sm leading-relaxed">
                <span className="text-brand-green font-semibold">Overage pricing</span> is tiered by endpoint category — identity APIs (NIN, BVN, Face Match) overage at <span className="text-white font-semibold font-mono">$0.015/call</span>, finance APIs at <span className="text-white font-semibold font-mono">$0.008/call</span>, address & logistics at <span className="text-white font-semibold font-mono">$0.003/call</span>. We never cut off live traffic — overages are billed at month end.
              </p>
            </div>
            <a
              href="#rate-card"
              className="shrink-0 text-sm font-semibold text-brand-green hover:text-emerald-400 hover:underline transition-all flex items-center gap-1"
            >
              See full rate card
              <span>→</span>
            </a>
          </div>
        </FadeUp>

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
              showComparison ? "max-h-[700px] opacity-100 mt-10" : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <div className="rounded-xl border border-white/5 bg-neutral-900/30 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="py-4 px-6 text-neutral-500 font-semibold text-xs uppercase tracking-wider">Feature</th>
                    <th className="py-4 px-6 text-neutral-500 font-semibold text-xs uppercase tracking-wider text-center">Free</th>
                    <th className="py-4 px-6 text-neutral-500 font-semibold text-xs uppercase tracking-wider text-center">Pro</th>
                    <th className="py-4 px-6 text-brand-green font-semibold text-xs uppercase tracking-wider text-center">Growth</th>
                    <th className="py-4 px-6 text-neutral-500 font-semibold text-xs uppercase tracking-wider text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Monthly API calls", free: "1,000", pro: "100K", growth: "500K", enterprise: "Unlimited" },
                    { feature: "Latency SLA", free: "Best effort", pro: "< 10ms", growth: "< 10ms", enterprise: "Custom" },
                    { feature: "Identity APIs", free: "Limited", pro: "Full suite", growth: "Full suite", enterprise: "Full + Custom" },
                    { feature: "Finance APIs", free: "—", pro: "Full suite", growth: "Full suite", enterprise: "Full + Custom" },
                    { feature: "Webhooks", free: "✓", pro: "+ Delivery log", growth: "+ Delivery log", enterprise: "✓" },
                    { feature: "Team Seats", free: "1", pro: "1", growth: "Up to 10", enterprise: "Unlimited" },
                    { feature: "Analytics Dashboard", free: "—", pro: "✓", growth: "✓", enterprise: "✓" },
                    { feature: "SOC2 Compliance", free: "—", pro: "—", growth: "—", enterprise: "✓" },
                    { feature: "Dedicated Support", free: "Community", pro: "Email (1hr)", growth: "Priority (30m)", enterprise: "24/7 Phone/Slack" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-b-0 hover:bg-white/2 transition-colors duration-150">
                      <td className="py-3.5 px-6 text-neutral-300 font-medium">{row.feature}</td>
                      <td className="py-3.5 px-6 text-neutral-500 text-center text-xs">{row.free}</td>
                      <td className="py-3.5 px-6 text-neutral-400 text-center text-xs">{row.pro}</td>
                      <td className="py-3.5 px-6 text-emerald-400 text-center text-xs font-semibold">{row.growth}</td>
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
