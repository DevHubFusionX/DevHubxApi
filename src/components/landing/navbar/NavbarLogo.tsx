import React, { memo } from "react";

export default memo(function NavbarLogo() {
  return (
    <a href="#" className="flex items-center gap-2 group">
      <span className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
      <span className="text-xl font-bold tracking-tight text-white font-sans">
        <span className="text-white">Devhub</span>
        <span className="text-brand-green">x</span>
        <span className="text-neutral-400 font-normal">api</span>
      </span>
    </a>
  );
});
