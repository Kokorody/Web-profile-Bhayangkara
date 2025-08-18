'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage?: number;
  renderTime: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    renderTime: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  const getFpsColor = (fps: number) => {
    if (fps < 30) return 'text-red-400';
    if (fps < 50) return 'text-yellow-400';
    return 'text-green-400';
  };

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    console.log('Performance Monitor component mounted'); // Debug log

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measurePerformance = () => {
      const now = performance.now();
      frameCount++;

      if (now >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        const renderTime = now - lastTime;
        
        setMetrics(prev => ({
          ...prev,
          fps,
          renderTime: Math.round(renderTime),
          memoryUsage: (performance as any).memory ? 
            Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024) : 
            undefined
        }));

        frameCount = 0;
        lastTime = now;
      }

      animationId = requestAnimationFrame(measurePerformance);
    };

    // Toggle visibility with Ctrl+Shift+L
    const handleKeyPress = (e: KeyboardEvent) => {
      console.log('Key pressed:', e.key, 'Ctrl:', e.ctrlKey, 'Shift:', e.shiftKey); // Debug log
      if (e.ctrlKey && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
        e.preventDefault();
        console.log('Performance Monitor toggled'); // Debug log
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    animationId = requestAnimationFrame(measurePerformance);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  // Show a small toggle button when monitor is not visible
  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-20 right-4 z-50 bg-black/70 text-white p-2 rounded text-xs font-mono hover:bg-black/90 transition-colors"
        title="Show Performance Monitor (Ctrl+Shift+L)"
      >
        📊
      </button>
    );
  }

  return (
    <div className="fixed top-20 right-4 z-50 bg-black/90 text-white p-3 rounded-lg text-xs font-mono min-w-[200px]">
      <div className="flex justify-between items-center mb-2">
        <div className="text-yellow-400 font-bold">Performance Monitor</div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white ml-2"
          title="Close (Ctrl+Shift+L)"
        >
          ✕
        </button>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>FPS:</span>
          <span className={getFpsColor(metrics.fps)}>
            {metrics.fps}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Render Time:</span>
          <span className={metrics.renderTime > 16 ? 'text-red-400' : 'text-green-400'}>
            {metrics.renderTime}ms
          </span>
        </div>
        {metrics.memoryUsage && (
          <div className="flex justify-between">
            <span>Memory:</span>
            <span className={metrics.memoryUsage > 100 ? 'text-yellow-400' : 'text-green-400'}>
              {metrics.memoryUsage}MB
            </span>
          </div>
        )}
      </div>
      <div className="text-gray-400 text-[10px] mt-2">
        Ctrl+Shift+L to toggle
      </div>
    </div>
  );
}
