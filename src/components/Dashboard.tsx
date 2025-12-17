import { useState, useEffect } from 'react';
import type { Task, TaskFormData, FilterOptions } from '../types';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';
import { TaskList } from './TaskList';

const Dashboard = () => {
  // load tasks from localStorage on mount
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  
  // task we're currently editing (null if we're not editing anything)
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // show/hide the form
  const [showForm, setShowForm] = useState(false);
  
  // filter settings
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    priority: 'all',
    searchTerm: '',
  });

  // save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // add a new task
  const handleAddTask = (formData: TaskFormData) => {
    const newTask: Task = {
      id: Date.now().toString(), // quick n dirty unique id
      ...formData,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    setShowForm(false); // hide form after adding
  };

  // update an existing task
  const handleUpdateTask = (formData: TaskFormData) => {
    if (!editingTask) return;
    
    const updatedTasks = tasks.map(task =>
      task.id === editingTask.id
        ? { ...task, ...formData }
        : task
    );
    setTasks(updatedTasks);
    setEditingTask(null); // clear editing state
    setShowForm(false); // hide form after updating
  };

  // delete a task
  const handleDeleteTask = (id: string) => {
    if (confirm('u sure u wanna delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  // start editing a task
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true); // show the form
    // scroll to top so they can see the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // cancel editing
  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  // open form to create new task
  const handleCreateTask = () => {
    setEditingTask(null); // clear any editing state
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // filter tasks based on current filter settings
  const filteredTasks = tasks.filter(task => {
    // status filter
    if (filters.status !== 'all' && task.status !== filters.status) {
      return false;
    }
    
    // priority filter
    if (filters.priority !== 'all' && task.priority !== filters.priority) {
      return false;
    }
    
    // search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const titleMatch = task.title.toLowerCase().includes(searchLower);
      const descMatch = task.description.toLowerCase().includes(searchLower);
      if (!titleMatch && !descMatch) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>The Manager</h1>
        <p>get ur life together (or at least try)</p>
      </div>

      {/* create task button */}
      {!showForm && (
        <div className="dashboard-section">
          <button onClick={handleCreateTask} className="btn-create-task">
            Create new task
          </button>
        </div>
      )}

      {/* task form section only show when showForm is true */}
      {showForm && (
        <div className="dashboard-section">
          <h2>{editingTask ? 'edit task' : 'add new task'}</h2>
          <TaskForm
            onSubmit={editingTask ? handleUpdateTask : handleAddTask}
            initialData={editingTask || undefined}
            onCancel={handleCancelEdit}
          />
        </div>
      )}

      {/* filter section */}
      <div className="dashboard-section">
        <h2>Filter Tasks</h2>
        <TaskFilter filters={filters} onFilterChange={setFilters} />
      </div>

      {/* task list section */}
      <div className="dashboard-section">
        <h2>Your tasks ({filteredTasks.length})</h2>
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default Dashboard;
