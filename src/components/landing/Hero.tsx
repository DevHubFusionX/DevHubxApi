"use client";

import React, { memo, useState, useEffect, useCallback } from "react";
import { FadeUp, SlideIn } from "@/lib/motion";
import { openAuthModal } from "@/lib/auth-trigger";
import DotWaveBackground from "@/components/landing/DotWaveBackground";

// ─── Copy Button ───
const CopyButton = memo(function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md text-neutral-500 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
      title="Copy to clipboard"
    >
      {copied ? (
        <svg className="w-3.5 h-3.5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
});

// ─── Terminal Console ───
const curlCommand = `curl -X GET "https://api.devhubx.com/v1/payments/txn_29f3" \\
  -H "Authorization: Bearer dhx_sk_live_...a1b2"`;

const curlOneLiner = `curl -X GET "https://api.devhubx.com/v1/payments/txn_29f3" -H "Authorization: Bearer dhx_sk_live_...a1b2"`;

const jsonResponse = `{
  "id": "txn_29f3",
  "status": "completed",
  "amount": 4500,
  "currency": "USD",
  "merchant": "acme_corp",
  "created_at": "2026-06-03T14:22:08Z",
  "latency_ms": 3.2
}`;

const TerminalConsole = memo(function TerminalConsole() {
  const [typedChars, setTypedChars] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const displayText = curlOneLiner;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let idx = 0;
    const typeChar = () => {
      if (idx <= displayText.length) {
        setTypedChars(idx);
        idx++;
        timer = setTimeout(typeChar, 22);
      } else {
        timer = setTimeout(() => setShowResponse(true), 600);
      }
    };
    timer = setTimeout(typeChar, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full rounded-xl border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="text-[11px] font-mono text-neutral-500 select-none tracking-wide">terminal</div>
        <CopyButton text={curlOneLiner} />
      </div>

      {/* Request */}
      <div className="px-5 pt-5 pb-3 font-mono text-[13px] leading-relaxed">
        <div className="flex items-start gap-2">
          <span className="text-brand-green select-none shrink-0">$</span>
          <div className="min-w-0">
            <span className="text-white/90 break-all">{displayText.slice(0, typedChars)}</span>
            <span
              className={`inline-block w-[7px] h-[15px] ml-0.5 bg-brand-green align-middle ${
                typedChars < displayText.length ? "animate-pulse" : showResponse ? "opacity-0" : "animate-pulse"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Response */}
      <div
        className={`border-t border-white/[0.04] transition-all duration-500 ease-out ${
          showResponse
            ? "opacity-100 max-h-[400px] py-4 px-5"
            : "opacity-0 max-h-0 py-0 px-5 overflow-hidden"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
              HTTP/1.1 200 OK
            </span>
            <span className="text-[10px] font-mono text-neutral-600">
              · 3.2ms
            </span>
          </div>
          <CopyButton text={jsonResponse} />
        </div>
        <pre className="font-mono text-[13px] leading-[1.65] text-emerald-400/90 overflow-x-auto">
          {jsonResponse}
        </pre>
      </div>
    </div>
  );
});

// ─── Hero (default export) ───
export default memo(function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col bg-black overflow-hidden"
    >
      {/* Background */}
      <DotWaveBackground />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-brand-green/[0.04] blur-[140px] pointer-events-none" />

      {/* Spacer to push content to visual center — accounts for navbar height */}
      <div className="flex-1 min-h-[140px]" />

      <div className="w-full max-w-5xl mx-auto px-6 flex flex-col items-center">

        {/* ── Headline Row ── */}
        <FadeUp delay={0.05}>
          <div className="text-center mb-8 max-w-4xl mx-auto">
            {/* One-liner */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              Stop maintaining <span className="text-brand-green">12 separate integrations</span>.
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-200 mb-6 leading-snug max-w-3xl mx-auto">
              One key for NIN, BVN, mobile money, and logistics across Africa.
            </p>

            <p className="text-neutral-400 text-sm sm:text-base md:text-lg font-medium max-w-3xl mx-auto leading-relaxed">
              Most African fintechs wire together NIMC, NIBSS, MTN MoMo, Airtel, Flutterwave, and 7 others by hand — each with its own auth, schema, and rate limit. DevhubxAPI normalises all of them into a single endpoint so your team ships features, not plumbing.
            </p>
          </div>
        </FadeUp>

        {/* ── CTA Row ── */}
        <FadeUp delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full">
            <button
              id="hero-get-api-key"
              onClick={() => openAuthModal("signup")}
              className="w-full sm:w-auto group px-8 py-3.5 rounded-lg text-sm font-bold text-neutral-950 bg-brand-green hover:bg-emerald-400 shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              Get API key — free
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <a
              href="#playground"
              className="w-full sm:w-auto group px-8 py-3.5 rounded-lg text-sm font-bold text-neutral-300 bg-white/4 border border-white/8 hover:text-white hover:bg-white/8 hover:border-white/15 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              See live playground
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </FadeUp>

        {/* ── Terminal ── */}
        <FadeUp delay={0.35}>
          <div className="w-full max-w-3xl mx-auto">
            <TerminalConsole />
          </div>
        </FadeUp>

        {/* ── Metrics Grid ── */}
        <FadeUp delay={0.5}>
          <div className="w-full max-w-4xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { value: "2,847,291", label: "API calls this month" },
              { value: "4.2ms", label: "avg gateway latency" },
              { value: "99.98%", label: "uptime, last 90 days" },
              { value: "40+", label: "regional APIs unified" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-xl border border-white/6 bg-white/2 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-brand-green/30 hover:bg-white/4"
              >
                {/* Accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-brand-green/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

      </div>

      {/* Bottom spacer for vertical centering */}
      <div className="flex-1 min-h-[60px]" />
    </section>
  );
});
