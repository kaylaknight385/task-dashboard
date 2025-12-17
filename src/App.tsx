import './App.css'
import './MusicPlayer.css';
import Dashboard from './components/Dashboard'
import { WindowPopup } from './components/WindowPopup'
import { MusicPlayer } from './components/MusicPlayer'

function App() {

  return (
    <div className="y2k-app-container">
      {/* custom orange windows 98 popups */}
      <WindowPopup 
        title="dont panic.gif"
        gifSrc="/src/assets/dontpanic.gif"
        initialX={50}
        initialY={150}
      />
      
      <WindowPopup 
        title="fireball.gif"
        gifSrc="/src/assets/fireball.gif"
        initialX={600}
        initialY={200}
      />

      {/* music player */}
      <MusicPlayer 
        albumArt="/src/assets/laurynhill.jpg"
        initialX={1100}
        initialY={150}
      />

      {/* charmander background layer */}
      <div className="charmander-layer">
        <img src="/src/assets/charmander.gif" alt="charmander" />
      </div>

      {/* swimming goldfish */}
      <img 
        src="/src/assets/goldfishhh.gif" 
        alt="swimming goldfish" 
        className="swimming-goldfish goldfish-1"
      />
      <img 
        src="/src/assets/goldfishhh.gif" 
        alt="swimming goldfish" 
        className="swimming-goldfish goldfish-2"
      />
      <img 
        src="/src/assets/goldfishhh.gif" 
        alt="swimming goldfish" 
        className="swimming-goldfish goldfish-3"
      />
      <img 
        src="/src/assets/goldfishhh.gif" 
        alt="swimming goldfish" 
        className="swimming-goldfish goldfish-4"
      />
      <img 
        src="/src/assets/goldfishhh.gif" 
        alt="swimming goldfish" 
        className="swimming-goldfish goldfish-5"
      />
      <img 
        src="/src/assets/goldfishhh.gif" 
        alt="swimming goldfish" 
        className="swimming-goldfish goldfish-6"
      />
      <img 
        src="/src/assets/goldfishhh.gif" 
        alt="swimming goldfish" 
        className="swimming-goldfish goldfish-7"
      />
      <img 
        src="/src/assets/goldfishhh.gif" 
        alt="swimming goldfish" 
        className="swimming-goldfish goldfish-8"
      />
      <img 
        src="/src/assets/goldfishhh.gif" 
        alt="swimming goldfish" 
        className="swimming-goldfish goldfish-9"
      />

      <div className="y2k-header">
        <h1 className="y2k-main-title">
          my task manager
        </h1>
      </div>
      <div className="y2k-content">
        <Dashboard />
      </div>
    </div>
  )
}

export default App
