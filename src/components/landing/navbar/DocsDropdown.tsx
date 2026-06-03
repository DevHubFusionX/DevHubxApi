"use client";

import React, { memo, useState } from "react";

type Language = "curl" | "node" | "python";

export default memo(function DocsDropdown() {
  const [selectedLang, setSelectedLang] = useState<Language>("curl");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const snippets = {
    curl: `curl -X POST https://api.devhubx.com/v1/verify/nin \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -d '{"nin": "123456789"}'`,
    node: `import { Devhub } from "@devhubx/sdk";
const sdk = new Devhub({ apiKey: "YOUR_KEY" });
const res = await sdk.verify.nin("123456789");`,
    python: `from devhubx import Devhub
client = Devhub(api_key="YOUR_KEY")
res = client.verify.nin("123456789")`
  };

  return (
    <div className="flex flex-col text-left font-sans select-none">
      <div className="grid grid-cols-12 gap-8">

        {/* Left column — Getting Started */}
        <div className="col-span-4 flex flex-col gap-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1 px-1">
            Getting Started
          </span>

          <a 
            href="#docs" 
            className="group flex items-start gap-4 p-3 rounded-xl border border-white/[0.02] bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/[0.02] to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 flex items-center justify-center text-brand-green group-hover:scale-110 group-hover:border-emerald-400/50 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.2)] transition-all duration-300 shrink-0">
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white group-hover:text-brand-green transition-colors duration-200 flex items-center gap-1.5">
                Quickstart
                <svg className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="text-xs text-neutral-400 mt-1 leading-relaxed">Ship your first integration in under 5 minutes.</span>
            </div>
          </a>

          <a 
            href="#docs" 
            className="group flex items-start gap-4 p-3 rounded-xl border border-white/[0.02] bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/[0.02] to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 flex items-center justify-center text-brand-green group-hover:scale-110 group-hover:border-emerald-400/50 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.2)] transition-all duration-300 shrink-0">
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white group-hover:text-brand-green transition-colors duration-200 flex items-center gap-1.5">
                API Reference
                <svg className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="text-xs text-neutral-400 mt-1 leading-relaxed">Full endpoint docs, params, and response schemas.</span>
            </div>
          </a>

          <a 
            href="#docs" 
            className="group flex items-start gap-4 p-3 rounded-xl border border-white/[0.02] bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/[0.02] to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 flex items-center justify-center text-brand-green group-hover:scale-110 group-hover:border-emerald-400/50 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.2)] transition-all duration-300 shrink-0">
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white group-hover:text-brand-green transition-colors duration-200 flex items-center gap-1.5">
                Authentication
                <svg className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="text-xs text-neutral-400 mt-1 leading-relaxed">API keys, OAuth flows, and token management.</span>
            </div>
          </a>
        </div>

        {/* Center column — SDKs & Tools */}
        <div className="col-span-4 border-l border-white/10 pl-6 flex flex-col gap-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1 px-1">
            SDKs &amp; Tools
          </span>

          <div 
            onClick={() => copyToClipboard("npm install @devhubx/sdk", "js")}
            className="group flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#3C873A]/10 border border-[#3C873A]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                <span className="text-xs font-black text-[#3C873A]">JS</span>
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-200 group-hover:text-white transition-colors duration-200 block">Node.js SDK</span>
                <span className="text-[10px] text-neutral-500 font-mono block leading-relaxed mt-0.5">npm install @devhubx/sdk</span>
              </div>
            </div>
            <div className="text-[10px] text-neutral-500 group-hover:text-neutral-300 font-medium transition-colors duration-200 pr-1 flex items-center gap-1">
              {copiedText === "js" ? (
                <span className="text-brand-green font-bold">Copied!</span>
              ) : (
                <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              )}
            </div>
          </div>

          <div 
            onClick={() => copyToClipboard("pip install devhubx", "py")}
            className="group flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#3776AB]/10 border border-[#3776AB]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                <span className="text-xs font-black text-[#3776AB]">Py</span>
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-200 group-hover:text-white transition-colors duration-200 block">Python SDK</span>
                <span className="text-[10px] text-neutral-500 font-mono block leading-relaxed mt-0.5">pip install devhubx</span>
              </div>
            </div>
            <div className="text-[10px] text-neutral-500 group-hover:text-neutral-300 font-medium transition-colors duration-200 pr-1 flex items-center gap-1">
              {copiedText === "py" ? (
                <span className="text-brand-green font-bold">Copied!</span>
              ) : (
                <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              )}
            </div>
          </div>

          <div 
            onClick={() => copyToClipboard("go get devhubx.api/go", "go")}
            className="group flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00ADD8]/10 border border-[#00ADD8]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                <span className="text-xs font-black text-[#00ADD8]">Go</span>
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-200 group-hover:text-white transition-colors duration-200 block">Go Module</span>
                <span className="text-[10px] text-neutral-500 font-mono block leading-relaxed mt-0.5">go get devhubx.api/go</span>
              </div>
            </div>
            <div className="text-[10px] text-neutral-500 group-hover:text-neutral-300 font-medium transition-colors duration-200 pr-1 flex items-center gap-1">
              {copiedText === "go" ? (
                <span className="text-brand-green font-bold">Copied!</span>
              ) : (
                <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              )}
            </div>
          </div>

          <div 
            onClick={() => copyToClipboard("curl -X POST https://api.devhubx.com/v1/verify/nin", "curl_sdk")}
            className="group flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-200 group-hover:text-white transition-colors duration-200 block">REST / cURL</span>
                <span className="text-[10px] text-neutral-500 block leading-relaxed mt-0.5">Raw HTTP API examples</span>
              </div>
            </div>
            <div className="text-[10px] text-neutral-500 group-hover:text-neutral-300 font-medium transition-colors duration-200 pr-1 flex items-center gap-1">
              {copiedText === "curl_sdk" ? (
                <span className="text-brand-green font-bold">Copied!</span>
              ) : (
                <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Right column — Interactive Sandbox */}
        <div className="col-span-4 border-l border-white/10 pl-6 flex flex-col gap-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1 px-1">
            Sandbox Playground
          </span>

          <div className="bg-neutral-900/60 rounded-xl p-4 border border-white/5 flex flex-col gap-4 relative overflow-hidden">
            {/* Tiny tab switcher for languages inside the playground */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex gap-2">
                {(["curl", "node", "python"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-2 py-1 rounded text-[10px] font-mono transition-all duration-200 ${
                      selectedLang === lang 
                        ? "bg-brand-green/10 text-brand-green font-bold border border-brand-green/20" 
                        : "text-neutral-400 hover:text-neutral-200 border border-transparent"
                    }`}
                  >
                    {lang === "curl" ? "cURL" : lang === "node" ? "Node" : "Python"}
                  </button>
                ))}
              </div>

              <button
                onClick={() => copyToClipboard(snippets[selectedLang], selectedLang)}
                className="text-[10px] text-neutral-500 hover:text-neutral-300 font-mono transition-colors duration-200 flex items-center gap-1"
              >
                {copiedText === selectedLang ? (
                  <span className="text-brand-green font-bold">Copied!</span>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Simulated interactive IDE card */}
            <div className="bg-neutral-950 rounded-lg p-3 border border-white/5 font-mono text-[9px] leading-relaxed min-h-[92px] max-h-[92px] overflow-auto flex flex-col justify-between">
              <pre className="text-neutral-300 whitespace-pre-wrap selection:bg-brand-green/20">
                {selectedLang === "curl" && (
                  <>
                    <span className="text-neutral-500">curl -X POST</span> <span className="text-brand-green">https://api.devhubx.com/v1/verify/nin</span> \<br />
                    {"  "}-H <span className="text-amber-400">&quot;Authorization: Bearer YOUR_KEY&quot;</span> \<br />
                    {"  "}-d <span className="text-purple-400">&apos;{"{"}&quot;nin&quot;: &quot;123456789&quot;{"}"}&apos;</span>
                  </>
                )}
                {selectedLang === "node" && (
                  <>
                    <span className="text-purple-400">import</span> {"{"} <span className="text-blue-400">Devhub</span> {"}"} <span className="text-purple-400">from</span> <span className="text-amber-400">&quot;@devhubx/sdk&quot;</span>;<br />
                    <span className="text-purple-400">const</span> sdk = <span className="text-purple-400">new</span> <span className="text-emerald-400">Devhub</span>({"{"} apiKey: <span className="text-amber-400">&quot;YOUR_KEY&quot;</span> {"}"});<br />
                    <span className="text-purple-400">const</span> res = <span className="text-purple-400">await</span> sdk.verify.nin(<span className="text-amber-400">&quot;123456789&quot;</span>);
                  </>
                )}
                {selectedLang === "python" && (
                  <>
                    <span className="text-purple-400">from</span> devhubx <span className="text-purple-400">import</span> Devhub<br />
                    client = Devhub(api_key=<span className="text-amber-400">&quot;YOUR_KEY&quot;</span>)<br />
                    res = client.verify.nin(<span className="text-amber-400">&quot;123456789&quot;</span>)
                  </>
                )}
              </pre>
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                Interactive API Explorer
                <span className="bg-brand-green/10 text-brand-green text-[8px] font-mono font-bold px-1 py-0.5 rounded border border-brand-green/20">LIVE</span>
              </h4>
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                Test and execute live queries to mock endpoints directly inside the developer dashboard portal.
              </p>
            </div>

            <a
              href="#docs"
              className="inline-flex items-center justify-center gap-2 text-xs font-bold text-neutral-950 bg-brand-green hover:bg-emerald-400 rounded-lg px-3 py-2 transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-emerald-500/10 active:translate-y-0"
            >
              Launch API Sandbox
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom bar — Community & resources */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="#docs" className="group flex items-center gap-2 text-[11px] text-neutral-400 hover:text-white transition-colors duration-200">
            <svg className="w-3.5 h-3.5 text-neutral-500 group-hover:text-brand-green group-hover:scale-110 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Changelog
          </a>
          <a href="#docs" className="group flex items-center gap-2 text-[11px] text-neutral-400 hover:text-white transition-colors duration-200">
            <svg className="w-3.5 h-3.5 text-neutral-500 group-hover:text-brand-green group-hover:scale-110 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            FAQ
          </a>
          <a href="#docs" className="group flex items-center gap-2 text-[11px] text-neutral-400 hover:text-white transition-colors duration-200">
            <svg className="w-3.5 h-3.5 text-neutral-500 group-hover:text-brand-green group-hover:scale-110 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Community
          </a>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse shrink-0" />
          <span className="text-[10px] text-neutral-400">
            All systems <strong className="text-brand-green font-semibold">operational</strong>
          </span>
        </div>
      </div>
    </div>
  );
});
