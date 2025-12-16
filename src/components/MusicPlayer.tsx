import { useState, useRef, useEffect, type MouseEvent } from 'react';
import '../MusicPlayer.css';
import forgiveFather from '../assets/tunes/Forgive Them Father.mp3'

interface Track {
  name: string;
  path: string;
}

interface MusicPlayerProps {
  tracks?: Track[];
  albumArt?: string;
  initialX?: number;
  initialY?: number;
}

export const MusicPlayer = ({ tracks, albumArt, initialX = 500, initialY = 100 }: MusicPlayerProps) => {
  // use imported song as default if no tracks provided
  const defaultTracks: Track[] = [
    { name: "Forgive Them Father - Lauryn Hill", path: forgiveFather }
  ];
  
  const playlistTracks = tracks || defaultTracks;
  
  // dragging state
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  
  // music player state
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [totalDuration, setTotalDuration] = useState('0:00');
  const [seekValue, setSeekValue] = useState(0);
  
  const playerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // dragging handlers
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current) return;
    const rect = playerRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  // load track
  const loadTrack = (index: number) => {
    if (audioRef.current && playlistTracks[index]) {
      audioRef.current.src = playlistTracks[index].path;
      audioRef.current.load();
    }
  };

  // play/pause
  const playpauseTrack = () => {
    if (!audioRef.current) return;
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // next track
  const nextTrack = () => {
    const newIndex = trackIndex < playlistTracks.length - 1 ? trackIndex + 1 : 0;
    setTrackIndex(newIndex);
    loadTrack(newIndex);
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  };

  // previous track
  const prevTrack = () => {
    const newIndex = trackIndex > 0 ? trackIndex - 1 : playlistTracks.length - 1;
    setTrackIndex(newIndex);
    loadTrack(newIndex);
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  };

  // seek
  const seekTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const seekto = audioRef.current.duration * (Number(e.target.value) / 100);
    audioRef.current.currentTime = seekto;
  };

  // update seek slider
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && !isNaN(audioRef.current.duration)) {
        const seekPosition = audioRef.current.currentTime * (100 / audioRef.current.duration);
        setSeekValue(seekPosition);

        const currentMinutes = Math.floor(audioRef.current.currentTime / 60);
        const currentSeconds = Math.floor(audioRef.current.currentTime - currentMinutes * 60);
        const durationMinutes = Math.floor(audioRef.current.duration / 60);
        const durationSeconds = Math.floor(audioRef.current.duration - durationMinutes * 60);

        setCurrentTime(`${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`);
        setTotalDuration(`${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // load first track on mount
  useEffect(() => {
    loadTrack(0);
  }, []);

  // handle track end
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('ended', nextTrack);
      return () => audio.removeEventListener('ended', nextTrack);
    }
  }, [trackIndex]);

  // minimize window cuz its kinda a lot going on on the screen
  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (isMinimized) {
    return null;
  }

  return (
    <div 
      ref={playerRef}
      className="music-player-container"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      <div className="music-window">
        <div 
          className="music-title-bar"
          onMouseDown={handleMouseDown}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div className="music-title-text">CD Player</div>
          <div className="music-title-controls">
            <button aria-label="Minimize" onClick={handleMinimize}>_</button>
            <button aria-label="Maximize">□</button>
            <button aria-label="Close" onClick={handleMinimize}>×</button>
          </div>
        </div>
        
        <div className="music-window-body">
          <div className="music-flex">
            {albumArt && (
              <div className="music-album-art">
                <img src={albumArt} alt="album" className="music-album-img" />
              </div>
            )}
            
            <div className="music-player-controls">
              <div className="music-song-title-window">
                <div className="music-song-title">
                  playing {trackIndex + 1} of {playlistTracks.length}: {playlistTracks[trackIndex]?.name}
                </div>
              </div>
              
              <div className="music-seeking">
                <div className="music-current-time">{currentTime}</div>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={seekValue} 
                  className="music-seek-slider" 
                  onChange={seekTo}
                />
                <div className="music-total-duration">{totalDuration}</div>
              </div>
              
              <div className="music-controls">
                <button onClick={prevTrack}>←</button>
                <button onClick={playpauseTrack}>
                  {isPlaying ? '❚❚' : '▷'}
                </button>
                <button onClick={nextTrack}>→</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <audio ref={audioRef} />
    </div>
  );
};
