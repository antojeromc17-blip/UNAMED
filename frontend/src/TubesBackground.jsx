import React, { useEffect, useRef, useState } from 'react';

const randomColors = (count) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

export function TubesBackground({ children, className = '', enableClickInteraction = true }) {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tubesRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let cleanup;

    const initTubes = async () => {
      if (!canvasRef.current) return;
      try {
        const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
        const TubesCursor = module.default;
        if (!mounted) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#FFFFFF", "#000000", "#FFFFFF"],
            lights: {
              intensity: 600,
              colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]
            }
          }
        });

        tubesRef.current = app;
        setIsLoaded(true);

        const handleResize = () => {};
        window.addEventListener('resize', handleResize);
        
        cleanup = () => {
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };
    initTubes();
    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return;
    const colors = randomColors(3);
    const lightsColors = randomColors(4);
    tubesRef.current.tubes.setColors(colors);
    tubesRef.current.tubes.setLightsColors(lightsColors);
  };

  return (
    <div 
      className={`relative-container ${className}`}
      onClick={handleClick}
      style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: '#FF4D00' }}
    >
      <canvas 
        ref={canvasRef} 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', touchAction: 'none' }}
      />
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {children}
      </div>
    </div>
  );
}
