"use client";

import React, { memo, useState, useEffect } from "react";
import { FadeUp, SlideIn } from "@/lib/motion";

export default memo(function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-advance through steps
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setActiveStep(0), 0));
    timers.push(setTimeout(() => setActiveStep(1), 3500));
    timers.push(setTimeout(() => setActiveStep(2), 7000));
    return () => timers.forEach(clearTimeout);
  }, []);

  // Typing animation for step 2 terminal
  const [typed, setTyped] = useState("");
  const command = "npm install @devhubx/sdk";
  useEffect(() => {
    if (activeStep !== 1) {
      setTyped("");
      return;
    }
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx <= command.length) {
        setTyped(command.slice(0, idx));
      }
    }, 60);
    return () => clearInterval(interval);
  }, [activeStep]);

  // Response animation for step 3
  const [showResult, setShowResult] = useState(false);
  useEffect(() => {
    if (activeStep !== 2) {
      setShowResult(false);
      return;
    }
    const timer = setTimeout(() => setShowResult(true), 1200);
    return () => clearTimeout(timer);
  }, [activeStep]);

  const steps = [
    {
      number: "01",
      title: "Create your account",
      subtitle: "Sign up & get API key",
      description: "Register in under 30 seconds. Your live and test API credentials are generated instantly — zero approvals.",
    },
    {
      number: "02",
      title: "Pick your endpoint",
      subtitle: "Install the SDK",
      description: "Browse the catalog, choose your service, and install our lightweight client library.",
    },
    {
      number: "03",
      title: "Ship to production",
      subtitle: "Make your first call",
      description: "Execute your first verified request in milliseconds. Monitor results on the live dashboard.",
    },
  ];

  return (
    <section className="bg-white py-24 sm:py-32 select-none border-b border-neutral-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <FadeUp className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
            How it works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-3 mb-6">
            Three steps. Zero complexity.
          </h2>
          <p className="text-base sm:text-lg text-neutral-500 leading-relaxed">
            Go from sign-up to production API calls in under five minutes.
          </p>
        </FadeUp>

        {/* Steps + Visualizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">

          {/* Left: Step Selector */}
          <SlideIn direction="left" className="lg:col-span-5 flex flex-col gap-0 relative">
            {/* Vertical progress line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-neutral-200 hidden md:block" />
            <div
              className="absolute left-5 top-0 w-px bg-brand-green hidden md:block transition-all duration-700 ease-out"
              style={{ height: `${((activeStep + 1) / 3) * 100}%` }}
            />

            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`relative text-left pl-14 py-8 cursor-pointer transition-all duration-300 group ${
                  idx < steps.length - 1 ? "border-b border-neutral-100" : ""
                }`}
              >
                {/* Step number circle */}
                <div
                  className={`absolute left-0 top-8 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 z-10 ${
                    activeStep === idx
                      ? "bg-brand-green border-brand-green text-neutral-950 shadow-md shadow-emerald-500/20 scale-110"
                      : activeStep > idx
                        ? "bg-emerald-50 border-brand-green text-brand-green"
                        : "bg-white border-neutral-200 text-neutral-400"
                  }`}
                >
                  {activeStep > idx ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>

                {/* Text content */}
                <div className={`transition-opacity duration-300 ${activeStep === idx ? "opacity-100" : "opacity-50"}`}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-brand-green mb-1">
                    {step.subtitle}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>
              </button>
            ))}
          </SlideIn>

          {/* Right: Interactive Visual Console */}
          <SlideIn direction="right" delay={0.2} className="lg:col-span-7 flex items-stretch">
            <div className="w-full rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl flex flex-col overflow-hidden min-h-[420px]">

              {/* Console header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-neutral-900/40 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                </div>
                <span className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">
                  Step {activeStep + 1} &bull; {steps[activeStep].subtitle}
                </span>
                <span className="w-14" />
              </div>

              {/* Console Body */}
              <div className="flex-1 p-6 font-mono text-xs md:text-sm leading-relaxed flex flex-col justify-center">

                {/* Step 1: Account creation visualization */}
                {activeStep === 0 && (
                  <div className="flex flex-col gap-4">
                    <div className="text-neutral-600 text-[10px] uppercase tracking-wider mb-1">// Account provisioned</div>

                    <div className="bg-neutral-900 border border-white/5 rounded-xl p-5 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">workspace</span>
                        <span className="text-white font-semibold">frank-workspace</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">environment</span>
                        <span className="text-amber-400 font-semibold">sandbox</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">api_key</span>
                        <span className="text-brand-green font-semibold tracking-wider">dev_live_9f8a2b••••••</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">status</span>
                        <span className="text-brand-green font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                          Active
                        </span>
                      </div>
                    </div>

                    <div className="text-emerald-400/70 text-[10px]">✓ Credentials generated in 0.8s</div>
                  </div>
                )}

                {/* Step 2: SDK Install visualization */}
                {activeStep === 1 && (
                  <div className="flex flex-col gap-4">
                    <div className="text-neutral-600 text-[10px] uppercase tracking-wider mb-1">// Terminal</div>

                    <div>
                      <span className="text-brand-green select-none">~ $ </span>
                      <span className="text-white">{typed}</span>
                      <span className="inline-block w-1.5 h-3.5 bg-brand-green ml-0.5 animate-pulse" />
                    </div>

                    {typed.length === command.length && (
                      <div className="bg-neutral-900 border border-white/5 rounded-xl p-4 flex flex-col gap-2 mt-2 transition-opacity duration-500">
                        <div className="text-neutral-500">
                          <span className="text-emerald-400">added</span> 1 package in 1.2s
                        </div>
                        <div className="text-neutral-600 text-[10px] mt-1">
                          └── @devhubx/sdk@2.4.1
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                          <span className="text-neutral-400 text-[11px]">Ready to import</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: First API call visualization */}
                {activeStep === 2 && (
                  <div className="flex flex-col gap-4">
                    <div className="text-neutral-600 text-[10px] uppercase tracking-wider mb-1">// Executing first call</div>

                    <div className="bg-neutral-900 border border-white/5 rounded-xl p-4">
                      <div className="text-neutral-400 mb-1">
                        <span className="text-purple-400">const</span> result = <span className="text-purple-400">await</span> devhub.<span className="text-blue-400">verify</span>({"{"})
                      </div>
                      <div className="text-neutral-400 pl-4">
                        type: <span className="text-emerald-400">&quot;nin&quot;</span>,
                      </div>
                      <div className="text-neutral-400 pl-4">
                        value: <span className="text-emerald-400">&quot;23408102392&quot;</span>
                      </div>
                      <div className="text-neutral-400">{"}"});</div>
                    </div>

                    {/* Response slides up */}
                    <div className={`transition-all duration-700 ease-out ${showResult ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                      <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-4 flex flex-col gap-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-brand-green font-bold text-[10px]">✓ 200 OK</span>
                          <span className="text-neutral-600 text-[10px]">• 4.2ms</span>
                        </div>
                        <pre className="text-emerald-400 text-xs">
{`{
  "status": "valid",
  "firstName": "Frank",
  "lastName": "Obi",
  "lga": "Eti-Osa",
  "state": "Lagos"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </SlideIn>

        </div>

      </div>
    </section>
  );
});
