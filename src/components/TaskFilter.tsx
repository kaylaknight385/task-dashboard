import React from 'react';
import type { TaskFilterProps, Status, Priority } from '../types';

const TaskFilter: React.FC<TaskFilterProps> = ({ filters, onFilterChange }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      status: e.target.value as Status | 'all',
    });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      priority: e.target.value as Priority | 'all',
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      searchTerm: e.target.value,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      status: 'all',
      priority: 'all',
      searchTerm: '',
    });
  };

  return (
    <div className="task-filter">
      <div className="filter-group">
        <label htmlFor="search">search tasks</label>
        <input
          type="text"
          id="search"
          value={filters.searchTerm}
          onChange={handleSearchChange}
          placeholder="find that task u forgot about..."
        />
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="status-filter">status</label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={handleStatusChange}
          >
            <option value="all">show all</option>
            <option value="todo">haven't started</option>
            <option value="in-progress">working on it, ayyye</option>
            <option value="completed">DONE</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priority-filter">panic level</label>
          <select
            id="priority-filter"
            value={filters.priority}
            onChange={handlePriorityChange}
          >
            <option value="all">all levels</option>
            <option value="low">chill</option>
            <option value="medium">kinda stressed</option>
            <option value="high">HELP</option>
          </select>
        </div>
      </div>

      <button onClick={clearFilters} className="btn-clear">
        clear filters
      </button>
    </div>
  );
};

export default TaskFilter;
