'use client';

import React, { useEffect, useRef } from 'react';

export const InteractiveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse position state
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Grid nodes configuration
    const spacing = 60;
    const dots: { x: number; y: number; baseX: number; baseY: number; vx: number; vy: number }[] = [];

    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        dots.push({ x, y, baseX: x, baseY: y, vx: 0, vy: 0 });
      }
    }

    const render = () => {
      // Lerp mouse position for smooth trailing effect
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle dark background gradient
      const bgGrad = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 600);
      bgGrad.addColorStop(0, 'rgba(0, 240, 255, 0.07)');
      bgGrad.addColorStop(0.5, 'rgba(138, 43, 226, 0.03)');
      bgGrad.addColorStop(1, 'rgba(7, 7, 9, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Update and draw grid nodes
      dots.forEach((dot) => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 25;
          const angle = Math.atan2(dy, dx);
          dot.vx -= Math.cos(angle) * force * 0.2;
          dot.vy -= Math.sin(angle) * force * 0.2;
        }

        // Spring back to base position
        dot.vx += (dot.baseX - dot.x) * 0.05;
        dot.vy += (dot.baseY - dot.y) * 0.05;

        // Friction
        dot.vx *= 0.85;
        dot.vy *= 0.85;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Dynamic coloration near mouse
        const proximity = Math.max(0, 1 - dist / 300);
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.2 + proximity * 2, 0, Math.PI * 2);
        
        if (proximity > 0.1) {
          // Mistura de ciano e violeta interativa quando o mouse se aproxima
          ctx.fillStyle = `rgba(0, 240, 255, ${0.15 + proximity * 0.6})`;
        } else {
          // Monocromático elegante quando em repouso
          ctx.fillStyle = 'rgba(244, 241, 234, 0.15)';
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};