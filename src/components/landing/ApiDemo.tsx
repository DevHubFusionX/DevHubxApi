"use client";

import React, { useState, useEffect } from "react";
import DotWaveBackground from "@/components/landing/DotWaveBackground";

type Endpoint = {
  name: string;
  method: "POST" | "GET";
  path: string;
  headers: Record<string, string>;
  body: string | null;
  response: string;
  latency: number;
};

const endpoints: Endpoint[] = [
  {
    name: "Verify NIN",
    method: "GET",
    path: "/v1/verify/nin/23408102392",
    headers: { Authorization: "Bearer dev_live_9f8a2b••••" },
    body: null,
    response: JSON.stringify({
      status: "valid",
      firstName: "Frank",
      lastName: "Obi",
      lga: "Eti-Osa",
      state: "Lagos",
      verificationId: "tx_9201a0fc",
    }, null, 2),
    latency: 4.2,
  },
  {
    name: "M-Pesa Payout",
    method: "POST",
    path: "/v1/payments/mpesa/send",
    headers: {
      Authorization: "Bearer dev_live_9f8a2b••••",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: "+254712345678",
      amount: 5000,
      currency: "KES",
      reference: "order_8821",
    }, null, 2),
    response: JSON.stringify({
      status: "queued",
      transactionId: "mp_tx_0094f2",
      estimatedSettlement: "< 3s",
      fee: "KES 12.50",
    }, null, 2),
    latency: 6.8,
  },
  {
    name: "Address Geocode",
    method: "POST",
    path: "/v1/address/geocode",
    headers: {
      Authorization: "Bearer dev_live_9f8a2b••••",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: "12 Admiralty Way, Lekki Phase 1",
      country: "NG",
    }, null, 2),
    response: JSON.stringify({
      status: "resolved",
      formatted: "12 Admiralty Way, Lekki Phase 1, Lagos",
      coordinates: { lat: 6.4281, lng: 3.4219 },
      confidence: 0.97,
    }, null, 2),
    latency: 3.1,
  },
  {
    name: "Bank Resolve",
    method: "GET",
    path: "/v1/bank/resolve?account=0123456789&bank=058",
    headers: { Authorization: "Bearer dev_live_9f8a2b••••" },
    body: null,
    response: JSON.stringify({
      status: "success",
      accountName: "FRANK OBI",
      bankName: "Guaranty Trust Bank",
      bankCode: "058",
      verified: true,
    }, null, 2),
    latency: 2.9,
  },
];

export default function ApiDemo() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [showResponse, setShowResponse] = useState(true);
  const [elapsedMs, setElapsedMs] = useState(0);

  const active = endpoints[activeIdx];

  const handleSend = () => {
    setShowResponse(false);
    setIsSending(true);
    setElapsedMs(0);

    // Simulate elapsed time ticking
    const start = Date.now();
    const ticker = setInterval(() => {
      setElapsedMs(Date.now() - start);
    }, 50);

    setTimeout(() => {
      clearInterval(ticker);
      setElapsedMs(Math.round(active.latency * 100) / 100);
      setIsSending(false);
      setShowResponse(true);
    }, 800 + Math.random() * 400);
  };

  const handleSelectEndpoint = (idx: number) => {
    if (idx === activeIdx) return;
    setShowResponse(false);
    setActiveIdx(idx);
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  // Auto-send on mount
  useEffect(() => {
    handleSend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="playground" className="bg-neutral-950 py-24 sm:py-32 relative overflow-hidden border-y border-white/5 select-none">
      {/* Wave Dot Animation background */}
      <DotWaveBackground />

      {/* Background decorations */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-brand-green/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
            Live Playground
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3 mb-6">
            Try the API before you integrate
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            Select an endpoint, hit send, and watch real responses stream back from our edge network.
          </p>
        </div>

        {/* Endpoint Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {endpoints.map((ep, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectEndpoint(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeIdx === idx
                  ? "bg-neutral-800 border-neutral-700 text-white shadow-sm"
                  : "bg-transparent border-white/5 text-neutral-500 hover:border-white/10 hover:text-neutral-300"
              }`}
            >
              <span className={`font-bold font-mono text-[10px] px-1.5 py-0.5 rounded ${
                ep.method === "GET" ? "bg-blue-500/15 text-blue-400" : "bg-purple-500/15 text-purple-400"
              }`}>
                {ep.method}
              </span>
              {ep.name}
            </button>
          ))}
        </div>

        {/* Main Playground Panel */}
        <div className="rounded-2xl border border-white/5 bg-neutral-900/30 shadow-2xl overflow-hidden">

          {/* Top URL Bar */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/5 bg-neutral-900/60">
            <span className={`font-mono font-bold text-xs px-2 py-1 rounded ${
              active.method === "GET" ? "bg-blue-500/15 text-blue-400" : "bg-purple-500/15 text-purple-400"
            }`}>
              {active.method}
            </span>
            <div className="flex-1 bg-neutral-950 rounded-lg px-4 py-2 font-mono text-xs text-neutral-400 border border-white/5 truncate">
              https://api.devhubxapi.com<span className="text-white font-semibold">{active.path}</span>
            </div>
            <button
              onClick={handleSend}
              disabled={isSending}
              className="px-5 py-2 rounded-lg text-xs font-bold bg-brand-green text-neutral-950 hover:bg-emerald-400 disabled:opacity-50 transition-all duration-200 cursor-pointer shadow-md shadow-emerald-500/10 flex items-center gap-2"
            >
              {isSending ? (
                <>
                  <span className="w-3 h-3 border-2 border-neutral-950/30 border-t-neutral-950 rounded-full animate-spin" />
                  Sending
                </>
              ) : (
                <>Send &rarr;</>
              )}
            </button>
          </div>

          {/* Split Panel: Request | Response */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/5 min-h-[380px]">

            {/* Request Panel */}
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Request</span>
                <span className="text-[10px] font-mono text-neutral-600">HTTP/1.1</span>
              </div>

              {/* Headers */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-2">Headers</div>
                <div className="bg-neutral-950 rounded-lg border border-white/5 p-4 font-mono text-xs flex flex-col gap-1.5">
                  {Object.entries(active.headers).map(([key, val]) => (
                    <div key={key}>
                      <span className="text-cyan-400">{key}</span>
                      <span className="text-neutral-600">: </span>
                      <span className="text-neutral-400">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Body (if POST) */}
              {active.body && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-2">Body</div>
                  <div className="bg-neutral-950 rounded-lg border border-white/5 p-4 font-mono text-xs overflow-x-auto">
                    <pre className="text-amber-300/80 whitespace-pre-wrap">{active.body}</pre>
                  </div>
                </div>
              )}

              {!active.body && (
                <div className="flex-1 flex items-center justify-center text-neutral-700 text-xs font-mono italic">
                  No request body (GET request)
                </div>
              )}
            </div>

            {/* Response Panel */}
            <div className="p-6 flex flex-col gap-4 relative">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Response</span>
                
                {/* Status badge & latency */}
                {showResponse && !isSending && (
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-neutral-500 tabular-nums">
                      {active.latency}ms
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      200 OK
                    </span>
                  </div>
                )}
              </div>

              {/* Loading State */}
              {isSending && (
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-2 border-neutral-800 border-t-brand-green rounded-full animate-spin" />
                  <span className="text-neutral-500 text-xs font-mono tabular-nums">
                    {elapsedMs < 100 ? `${elapsedMs}ms` : `${(elapsedMs / 1000).toFixed(1)}s`}
                  </span>
                </div>
              )}

              {/* Response Body */}
              {showResponse && !isSending && (
                <div className={`transition-all duration-500 ease-out ${showResponse ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                  <div className="bg-neutral-950 rounded-lg border border-white/5 p-4 font-mono text-xs overflow-x-auto">
                    <pre className="text-emerald-400 whitespace-pre-wrap">{active.response}</pre>
                  </div>

                  {/* Response metadata bar */}
                  <div className="flex items-center gap-4 mt-3 text-[10px] text-neutral-600 font-mono">
                    <span>content-type: application/json</span>
                    <span>•</span>
                    <span>edge-node: lagos-ng-01</span>
                    <span>•</span>
                    <span>tls: 1.3</span>
                  </div>
                </div>
              )}

              {/* Empty state before first send */}
              {!showResponse && !isSending && (
                <div className="flex-1 flex items-center justify-center text-neutral-700 text-xs font-mono italic">
                  Hit &quot;Send&quot; to execute request
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
