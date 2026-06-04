"use client";

import React, { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthModalState, closeAuthModal, openAuthModal } from "@/lib/auth-trigger";

export default memo(function AuthModal() {
  const mode = useAuthModalState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lock scroll when modal is open
  useEffect(() => {
    if (mode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      closeAuthModal();
      setEmail("");
      setPassword("");
      setName("");
    }, 1200);
  };

  return (
    <AnimatePresence>
      {mode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* Backdrop — reduced blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeAuthModal}
            className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm"
          />

          {/* Modal Container — 2-column split */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                type: "spring",
                damping: 28,
                stiffness: 380,
              },
            }}
            exit={{ opacity: 0, scale: 0.96, y: 10, transition: { duration: 0.15 } }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-2"
          >
            {/* Top Glow Decorator */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-brand-green/60 to-transparent" />

            {/* ─── Left Column: Branding Panel ─── */}
            <div className="hidden lg:flex flex-col justify-between p-10 bg-neutral-950/60 border-r border-white/5 relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-green/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-12">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  <span className="text-base font-bold tracking-tight text-white">
                    Devhub<span className="text-brand-green">x</span>
                    <span className="text-neutral-400 font-normal">api</span>
                  </span>
                </div>

                {/* Headline */}
                <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight mb-4">
                  {mode === "login"
                    ? "Ship faster with unified APIs."
                    : "Your gateway to regional infrastructure."}
                </h2>
                <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
                  {mode === "login"
                    ? "Access your dashboard, monitor latency telemetry, and manage API keys across all endpoints."
                    : "Provision sandbox keys instantly, connect to 40+ regional APIs, and deploy to production in minutes."}
                </p>
              </div>

              {/* Stats row */}
              <div className="relative z-10 grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
                <div>
                  <span className="text-xl font-extrabold text-white">825M+</span>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono mt-1">Requests/mo</p>
                </div>
                <div>
                  <span className="text-xl font-extrabold text-white">99.98%</span>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono mt-1">Uptime SLA</p>
                </div>
                <div>
                  <span className="text-xl font-extrabold text-white">&lt;4ms</span>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono mt-1">Edge latency</p>
                </div>
              </div>
            </div>

            {/* ─── Right Column: Form Panel ─── */}
            <div className="relative p-8 sm:p-10 flex flex-col justify-center">
              {/* Close Button */}
              <button
                onClick={closeAuthModal}
                className="absolute top-4 right-4 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Mobile logo (hidden on lg) */}
              <div className="flex items-center gap-2 mb-6 lg:hidden">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                <span className="text-base font-bold tracking-tight text-white">
                  Devhub<span className="text-brand-green">x</span>api
                </span>
              </div>

              {/* Header */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {mode === "login" ? "Welcome back" : "Create developer account"}
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm mb-6 leading-relaxed">
                {mode === "login"
                  ? "Enter your credentials to access your API keys and telemetry dashboards."
                  : "Get sandbox credentials and 1,000 free monthly API requests instantly."}
              </p>

              {/* Toggle tabs */}
              <div className="flex items-center gap-1 bg-neutral-950/80 rounded-lg p-1 border border-white/5 mb-6">
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer ${mode === "login"
                    ? "bg-white/10 text-white"
                    : "text-neutral-400 hover:text-white"
                    }`}
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal("signup")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer ${mode === "signup"
                    ? "bg-white/10 text-white"
                    : "text-neutral-400 hover:text-white"
                    }`}
                >
                  Sign up
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {mode === "signup" && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
                      Full name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Frank Obi"
                      className="w-full bg-neutral-950/60 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/30 transition-all duration-200"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="frank@example.com"
                    className="w-full bg-neutral-950/60 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/30 transition-all duration-200"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
                      Password
                    </label>
                    {mode === "login" && (
                      <a
                        href="#"
                        className="text-[10px] text-neutral-500 hover:text-white transition-colors duration-200"
                      >
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-neutral-950/60 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/30 transition-all duration-200"
                  />
                </div>

                {error && (
                  <div className="text-rose-500 text-xs bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 rounded-xl text-sm font-bold text-neutral-950 bg-brand-green hover:bg-emerald-400 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-neutral-950"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Connecting node...</span>
                    </>
                  ) : (
                    <span>
                      {mode === "login" ? "Access Dashboard" : "Provision sandbox keys →"}
                    </span>
                  )}
                </button>
              </form>

              {/* Social Logins Divider */}
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="flex-shrink mx-4 text-[10px] text-neutral-600 font-bold uppercase tracking-wider font-mono">
                  Or authenticate via
                </span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/5 bg-neutral-950/40 hover:bg-neutral-950 transition-all duration-200 cursor-pointer text-xs text-neutral-300 hover:text-white"
                >
                  <svg
                    className="w-4 h-4 fill-current text-white"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span>GitHub</span>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/5 bg-neutral-950/40 hover:bg-neutral-950 transition-all duration-200 cursor-pointer text-xs text-neutral-300 hover:text-white"
                >
                  <svg
                    className="w-3.5 h-3.5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Google</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});
