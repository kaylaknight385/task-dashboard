import { useState, useRef, useEffect, type MouseEvent } from 'react';
import '../WindowPopup.css';

interface WindowPopupProps {
  title: string;
  gifSrc: string;
}

export const WindowPopup = ({ title, gifSrc }: WindowPopupProps) => {
  // starter position of the popup, left upper side of screen
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const windowRef = useRef<HTMLDivElement>(null);

  // when user starts dragging (only from title bar)
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!windowRef.current) return;
    
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  // while dragging
  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  // stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // properly manage event listeners with useEffect
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      // stop listener when user stops dragging, 
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset])

  return (
    <div 
      ref={windowRef}
      className="win98-window"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      {/* title bar - draggable */}
      <div 
        className="win98-titlebar"
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <span className="win98-title">{title}</span>
        <div className="win98-buttons">
          <button className="win98-btn win98-minimize">_</button>
          <button className="win98-btn win98-maximize">□</button>
          <button className="win98-btn win98-close">×</button>
        </div>
      </div>

      {/* window content */}
      <div className="win98-content">
        <img src={gifSrc} alt="window content" className="win98-gif" />
      </div>
    </div>
  );
};
