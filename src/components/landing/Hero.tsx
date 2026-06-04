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

// ─── Quick Links ───
const quickLinks = [
  {
    label: "Read docs",
    href: "#docs",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    label: "Pricing",
    href: "#pricing",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    label: "API catalog",
    href: "#apis",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
];

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
          <div className="text-center mb-10">
            {/* One-liner */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-white leading-[1.12] mb-4">
              One API for payments, identity
              <br className="hidden sm:block" />
              <span className="text-brand-green">&nbsp;& infrastructure</span> across Africa
            </h1>

            <p className="text-neutral-400 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Proxy, aggregate, and orchestrate 40+ regional APIs through a single RESTful endpoint.
              <br className="hidden sm:block" />
              Ship in minutes, not months.
            </p>
          </div>
        </FadeUp>

        {/* ── CTA Row ── */}
        <FadeUp delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
            <button
              id="hero-get-api-key"
              onClick={() => openAuthModal("signup")}
              className="group px-7 py-3 rounded-lg text-sm font-bold text-neutral-950 bg-brand-green hover:bg-emerald-400 shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              Get API key
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            {/* Quick links */}
            <div className="flex items-center gap-1">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-[13px] font-medium text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-all duration-200"
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ── Terminal ── */}
        <FadeUp delay={0.35}>
          <div className="w-full max-w-3xl mx-auto">
            <TerminalConsole />
          </div>
        </FadeUp>

        {/* ── Trust Strip ── */}
        <FadeUp delay={0.55}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] font-mono text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-brand-green/60" />
              <span><span className="text-neutral-300 font-semibold">3.2ms</span> avg latency</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-brand-green/60" />
              <span><span className="text-neutral-300 font-semibold">99.98%</span> uptime SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-brand-green/60" />
              <span><span className="text-neutral-300 font-semibold">1,000</span> free reqs/mo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-brand-green/60" />
              <span>SOC 2 compliant</span>
            </div>
          </div>
        </FadeUp>

      </div>

      {/* Bottom spacer for vertical centering */}
      <div className="flex-1 min-h-[60px]" />
    </section>
  );
});
