"use client";

import React, { memo, useState, useEffect } from "react";
import { FadeUp } from "@/lib/motion";
import DotWaveBackground from "@/components/landing/DotWaveBackground";

// --- Sub-component: Raw to Unified Schema normalizer ---
const RawVSUnified = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 h-full items-stretch w-full">
      {/* Raw APIs Input */}
      <div className="flex-1 rounded-xl bg-black/60 border border-white/5 p-4 flex flex-col justify-between font-mono text-[10px] overflow-hidden text-neutral-500 min-h-[160px]">
        <div>
          <div className="text-neutral-400 font-bold mb-2 pb-1 border-b border-white/5 flex items-center justify-between">
            <span>NIMC_Lagos_API</span>
            <span className="text-red-400/85 font-sans font-medium text-[9px] bg-red-500/10 px-1.5 py-0.5 rounded">Unstructured</span>
          </div>
          <p className="text-red-300/60">{"<Response>"}</p>
          <p className="pl-3">{"<NIN_Data status=\"01\">"}</p>
          <p className="pl-6 text-neutral-600">{"<firstname>Adebayo</firstname>"}</p>
          <p className="pl-6 text-neutral-600">{"<surname>Onajobi</surname>"}</p>
          <p className="pl-3">{"</NIN_Data>"}</p>
          <p className="text-red-300/60">{"</Response>"}</p>
        </div>
        <div className="pt-3 mt-3 border-t border-white/5">
          <div className="text-neutral-400 font-bold mb-1">NIBSS_BVN_Endpoint</div>
          <p className="text-neutral-600 leading-relaxed font-sans text-[9px]">{"{ \"bvn_status\": \"active\", \"detail\": { \"first_name\": \"Adebayo\" } }"}</p>
        </div>
      </div>

      {/* Normalization Gate */}
      <div className="flex sm:flex-col items-center justify-center gap-2 text-brand-green shrink-0">
        <svg className="w-5 h-5 rotate-90 sm:rotate-0 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
        <span className="text-[9px] uppercase font-mono tracking-wider font-bold">Gateway</span>
      </div>

      {/* Unified Output */}
      <div className="flex-1 rounded-xl bg-neutral-900 border border-white/10 p-4 font-mono text-[10px] overflow-hidden text-neutral-300 relative min-h-[160px]">
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/5 rounded-full blur-xl pointer-events-none" />
        <div className="text-brand-green font-bold mb-2 pb-1 border-b border-white/5 flex items-center justify-between">
          <span>DevhubxAPI Response</span>
          <span className="text-brand-green bg-brand-green/10 px-1.5 py-0.5 rounded font-sans text-[9px]">200 OK</span>
        </div>
        <p className="text-blue-400">{"{"}</p>
        <p className="pl-3"><span className="text-emerald-400">"status"</span>: <span className="text-amber-300">"success"</span>,</p>
        <p className="pl-3"><span className="text-emerald-400">"data"</span>: <span className="text-blue-400">{"{"}</span></p>
        <p className="pl-6"><span className="text-emerald-400">"firstName"</span>: <span className="text-amber-300">"Adebayo"</span>,</p>
        <p className="pl-6"><span className="text-emerald-400">"lastName"</span>: <span className="text-amber-300">"Onajobi"</span></p>
        <p className="pl-3"><span className="text-blue-400">{"}"}</span></p>
        <p className="text-blue-400">{"}"}</p>
      </div>
    </div>
  );
};

// --- Sub-component: Regional Edge Node Latency ---
const EdgeNodeStatuses = () => {
  const [nodes, setNodes] = useState([
    { city: "Lagos Hub", code: "LOS", ping: "2.4ms" },
    { city: "Nairobi Edge", code: "NBO", ping: "3.1ms" },
    { city: "Joburg Hub", code: "JNB", ping: "4.5ms" },
    { city: "London Gate", code: "LHR", ping: "0.8ms" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev =>
        prev.map(node => {
          const current = parseFloat(node.ping);
          const next = (current + (Math.random() * 0.4 - 0.2));
          const bounded = Math.max(0.5, Math.min(10, next));
          return {
            ...node,
            ping: bounded.toFixed(1) + "ms",
          };
        })
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-3 font-sans w-full">
      {nodes.map(node => (
        <div key={node.code} className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors duration-200">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            <div className="text-left">
              <div className="text-xs font-bold text-white leading-none">{node.city}</div>
              <div className="text-[10px] text-neutral-500 font-mono mt-1">{node.code} Node</div>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-brand-green">{node.ping}</span>
        </div>
      ))}
    </div>
  );
};

// --- Sub-component: Sandbox failure simulator ---
const SandboxSimulator = () => {
  const [failureRate, setFailureRate] = useState(0);
  const [latency, setLatency] = useState(40);

  return (
    <div className="flex flex-col gap-4 w-full text-left">
      <div className="p-3.5 rounded-xl bg-white/2 border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-neutral-400">Simulate Latency</span>
          <span className="text-xs font-bold font-mono text-brand-green">{latency}ms</span>
        </div>
        <input
          type="range"
          min="10"
          max="500"
          value={latency}
          onChange={(e) => setLatency(parseInt(e.target.value))}
          className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-green"
        />
      </div>

      <div className="p-3.5 rounded-xl bg-white/2 border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-neutral-400">Failure Rate</span>
          <span className="text-xs font-bold font-mono text-brand-green">{failureRate}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="10"
          value={failureRate}
          onChange={(e) => setFailureRate(parseInt(e.target.value))}
          className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-green"
        />
      </div>

      <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/5 text-[10px] font-mono text-neutral-500">
        <span>Result State:</span>
        <span className={failureRate > 50 ? "text-red-400 font-bold" : "text-brand-green font-bold"}>
          {failureRate > 50 ? "500 Internal Error" : "200 OK"}
        </span>
      </div>
    </div>
  );
};

// --- Sub-component: Real-time Telemetry ---
const TelemetryGraph = () => {
  return (
    <div className="w-full h-full min-h-[160px] relative flex flex-col justify-between">
      {/* Wave chart SVG */}
      <svg className="w-full h-28 overflow-visible mt-2" viewBox="0 0 300 80">
        <defs>
          <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {/* Glow region */}
        <path
          d="M0 70 Q 30 25, 60 45 T 120 20 T 180 55 T 240 30 T 300 40 L 300 80 L 0 80 Z"
          fill="url(#chartGlow)"
        />
        {/* Chart line */}
        <path
          d="M0 70 Q 30 25, 60 45 T 120 20 T 180 55 T 240 30 T 300 40"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-90"
        />
        {/* Glowing node point */}
        <circle cx="120" cy="20" r="4" fill="#10b981" />
        <circle cx="120" cy="20" r="9" fill="none" stroke="#10b981" strokeWidth="1" className="animate-ping" />
      </svg>

      <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-4 text-[10px] text-neutral-500 font-mono">
        <span>Live Stream</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
          Gateway Telemetry: 284 rps
        </span>
        <span>100% telemetry</span>
      </div>
    </div>
  );
};

export default memo(function Features() {
  return (
    <section id="features" className="bg-black py-24 sm:py-32 select-none border-b border-white/5 relative overflow-hidden">
      {/* Wave Dot Animation background */}
      <DotWaveBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
            Gateway Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3 mb-6">
            Unified Node Architecture
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            Eliminate vendor spaghetti. All regional payment, authentication, and logistics services flow through a robust, low-latency edge network.
          </p>
        </FadeUp>

        {/* Bento Grid Redesign */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-7xl mx-auto">
          
          {/* Card 1: Raw vs Unified Schema Normalization (Double Column) */}
          <div className="md:col-span-2 rounded-2xl border border-white/5 bg-neutral-900/40 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-white/10 hover:bg-neutral-900/50">
            <div className="text-left mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green font-mono">Normalization</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 mb-2">Unified Schema Normalization</h3>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
                One response contract. We handle auth token management, rate limit buffering, and structure variations across NIMC, NIBSS, and MTN into a single clean JSON endpoint.
              </p>
            </div>
            <div className="mt-auto">
              <RawVSUnified />
            </div>
          </div>

          {/* Card 2: Distributed Edge Nodes (Single Column) */}
          <div className="md:col-span-1 rounded-2xl border border-white/5 bg-neutral-900/40 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-white/10 hover:bg-neutral-900/50">
            <div className="text-left mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green font-mono">Multi-Cloud Routing</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 mb-2">Regional Edge Nodes</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Requests are auto-routed to co-located instances closest to local vendor centers for minimal latency.
              </p>
            </div>
            <div className="mt-auto">
              <EdgeNodeStatuses />
            </div>
          </div>

          {/* Card 3: Isolated Sandbox Corridor (Single Column) */}
          <div className="md:col-span-1 rounded-2xl border border-white/5 bg-neutral-900/40 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-white/10 hover:bg-neutral-900/50">
            <div className="text-left mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green font-mono">Staging Corridor</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 mb-2">Staging Sandbox</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Simulate arbitrary response delays, webhook retry codes, and rate-limiting blocks in absolute safety.
              </p>
            </div>
            <div className="mt-auto">
              <SandboxSimulator />
            </div>
          </div>

          {/* Card 4: Live Telemetry Stream (Double Column) */}
          <div className="md:col-span-2 rounded-2xl border border-white/5 bg-neutral-900/40 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-white/10 hover:bg-neutral-900/50">
            <div className="text-left mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green font-mono">Granular Metrics</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 mb-2">Granular Telemetry Stream</h3>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
                Access full logs of payload histories, response codes, and roundtrip times directly in your developer dashboard.
              </p>
            </div>
            <div className="mt-auto w-full">
              <TelemetryGraph />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
});
