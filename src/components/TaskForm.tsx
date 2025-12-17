import React, { useState, useEffect } from 'react';
import type { TaskFormProps, TaskFormData, Priority, Status } from '../types';

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    dueDate: '',
  });

  // if we're editing, fill in the form with existing data
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        priority: initialData.priority,
        status: initialData.status,
        dueDate: initialData.dueDate,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //for if they dont put no title
    if (!formData.title.trim()) {
      alert('lmao make a title or sumn!');
      return;
    }
    onSubmit(formData);
    // reset form after submit
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
      dueDate: '',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">task name*</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="what do u gotta do?"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">details</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="more info if u want..."
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">panic level</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">chill</option>
            <option value="medium">kinda stressed</option>
            <option value="high">HELP</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="todo">haven't started</option>
            <option value="in-progress">working on it</option>
            <option value="completed">DONE</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">due date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {initialData ? 'update task' : 'add task'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            nah cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
