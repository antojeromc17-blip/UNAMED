import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

export function InteractiveFolder({ 
  color = '#000000', 
  size = 1, 
  items = [], 
  className = '',
  label,
  onItemClick
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const maxVisibleItems = 3;
  const displayItems = items.slice(0, maxVisibleItems);
  while (displayItems.length < maxVisibleItems) {
    displayItems.push(null);
  }

  const folderBackColor = darkenColor(color, 0.12);
  const paperColors = [
    darkenColor('#FFFFFF', 0.1),
    darkenColor('#FFFFFF', 0.05),
    '#FFFFFF'
  ];

  const handleMouseMove = (e, index) => {
    if (!isOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.2;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.2;
    setMousePos({ x, y });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setHoveredIndex(null);
  };

  const getPaperTransform = (index) => {
    if (!isOpen) return { x: '-50%', y: '2%', rotate: 0 };
    
    const baseTransforms = [
      { x: '-120%', y: '-75%', rotate: -15 },
      { x: '10%', y: '-75%', rotate: 15 },
      { x: '-50%', y: '-105%', rotate: 5 }
    ];

    const base = baseTransforms[index] || { x: '-50%', y: '-50%', rotate: 0 };
    
    if (hoveredIndex === index) {
      return {
        x: `calc(${base.x} + ${mousePos.x}px)`,
        y: `calc(${base.y} + ${mousePos.y}px)`,
        rotate: base.rotate,
        scale: 1.1,
      };
    }
    
    return base;
  };

  return (
    <div 
      className={className}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', transform: `scale(${size})`, width: 120, height: 100 }}
    >
      <div
        style={{ position: 'relative', cursor: 'pointer', userSelect: 'none' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          style={{ 
            position: 'relative', width: '110px', height: '85px', transition: 'all 0.5s',
            borderTopRightRadius: '12px', borderBottomRightRadius: '12px', borderBottomLeftRadius: '12px', borderTopLeftRadius: '0px',
            backgroundColor: folderBackColor,
            boxShadow: isOpen ? '0 10px 30px -5px rgba(0,0,0,0.1)' : '0 4px 12px -2px rgba(0,0,0,0.05)'
          }}
        >
          <div
            style={{ 
               position: 'absolute', bottom: '100%', left: 0, width: '35px', height: '12px',
               borderTopLeftRadius: '6px', borderTopRightRadius: '6px',
               backgroundColor: folderBackColor
            }}
          />

          {displayItems.map((item, i) => (
            <motion.div
              key={i}
              onClick={(e) => {
                if (isOpen) {
                  e.stopPropagation();
                  if (onItemClick) onItemClick(i);
                }
              }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={handleMouseLeave}
              animate={getPaperTransform(i)}
              transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 1 }}
              style={{
                position: 'absolute', top: '2px', left: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                zIndex: 20, backgroundColor: paperColors[i], borderRadius: '8px',
                width: i === 0 ? '75px' : i === 1 ? '85px' : '95px',
                height: i === 0 ? '65px' : i === 1 ? '70px' : '75px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '2px solid #000000',
                cursor: isOpen ? 'pointer' : 'default',
                opacity: isOpen ? 1 : 0
              }}
            >
              {item}
            </motion.div>
          ))}

          <motion.div
            animate={{ skewX: isOpen ? 15 : 0, scaleY: isOpen ? 0.6 : 1, translateY: isOpen ? 4 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 30, transformOrigin: 'bottom',
              backgroundColor: color, borderRadius: '6px 12px 12px 12px',
              clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
            }}
          />

          <motion.div
            animate={{ skewX: isOpen ? -15 : 0, scaleY: isOpen ? 0.6 : 1, translateY: isOpen ? 4 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 30, transformOrigin: 'bottom',
              backgroundColor: color, borderRadius: '6px 12px 12px 12px',
              clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'
            }}
          >
          </motion.div>
          
          {label && (
              <motion.div 
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 40, color: '#000000', fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', whiteSpace: 'nowrap', padding: '0.2rem 0.5rem', fontFamily: 'Space Mono', pointerEvents: 'none' }}
              >
                {label}
              </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}

export default InteractiveFolder;
