// this component lets users filter their tasks by status, priority, and search term
// it takes in current filter settings and a function to update them

import React from 'react';
import type { TaskFilterProps, Status, Priority } from '../types';

const TaskFilter: React.FC<TaskFilterProps> = ({ filters, onFilterChange }) => {
    //react.fr means react functional component. it is used to explicitly type a function component, helping ensure type safety for props and the return value
    //when user changes the status dropdown, update the filters
    //we keep all other filter settings the same, just change status
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //'e' is short for event. the line above is just saying an event is happpening and it will be a react change event
    onFilterChange({
      ...filters, // spread operator keeps existing filters
      status: e.target.value as Status | 'all', // update just the status
    });
  };

  // when user changes the priority dropdown, update the filters
  // same deal - keep everything else, just change priority
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      priority: e.target.value as Priority | 'all',
    });
  };

  // when user types in the search box, update the search term
  // this happens on every keystroke so they see results in real time
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      searchTerm: e.target.value,
    });
  };

  // reset all filters back to default (show everything)
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
