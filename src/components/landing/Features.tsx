"use client";

import React, { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/lib/motion";
import DotWaveBackground from "@/components/landing/DotWaveBackground";

type NodeItem = {
  id: number;
  title: string;
  short: string;
  description: string;
  status: string;
  latency: string;
  reliability: string;
  x: number; // Percent position in SVG
  y: number;
  icon: React.ReactNode;
};

const nodesList: NodeItem[] = [
  {
    id: 0,
    title: "Regional Identity Hub",
    short: "Identity",
    description: "Instant connections to local biometric, NIN, and BVN database endpoints with edge verification.",
    status: "Active",
    latency: "4.2ms",
    reliability: "99.99%",
    x: 20,
    y: 25,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: 1,
    title: "Mobile Payouts Engine",
    short: "Payments",
    description: "Direct routing to local carrier APIs, mobile money corridors, and instant bank disbursement channels.",
    status: "Active",
    latency: "2.8ms",
    reliability: "99.98%",
    x: 80,
    y: 25,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Distributed Edge Nodes",
    short: "SLA / Infrastructure",
    description: "Edge-distributed server nodes running in global centers for high availability and low latency routing.",
    status: "Optimal",
    latency: "1.1ms",
    reliability: "99.999%",
    x: 15,
    y: 75,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Isolated Sandbox Corridor",
    short: "Staging Sandbox",
    description: "Simulate failure modes, synthetic response latency, and webhook retries before deploying code.",
    status: "Staging",
    latency: "8.5ms",
    reliability: "100.0%",
    x: 85,
    y: 75,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Granular Telemetry Stream",
    short: "Telemetry Analytics",
    description: "High-resolution tracking of response payloads, error rate distributions, and API performance telemetry.",
    status: "Streaming",
    latency: "Real-time",
    reliability: "99.99%",
    x: 50,
    y: 12,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm9-7h2a2 2 0 012 2v5a2 2 0 01-2 2h-2a2 2 0 01-2-2v-5a2 2 0 012-2z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "OpenAPI Documentation Nodes",
    short: "Documentation & SDKs",
    description: "Dynamic developer playgrounds, OpenAPI standard schemas, and SDK wrappers for all primary runtimes.",
    status: "Updated",
    latency: "Static",
    reliability: "100.0%",
    x: 50,
    y: 88,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

export default memo(function Features() {
  const [activeNode, setActiveNode] = useState<number>(0);
  const [pulseKey, setPulseKey] = useState(0);

  // Trigger automated light visual pulses along connection lines
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseKey((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="features" className="bg-black py-24 sm:py-32 select-none border-b border-white/5 relative overflow-hidden">
      {/* Dynamic Animated wave background */}
      <DotWaveBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <FadeUp className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
            Gateway Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3 mb-6">
            Unified Node Architecture
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            All regional payment, authentication, and compliance queries flow through a single edge gateway. Hover nodes below to inspect network connections.
          </p>
        </FadeUp>

        {/* Minimal Node Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Interactive SVG Node Graph */}
          <div className="lg:col-span-7 flex justify-center items-center relative aspect-square max-w-[500px] mx-auto w-full border border-white/5 rounded-2xl bg-neutral-950/40 backdrop-blur-md p-6">
            
            {/* Base SVG for Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Connecting paths from each satellite node to center gateway hub */}
              {nodesList.map((node) => {
                const isActive = activeNode === node.id;
                return (
                  <g key={`link-${node.id}`}>
                    {/* Underlying static connector line */}
                    <line
                      x1={node.x}
                      y1={node.y}
                      x2={50}
                      y2={50}
                      stroke={isActive ? "rgba(16, 185, 129, 0.4)" : "rgba(255, 255, 255, 0.05)"}
                      strokeWidth={isActive ? "1.5" : "1"}
                      className="transition-colors duration-300"
                    />

                    {/* Glowing routing packet pulse */}
                    <motion.circle
                      key={`pulse-${node.id}-${pulseKey}`}
                      r="1.2"
                      fill="#10b981"
                      className="shadow-sm"
                      initial={{ cx: node.x, cy: node.y }}
                      animate={{ cx: 50, cy: 50 }}
                      transition={{
                        duration: 1.5,
                        delay: node.id * 0.25,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Central Gateway Node Hub */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full border border-brand-green/30 bg-neutral-900 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                {/* Gateway pulse ripple ring */}
                <span className="absolute inset-0 rounded-full border border-brand-green/40 animate-ping opacity-25" />
                
                {/* Logo emblem */}
                <span className="text-white font-black text-sm tracking-tight">
                  DH<span className="text-brand-green">x</span>
                </span>
              </div>
              <span className="mt-2 text-[10px] uppercase font-mono tracking-widest text-neutral-500 font-bold">Edge Hub</span>
            </div>

            {/* Satellites */}
            {nodesList.map((node) => {
              const isActive = activeNode === node.id;
              return (
                <button
                  key={node.id}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onClick={() => setActiveNode(node.id)}
                  className={`absolute z-20 p-3 rounded-xl border backdrop-blur-md transition-all duration-300 flex items-center justify-center cursor-pointer ${
                    isActive
                      ? "border-brand-green bg-neutral-900 text-brand-green shadow-[0_0_15px_rgba(16,185,129,0.1)] scale-110"
                      : "border-white/5 bg-neutral-950/60 text-neutral-400 hover:border-white/20 hover:text-white"
                  }`}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  {node.icon}
                </button>
              );
            })}
          </div>

          {/* Right Side: Minimal detail specifications */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col gap-6"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green font-mono">
                    Node Specs • 0{nodesList[activeNode].id}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-4 leading-tight">
                    {nodesList[activeNode].title}
                  </h3>
                  <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                    {nodesList[activeNode].description}
                  </p>
                </div>

                {/* Micro specs table grid */}
                <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6 mt-2">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-600 font-mono font-bold block">Status</span>
                    <span className="text-sm font-semibold text-white mt-1 flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        nodesList[activeNode].status === "Active" || nodesList[activeNode].status === "Optimal"
                          ? "bg-brand-green animate-pulse"
                          : "bg-cyan-400"
                      }`} />
                      {nodesList[activeNode].status}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-600 font-mono font-bold block">Avg. Ping</span>
                    <span className="text-sm font-semibold text-emerald-400 mt-1 font-mono">
                      {nodesList[activeNode].latency}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-600 font-mono font-bold block">Reliability</span>
                    <span className="text-sm font-semibold text-white mt-1 font-mono">
                      {nodesList[activeNode].reliability}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
});
