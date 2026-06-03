"use client";

import React, { memo, useState, useEffect } from "react";
import { BlurFadeUp, FadeUp, FadeIn, SlideIn } from "@/lib/motion";
import DotWaveBackground from "@/components/landing/DotWaveBackground";

// ─── CountUp (memoized) ───
const CountUp = memo(function CountUp({
  end,
  duration = 1800,
  format,
}: {
  end: number;
  duration?: number;
  format: (val: number) => string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const pct = Math.min(progress / duration, 1);
      const ease = pct * (2 - pct);
      setCount(Math.floor(ease * end));
      if (progress < duration) requestAnimationFrame(animate);
      else setCount(end);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{format(count)}</span>;
});

// ─── StatItem (memoized) ───
const StatItem = memo(function StatItem({
  end,
  format,
  label,
}: {
  end: number;
  format: (val: number) => string;
  label: string;
}) {
  return (
    <div>
      <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1.5 tabular-nums">
        <CountUp end={end} format={format} />
      </div>
      <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
        {label}
      </div>
    </div>
  );
});

// ─── CodeConsole (memoized) ───
const CodeConsole = memo(function CodeConsole() {
  const requestString = "curl -X GET https://api.devhubx.com/v1/endpoints";
  const [typedText, setTypedText] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let charIndex = 0;
    const typeChar = () => {
      if (charIndex <= requestString.length) {
        setTypedText(requestString.slice(0, charIndex));
        charIndex++;
        timer = setTimeout(typeChar, 40);
      } else {
        timer = setTimeout(() => setShowResponse(true), 1500);
      }
    };
    timer = setTimeout(typeChar, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-lg rounded-xl border border-white/10 bg-neutral-950/60 backdrop-blur-xl shadow-2xl shadow-black/90 overflow-hidden text-left">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-neutral-900/40">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
        </div>
        <div className="text-xs font-mono text-neutral-500 select-none">devhub-cli</div>
        <div className="w-10" />
      </div>

      {/* Content Area */}
      <div className="p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto min-h-[260px] flex flex-col justify-between">
        <div>
          <span className="text-brand-green select-none">$ </span>
          <span className="text-white whitespace-pre-wrap">{typedText}</span>
          <span className="inline-block w-1.5 h-4 ml-0.5 bg-brand-green animate-pulse" />
        </div>

        <div
          className={`mt-6 border-t border-white/5 pt-4 transition-all duration-700 ease-in-out ${
            showResponse ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          <div className="text-neutral-600 text-[10px] uppercase tracking-wider mb-2 select-none">// HTTP/1.1 200 OK</div>
          <pre className="text-emerald-400">
{`{
  "status": "success",
  "endpoints": [
    { "path": "/v1/users", "status": "active" },
    { "path": "/v1/payments", "status": "active" },
    { "path": "/v1/auth", "status": "active" }
  ]
}`}
          </pre>
        </div>
      </div>
    </div>
  );
});

// ─── Hero (default export) ───
export default memo(function Hero() {
  const headline = "Connect your APIs. Deploy in seconds.";
  const words = headline.split(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-20">
      {/* Wave Dot Animation background */}
      <DotWaveBackground />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] md:w-[600px] h-[450px] rounded-full bg-brand-green/5 blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* Left Column */}
        <SlideIn direction="left" className="lg:col-span-7 text-left flex flex-col justify-center">
          {/* Headline (word-by-word fade up) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            {words.map((word, idx) => (
              <span
                key={idx}
                className="inline-block animate-fade-up-word"
                style={{ animationDelay: `${idx * 85}ms` }}
              >
                {word}&nbsp;
              </span>
            ))}
          </h1>

          <FadeUp delay={0.4}>
            <p className="text-base sm:text-lg text-neutral-400 font-medium mb-10 max-w-xl">
              The developer hub to proxy, analyze, and scale your API endpoints.
            </p>
          </FadeUp>

          <FadeUp delay={0.55}>
            <div className="flex flex-row items-center gap-4 mb-14">
              <button className="px-6 py-3 rounded-lg text-sm font-semibold text-neutral-950 bg-brand-green hover:bg-emerald-400 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5 animate-pulse-glow cursor-pointer">
                Explore APIs
              </button>
              <button className="px-6 py-3 rounded-lg text-sm font-semibold text-white border border-white hover:bg-white hover:text-neutral-950 transition-all duration-200 cursor-pointer">
                Read docs
              </button>
            </div>
          </FadeUp>

          <FadeUp delay={0.7}>
            <div className="border-t border-white/10 pt-8 grid grid-cols-3 gap-6 sm:gap-8 max-w-md">
              <StatItem end={825} format={(v) => `${v}M+`} label="Monthly requests" />
              <StatItem end={9998} format={(v) => `${(v / 100).toFixed(2)}%`} label="Uptime SLA" />
              <StatItem end={8} format={(v) => `< 0.${v}ms`} label="Edge latency" />
            </div>
          </FadeUp>
        </SlideIn>

        {/* Right Column */}
        <SlideIn direction="right" delay={0.3} className="lg:col-span-5 w-full flex items-center justify-center">
          <CodeConsole />
        </SlideIn>

      </div>
    </section>
  );
});
