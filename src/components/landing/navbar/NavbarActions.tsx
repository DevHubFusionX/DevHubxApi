import React, { memo } from "react";
import { openAuthModal } from "@/lib/auth-trigger";

export default memo(function NavbarActions() {
  return (
    <div className="flex items-center gap-5">
      <button
        onClick={() => openAuthModal("login")}
        className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer"
      >
        Sign in
      </button>

      <button
        onClick={() => openAuthModal("signup")}
        className="relative text-sm font-bold text-neutral-950 px-4 py-2 rounded-lg bg-brand-green hover:bg-emerald-400 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5 animate-pulse-glow cursor-pointer"
      >
        Get API key &rarr;
      </button>
    </div>
  );
});
