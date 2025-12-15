import { useState, useRef, MouseEvent } from 'react';

interface DraggablePopupProps {
  gifSrc: string;
  frameSrc: string;
}

export const DraggablePopup = ({ gifSrc, frameSrc }: DraggablePopupProps) => {
  // track position of the popup
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const popupRef = useRef<HTMLDivElement>(null);

  // when user starts dragging
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!popupRef.current) return;
    
    const rect = popupRef.current.getBoundingClientRect();
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

  // add event listeners when dragging starts
  if (isDragging) {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  } else {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  return (
    <div 
      ref={popupRef}
      className="y2k-popup-window"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
    >
      <img src={gifSrc} alt="popup content" className="y2k-popup-gif" />
      <img src={frameSrc} alt="window frame" className="y2k-popup-frame" />
    </div>
  );
};
