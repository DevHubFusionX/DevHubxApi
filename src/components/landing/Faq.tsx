"use client";

import React, { memo, useState } from "react";
import { SlideIn, StaggerContainer, StaggerItem } from "@/lib/motion";

const faqsList = [
  {
    question: "What is the latency overhead of routing through Devhubxapi?",
    answer: "Our gateway core is engineered in optimized Rust and distributed globally. With regional edge nodes in Lagos, Nairobi, and Johannesburg, the average routing overhead is under 4.2 milliseconds, ensuring queries execute at local-database speeds.",
  },
  {
    question: "How does the sandbox environment simulate error cases?",
    answer: "You can trigger specific partner network responses (such as MTN network timeouts, expired verification IDs, or bank-side downtime) by appending custom mock headers to your request payloads. This allows you to test your retry queues safely in staging.",
  },
  {
    question: "Is data transmission PCI-DSS and SOC2 compliant?",
    answer: "Yes. Devhubxapi acts as a secure transit proxy. We do not store sensitive PII, account PINs, or raw bank details on our servers. All payloads are encrypted in transit via TLS 1.3 and at rest using AES-256.",
  },
  {
    question: "What happens if my production traffic exceeds the plan limit?",
    answer: "We never cut off your API streams or block incoming requests. If you exceed your monthly tier, additional calls are billed at a flat rate of $0.005 per request, or you can opt-in to auto-scaling plans on your dashboard.",
  },
];

export default memo(function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-24 sm:py-32 border-b border-neutral-200 select-none overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Creative Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Heading & Support Box */}
          <SlideIn direction="left" className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight mt-3 mb-6">
                Answers to integration queries
              </h2>
              <p className="text-neutral-500 text-sm sm:text-base leading-relaxed max-w-sm">
                Can&apos;t find what you need? Browse our comprehensive documentation or query active endpoints in our live playground.
              </p>
            </div>

            {/* Support contact card */}
            <div className="mt-8 lg:mt-0 p-6 rounded-2xl border border-neutral-200 bg-neutral-50 flex flex-col items-start gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-green" />
                <span className="text-xs font-semibold font-mono text-neutral-500 uppercase">Support Desk</span>
              </div>
              <h3 className="text-base font-bold text-neutral-900">
                Need specialized assistance?
              </h3>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Our integration engineers are available to assist with custom routing, latency tuning, and regional network access.
              </p>
              <a 
                href="#" 
                className="text-xs font-bold text-neutral-950 hover:text-brand-green transition-colors duration-200 mt-2 flex items-center gap-1 group"
              >
                <span>Contact integration engineers</span>
                <span className="translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200">&rarr;</span>
              </a>
            </div>
          </SlideIn>

          {/* Right Column: Accordion Blocks */}
          <StaggerContainer stagger={0.08} className="lg:col-span-7 flex flex-col gap-4 justify-center">
            {faqsList.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <StaggerItem key={idx}>
                  <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden transition-all duration-300 hover:border-neutral-300">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left p-6 flex justify-between items-center gap-4 text-neutral-950 hover:text-brand-green transition-colors duration-200 cursor-pointer font-bold text-sm sm:text-base"
                    >
                      <span>{faq.question}</span>
                      <span className={`text-lg font-mono leading-none shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45 text-neutral-400" : "text-neutral-500"}`}>
                        +
                      </span>
                    </button>
                    
                    {/* Smooth Collapse Box */}
                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-48 border-t border-neutral-100 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="p-6 text-sm text-neutral-500 leading-relaxed bg-neutral-50">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

        </div>

      </div>
    </section>
  );
});
