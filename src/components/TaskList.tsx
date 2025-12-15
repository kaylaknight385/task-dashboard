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
      {/* search and sort controls - y2k style */}
      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            placeholder="search tasks by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control form-control-lg y2k-input"
          />
        </div>
        <div className="col-md-4">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as 'date' | 'priority' | 'status')}
            className="form-select form-select-lg y2k-input"
          >
            <option value="date">sort by due date</option>
            <option value="priority">sort by priority</option>
            <option value="status">sort by status</option>
          </select>
        </div>
      </div>

      <div className="y2k-alert mb-4">
        showing {sortedTasks.length} of {tasks.length} tasks
      </div>

      {/* render the actual task list */}
      <div className="row g-4">
        {sortedTasks.map((task) => (
          // key is super important, it helps react know which item is which
          // without it, react gets confused when you add/delete/reorder items
          <div key={task.id} className="col-12">
            <div className="card y2k-card">
              <div className="card-body">
                {/* title of task and its priority */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="y2k-title mb-0">
                    {task.title}
                  </h3>
                  <span 
                    className={`y2k-badge ${
                      task.priority === 'high' 
                        ? 'y2k-badge-high' 
                        : task.priority === 'medium' 
                        ? 'y2k-badge-medium' 
                        : 'y2k-badge-low'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>

                {/* task description */}
                <p className="card-text mb-3" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                  {task.description}
                </p>

                {/* status and due date info */}
                <div className="d-flex gap-3 mb-3 flex-wrap">
                  <span className="y2k-status-badge">
                    status: {task.status}
                  </span>
                  <span className="y2k-status-badge">
                    due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>

                {/* action buttons - y2k style */}
                <div className="d-flex gap-3">
                  <button 
                    onClick={() => onEdit(task)}
                    className="y2k-btn y2k-btn-edit"
                  >
                    edit
                  </button>
                  <button 
                    onClick={() => onDelete(task.id)}
                    className="y2k-btn y2k-btn-delete"
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
            <div className="y2k-alert text-center" style={{ fontSize: '1.2rem' }}>
              {searchTerm ? 'no tasks found matching your search' : 'no tasks yet, add one to get started'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
