"use client";

import React, { useEffect, useRef } from 'react';

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // dpr clamp
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const handleResize = () => init();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX - width / 2) * 0.05; // subtle drift
      mouse.targetY = (e.clientY - height / 2) * 0.05;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      const spacing = 40; // sparse spacing
      const cols = Math.floor(width / spacing) + 2;
      const rows = Math.floor(height / spacing) + 2;
      
      const offsetX = (width % spacing) / 2 - spacing;
      const offsetY = (height % spacing) / 2 - spacing;

      ctx.fillStyle = '#6E7A67'; // Theme's accent/primary color, but monochrome with opacity

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + offsetX + mouse.x;
          const y = j * spacing + offsetY + mouse.y;

          // Depth fade and slow breathing pulse
          const distanceToCenter = Math.sqrt(Math.pow(x - width / 2, 2) + Math.pow(y - height / 2, 2));
          const maxDist = Math.max(width, height) / 2;
          
          // Breathing math (sine wave based on time)
          const breath = Math.sin(time * 0.001 + (x * 0.01) + (y * 0.01)) * 0.5 + 0.5;
          
          // Soft depth fade (center is visible, edges fade out)
          const depthFade = 1 - Math.min(distanceToCenter / maxDist, 1);
          
          const alpha = breath * depthFade * 0.3; // keep it subtle and atmospheric

          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 bg-transparent"
      id="bg-canvas"
    />
  );
};
