"use client";

import React, { memo, useState, useEffect } from "react";
import { FadeUp, SlideIn, PresenceBlock } from "@/lib/motion";
import DotWaveBackground from "@/components/landing/DotWaveBackground";

const rawCodes: Record<string, string> = {
  cURL: `curl -X GET "https://api.devhubxapi.com/v1/verify/nin/23408102392" \\\n  -H "Authorization: Bearer $DEVHUB_KEY"`,
  JS: `const res = await fetch("https://api.devhubxapi.com/v1/verify/nin/23408102392", {\n  headers: {\n    "Authorization": "Bearer " + process.env.DEVHUB_KEY\n  }\n});\nconst data = await res.json();\nconsole.log(data);`,
  Python: `import requests\n\nheaders = {\n    "Authorization": "Bearer $DEVHUB_KEY"\n}\nresponse = requests.get(\n    "https://api.devhubxapi.com/v1/verify/nin/23408102392",\n    headers=headers\n)\nprint(response.json())`
};

export default memo(function CodeShowcase() {
  const [activeTab, setActiveTab] = useState("cURL");
  const [showResponse, setShowResponse] = useState(false);
  const [copied, setCopied] = useState(false);

  // Initial trigger for response preview
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResponse(true);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    setShowResponse(false);
    setCopied(false);
    setActiveTab(tab);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCodes[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-black py-24 sm:py-32 relative overflow-hidden border-b border-white/5 select-none">
      {/* Wave Dot Animation background */}
      <DotWaveBackground />

      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-green/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: short pitch */}
        <SlideIn direction="left" className="lg:col-span-5 text-left flex flex-col justify-center">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green mb-3">
            Developer Credibility
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-6">
            Integrate in minutes.
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed mb-8">
            Tap directly into our high-performance client libraries. Zero complex middleware. Zero multi-tenant setup headaches.
          </p>

          {/* Bullet points */}
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3 text-sm text-neutral-300">
              <span className="text-brand-green text-lg font-bold">⚡</span>
              <span>Sub-millisecond routing latency overhead</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-neutral-300">
              <span className="text-brand-green text-lg font-bold">🛠️</span>
              <span>Standardized, normalized JSON payloads</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-neutral-300">
              <span className="text-brand-green text-lg font-bold">🔒</span>
              <span>Production-ready end-to-end data encryption</span>
            </li>
          </ul>
        </SlideIn>

        {/* Right Side: Interactive Code Showcase */}
        <SlideIn direction="right" delay={0.25} className="lg:col-span-7 w-full flex flex-col gap-6">
          <div className="w-full rounded-xl border border-white/10 bg-neutral-950/60 backdrop-blur-xl shadow-2xl overflow-hidden text-left">
            
            {/* Header bar with tabs and Copy */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-neutral-900/40">
              {/* Language Tabs */}
              <div className="flex items-center gap-1.5">
                {["cURL", "JS", "Python"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-colors duration-200 cursor-pointer ${
                      activeTab === tab
                        ? "text-brand-green bg-emerald-500/10"
                        : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Copy Button */}
              <button 
                onClick={handleCopy}
                className="text-xs font-mono text-neutral-500 hover:text-white px-2.5 py-1.5 rounded border border-white/0 hover:border-white/5 hover:bg-white/5 transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <span className="text-brand-green">✓</span>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 21H8V7h11m0-2H8a2 2 0 00-2 2v14a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2m-3-4H4a2 2 0 00-2 2v14h2V3h12V1z"/>
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body with PresenceBlock for Tab-switched changes */}
            <PresenceBlock motionKey={activeTab} className="p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto min-h-[170px]">
              {activeTab === "cURL" && (
                <pre className="text-neutral-300">
                  <span className="text-neutral-500">curl</span> -X GET <span className="text-emerald-400">&quot;https://api.devhubxapi.com/v1/verify/nin/23408102392&quot;</span> \<br />
                  {"  "}-H <span className="text-emerald-400">&quot;Authorization: Bearer $DEVHUB_KEY&quot;</span>
                </pre>
              )}
              
              {activeTab === "JS" && (
                <pre className="text-neutral-300">
                  <span className="text-purple-400">const</span> res = <span className="text-purple-400">await</span> <span className="text-blue-400">fetch</span>(<span className="text-emerald-400">&quot;https://api.devhubxapi.com/v1/verify/nin/23408102392&quot;</span>, &#123;<br />
                  {"  "}headers: &#123;<br />
                  {"    "}<span className="text-emerald-400">&quot;Authorization&quot;</span>: <span className="text-emerald-400">&quot;Bearer &quot;</span> + process.env.DEVHUB_KEY<br />
                  {"  "}&#125;<br />
                  &#125;);<br />
                  <span className="text-purple-400">const</span> data = <span className="text-purple-400">await</span> res.<span className="text-blue-400">json</span>();<br />
                  console.<span className="text-cyan-400">log</span>(data);
                </pre>
              )}

              {activeTab === "Python" && (
                <pre className="text-neutral-300">
                  <span className="text-purple-400">import</span> requests<br /><br />
                  headers = &#123;<br />
                  {"    "}<span className="text-emerald-400">&quot;Authorization&quot;</span>: <span className="text-emerald-400">&quot;Bearer $DEVHUB_KEY&quot;</span><br />
                  &#125;<br />
                  response = requests.<span className="text-blue-400">get</span>(<br />
                  {"    "}<span className="text-emerald-400">&quot;https://api.devhubxapi.com/v1/verify/nin/23408102392&quot;</span>,<br />
                  {"    "}headers=headers<br />
                  )<br />
                  <span className="text-blue-400">print</span>(response.<span className="text-blue-400">json</span>())
                </pre>
              )}
            </PresenceBlock>

          </div>

          {/* Live Response Preview */}
          <div 
            className={`transition-all duration-700 ease-out transform ${
              showResponse 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <div className="border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 p-4 rounded-xl flex items-start sm:items-center gap-3 font-mono text-xs shadow-lg leading-relaxed text-left">
              <span className="shrink-0 text-emerald-500 font-bold select-none">✓ 200 OK</span>
              <span className="text-neutral-400 select-none">—</span>
              <span className="text-emerald-300 break-all select-all">
                {"{"}&quot;status&quot;:&quot;valid&quot;,&quot;lga&quot;:&quot;Eti-Osa&quot;,&quot;state&quot;:&quot;Lagos&quot;,&quot;firstName&quot;:&quot;Frank&quot;,&quot;verificationId&quot;:&quot;tx_9201a&quot;{"}"}
              </span>
            </div>
          </div>
        </SlideIn>

      </div>
    </section>
  );
});
