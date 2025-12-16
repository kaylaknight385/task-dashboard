import { useState } from 'react'
import './App.css'
import './MusicPlayer.css';
import { TaskList } from './components/TaskList'
import { WindowPopup } from './components/WindowPopup'
import { MusicPlayer } from './components/MusicPlayer'
import type { Task } from './types'

function App() {
  // some dummy tasks so we can see the component in action
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'finish react project',
      description: 'build this sick task manager with y2k vibes',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2025-12-20',
      createdAt: '2025-12-15'
    },
    {
      id: '2',
      title: 'study for exam',
      description: 'gotta pass this test or else',
      priority: 'medium',
      status: 'todo',
      dueDate: '2025-12-18',
      createdAt: '2025-12-15'
    },
    {
      id: '3',
      title: 'clean room',
      description: 'mom said so lol',
      priority: 'low',
      status: 'todo',
      dueDate: '2025-12-25',
      createdAt: '2025-12-15'
    }
  ]);

  // placeholder functions for now
  const handleEdit = (task: Task) => {
    console.log('editing task:', task);
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

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

      <div className="y2k-header">
        <h1 className="y2k-main-title">
          my task manager
        </h1>
      </div>
      <div className="y2k-content">
        <TaskList 
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default App
