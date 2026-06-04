import React, { memo } from "react";
import { openAuthModal } from "@/lib/auth-trigger";

export default memo(function NavbarActions() {
  return (
    <div className="flex items-center gap-4">
      {/* GitHub link */}
      <a
        href="https://github.com/devhubx"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-neutral-500 hover:text-white hover:bg-white/5 transition-all duration-200"
        title="GitHub"
      >
        <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"
          />
        </svg>
      </a>

      <button
        onClick={() => openAuthModal("login")}
        className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer"
      >
        Sign in
      </button>

      <button
        onClick={() => openAuthModal("signup")}
        className="relative text-sm font-bold text-neutral-950 px-4 py-2 rounded-lg bg-brand-green hover:bg-emerald-400 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
      >
        Get API key
      </button>
    </div>
  );
});
