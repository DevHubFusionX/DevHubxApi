"use client";

import React, { useEffect, useRef, memo } from "react";

export default memo(function DotWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Monitor resize changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        width = w;
        height = h;
        dpr = window.devicePixelRatio || 1;
        
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.resetTransform();
        ctx.scale(dpr, dpr);
      }
    });

    resizeObserver.observe(canvas);

    // Wave parameters
    const waveCount = 8; // Number of overlapping wave lines
    let time = 0;

    const render = () => {
      if (!ctx || !canvas || width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw each wave line
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();

        // Vary properties per wave to create depth and large motion
        const step = 15; // Resolution of lines
        const amplitude = 35 + i * 8; // Increased wave height (amplitude)
        const frequency = 0.0015 + i * 0.0004; // Frequency of wave peaks
        const speed = 0.012 - i * 0.001; // Movement speed
        const phaseOffset = i * (Math.PI / 4); // Offset phases
        
        // Vertical baseline spread wider across the center of the Hero section
        const baselineY = height * 0.45 + (i - waveCount / 2) * 35;

        for (let x = 0; x <= width + step; x += step) {
          // Double sine formula for organic flowing behavior
          const y = baselineY + 
            Math.sin(x * frequency + time * speed + phaseOffset) * 
            Math.cos(x * 0.0008 + time * 0.004) * 
            amplitude;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Increased opacity visibility
        const opacity = (0.15 + (i / waveCount) * 0.28); 
        const isGreenWave = i % 2 === 0; // More green wave lines for rich brand identity
        
        // Gradient stroke for smooth edge fade-out
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        const strokeColor = isGreenWave ? "16, 185, 129" : "255, 255, 255";
        
        grad.addColorStop(0, `rgba(${strokeColor}, 0)`);
        grad.addColorStop(0.15, `rgba(${strokeColor}, ${opacity})`);
        grad.addColorStop(0.85, `rgba(${strokeColor}, ${opacity})`);
        grad.addColorStop(1, `rgba(${strokeColor}, 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.0 + (i * 0.4); // Increased line thickness (size)
        ctx.stroke();
      }

      time += 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 block w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
});
