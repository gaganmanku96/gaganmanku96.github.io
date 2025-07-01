import { useEffect, useState } from 'react';

interface PerformanceStats {
  fps: number;
  memory: number;
  drawCalls: number;
  isLowPerformance: boolean;
}

const PerformanceMonitor: React.FC<{ onPerformanceChange?: (stats: PerformanceStats) => void }> = ({ 
  onPerformanceChange 
}) => {
  const [stats, setStats] = useState<PerformanceStats>({
    fps: 60,
    memory: 0,
    drawCalls: 0,
    isLowPerformance: false
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrame: number;

    const measurePerformance = () => {
      frameCount++;
      const currentTime = performance.now();
      
      // Calculate FPS every second
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // Get memory info (if available)
        const memory = (performance as any).memory 
          ? Math.round((performance as any).memory.usedJSHeapSize / 1048576) 
          : 0;
        
        // Determine if performance is low
        const isLowPerformance = fps < 30 || memory > 100;
        
        const newStats = {
          fps,
          memory,
          drawCalls: 0, // Would need WebGL context to measure
          isLowPerformance
        };
        
        setStats(newStats);
        onPerformanceChange?.(newStats);
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationFrame = requestAnimationFrame(measurePerformance);
    };

    measurePerformance();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [onPerformanceChange]);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-2 rounded text-xs font-mono">
      <div>FPS: {stats.fps}</div>
      <div>Memory: {stats.memory}MB</div>
      {stats.isLowPerformance && (
        <div className="text-red-400">Low Performance</div>
      )}
    </div>
  );
};

export default PerformanceMonitor;