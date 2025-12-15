// import all the stuff we need
import { useState } from 'react';
import type { TaskListProps } from '../types';

// this is our main component, it takes in props (stuff passed from parent component)
export const TaskList = ({ tasks, onEdit, onDelete }: TaskListProps) => {
  // useState is a react hook that lets us store data that can change
  // when this data changes, react re-renders the component (updates what you see)
  
  // this stores what the user types in the search box
  const [searchTerm, setSearchTerm] = useState('');
  
  // this stores how we want to sort the tasks
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'status'>('date');

  // filter tasks based on search term
  // this runs every time tasks or searchTerm changes
  const filteredTasks = tasks.filter((task) => {
    // if search box is empty, show all tasks
    if (!searchTerm) return true;
    
    // convert everything to lowercase so search isn't case-sensitive
    const searchLower = searchTerm.toLowerCase();
    const titleMatch = task.title.toLowerCase().includes(searchLower);
    const descMatch = task.description.toLowerCase().includes(searchLower);
    
    // return true if either title or description contains the search term
    return titleMatch || descMatch;
  });

  // sort the filtered tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // the [...filteredTasks] creates a copy so we don't mess up the original array
    
    if (sortBy === 'date') {
      // sort by due date (earliest first goes firssst)
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    
    if (sortBy === 'priority') {
      // sort by priority (high -> medium -> low)
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    
    if (sortBy === 'status') {
      // sort by status (todo -> in-progress -> completed)
      const statusOrder = { 'todo': 1, 'in-progress': 2, 'completed': 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    }
    
    return 0; // if somehow nun match, don't change order
  });

  return (
    <div className="container-fluid">
      {/* search and sort controls - ugh im a sheep making it mypspace THEME AYYYYE */}
      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            placeholder="search tasks by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control form-control-lg border-3 border-primary"
            style={{ 
              boxShadow: '3px 3px 0px rgba(0,0,0,0.3)',
              fontWeight: 'bold'
            }}
          />
        </div>
        <div className="col-md-4">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as 'date' | 'priority' | 'status')}
            className="form-select form-select-lg border-3 border-success"
            style={{ 
              boxShadow: '3px 3px 0px rgba(0,0,0,0.3)',
              fontWeight: 'bold'
            }}
          >
            <option value="date">sort by due date</option>
            <option value="priority">sort by priority</option>
            <option value="status">sort by status</option>
          </select>
        </div>
      </div>

      <div className="alert alert-info border-3" style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.2)' }}>
        <strong>showing {sortedTasks.length} of {tasks.length} tasks</strong>
      </div>

      {/* render the actual task list */}
      <div className="row g-4">
        {sortedTasks.map((task) => (
          // key is super important, it helps react know which item is which
          // without it, react gets confused when you add/delete/reorder items
          <div key={task.id} className="col-12">
            <div 
              className="card border-4 border-dark"
              style={{ 
                boxShadow: '6px 6px 0px rgba(0,0,0,0.4)',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                transform: 'rotate(-0.5deg)'
              }}
            >
              <div className="card-body" style={{ background: 'rgba(255,255,255,0.95)' }}>
                {/* title of task and its priorityyyy */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="card-title mb-0" style={{ 
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                    fontWeight: 'bold',
                    fontSize: '1.5rem'
                  }}>
                    {task.title}
                  </h3>
                  <span 
                    className={`badge rounded-pill fs-6 ${
                      task.priority === 'high' 
                        ? 'bg-danger' 
                        : task.priority === 'medium' 
                        ? 'bg-warning text-dark' 
                        : 'bg-success'
                    }`}
                    style={{ 
                      boxShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                      padding: '8px 16px'
                    }}
                  >
                    {task.priority}
                  </span>
                </div>

                {/* task description */}
                <p className="card-text text-muted mb-3" style={{ fontSize: '1.1rem' }}>
                  {task.description}
                </p>

                {/* status and due date info */}
                <div className="d-flex gap-4 mb-3">
                  <span className="badge bg-info text-dark" style={{ fontSize: '0.9rem', padding: '6px 12px' }}>
                    status: <strong>{task.status}</strong>
                  </span>
                  <span className="badge bg-secondary" style={{ fontSize: '0.9rem', padding: '6px 12px' }}>
                    due: <strong>{new Date(task.dueDate).toLocaleDateString()}</strong>
                  </span>
                </div>

                {/* action buttons - myspace style buttons old skooool */}
                <div className="d-flex gap-2">
                  <button 
                    onClick={() => onEdit(task)}
                    className="btn btn-primary btn-lg border-3 border-dark"
                    style={{ 
                      boxShadow: '3px 3px 0px rgba(0,0,0,0.4)',
                      fontWeight: 'bold'
                    }}
                  >
                    edit
                  </button>
                  <button 
                    onClick={() => onDelete(task.id)}
                    className="btn btn-danger btn-lg border-3 border-dark"
                    style={{ 
                      boxShadow: '3px 3px 0px rgba(0,0,0,0.4)',
                      fontWeight: 'bold'
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* show message if no tasks match the search */}
        {sortedTasks.length === 0 && (
          <div className="col-12">
            <div className="alert alert-warning text-center border-3 border-dark" style={{ 
              boxShadow: '5px 5px 0px rgba(0,0,0,0.3)',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}>
              {searchTerm ? 'no tasks found matching your search' : 'no tasks yet, add one to get started'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
