import React, { memo, useState } from "react";
import { openAuthModal } from "@/lib/auth-trigger";

export default memo(function ApisDropdown() {
  const [apiTab, setApiTab] = useState<"core" | "infra">("core");

  return (
    <div className="flex flex-col">

      {/* Sub-selector tabs */}
      <div className="flex items-center gap-2 bg-neutral-900/80 p-1 rounded-xl border border-white/5 w-fit mb-6">
        <button
          onMouseEnter={() => setApiTab("core")}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${apiTab === "core"
              ? "bg-white text-neutral-950 shadow-sm"
              : "text-neutral-400 hover:text-white"
            }`}
        >
          Core APIs
        </button>
        <button
          onMouseEnter={() => setApiTab("infra")}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${apiTab === "infra"
              ? "bg-white text-neutral-950 shadow-sm"
              : "text-neutral-400 hover:text-white"
            }`}
        >
          Infrastructure &amp; Tools
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left column */}
        <div className="col-span-7 flex flex-col gap-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
            {apiTab === "core" ? "Identity & Finance endpoints" : "Logistics & Developer telemetry"}
          </span>

          <div className="flex flex-col gap-2 min-h-[220px]">
            {apiTab === "core" ? (
              <>
                <a href="#apis" className="group flex items-start gap-4 p-2.5 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/2 transition-all duration-200">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-brand-green group-hover:scale-105 transition-transform duration-200 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-brand-green transition-colors duration-200">NIN Verification</span>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">4.2ms</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">Instantly verify National Identity Numbers with full biometric database matching.</p>
                  </div>
                </a>

                <a href="#apis" className="group flex items-start gap-4 p-2.5 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/2 transition-all duration-200">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-brand-green group-hover:scale-105 transition-transform duration-200 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-brand-green transition-colors duration-200">Face Match AI</span>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">12ms</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">High accuracy visual matching against government registry photos.</p>
                  </div>
                </a>

                <a href="#apis" className="group flex items-start gap-4 p-2.5 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/2 transition-all duration-200">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-brand-green group-hover:scale-105 transition-transform duration-200 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-brand-green transition-colors duration-200">Bank Resolver</span>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">3.1ms</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">Resolve partner bank details, names, and routing parameters instantly.</p>
                  </div>
                </a>
              </>
            ) : (
              <>
                <a href="#apis" className="group flex items-start gap-4 p-2.5 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/2 transition-all duration-200">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-brand-green group-hover:scale-105 transition-transform duration-200 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-brand-green transition-colors duration-200">Waybill Logistics</span>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">6.8ms</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">Consolidate shipping, track status and query delivery milestones from 12+ networks.</p>
                  </div>
                </a>

                <a href="#apis" className="group flex items-start gap-4 p-2.5 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/2 transition-all duration-200">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-brand-green group-hover:scale-105 transition-transform duration-200 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-brand-green transition-colors duration-200">Address Parser</span>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">1.1ms</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">Clean, parse, and validate global text address fields into structured JSON.</p>
                  </div>
                </a>

                <a href="#apis" className="group flex items-start gap-4 p-2.5 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/2 transition-all duration-200">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-brand-green group-hover:scale-105 transition-transform duration-200 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-brand-green transition-colors duration-200">Usage Telemetry</span>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Real-time</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">Track latency histograms, request success rates, and token consumption.</p>
                  </div>
                </a>
              </>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-5 border-l border-white/10 pl-6 flex flex-col gap-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
            Ecosystem &amp; Sandbox
          </span>

          <div className="flex flex-col gap-4">
            <a href="#apis" className="group flex items-start gap-3">
              <span className="text-sm shrink-0">💸</span>
              <div>
                <span className="text-xs font-bold text-neutral-200 group-hover:text-white block transition-colors duration-200">Mobile Money Payouts</span>
                <span className="text-[10px] text-neutral-400 block mt-0.5 leading-relaxed">Route payouts directly to MTN, Airtel, and Orange mobile networks.</span>
              </div>
            </a>

            <a href="#docs" className="group flex items-start gap-3">
              <span className="text-sm shrink-0">🧪</span>
              <div>
                <span className="text-xs font-bold text-neutral-200 group-hover:text-white block transition-colors duration-200">Sandbox Environment</span>
                <span className="text-[10px] text-neutral-400 block mt-0.5 leading-relaxed">Test synthetic latencies and simulated webhook retries offline.</span>
              </div>
            </a>

            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse shrink-0" />
              <span className="text-[10px] text-neutral-400">
                Uptime: <strong className="text-white font-semibold">99.99%</strong> • Latency: <strong className="text-white font-semibold">4.2ms</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Accent CTA Banner */}
      <div className="mt-6 pt-5 border-t border-white/5">
        <div className="bg-brand-green rounded-xl p-4 flex items-center justify-between text-neutral-950 shadow-lg shadow-emerald-500/10">
          <div className="flex flex-col mr-4">
            <span className="text-sm font-black tracking-tight leading-none">Start building in minutes. Get keys today.</span>
            <span className="text-xs font-medium text-neutral-900 mt-1.5 leading-tight">Integrate our production APIs and receive 1,000 free requests.</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openAuthModal("signup");
            }}
            className="bg-neutral-950 text-white hover:bg-neutral-900 rounded-lg px-4 py-2 text-xs font-bold shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
          >
            Get Started
          </button>
        </div>
      </div>

    </div>
  );
});
