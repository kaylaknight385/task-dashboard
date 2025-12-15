// how stressed are you on the task? pick your poison of PRIORITY TO SET
export type Priority = 'low' | 'medium' | 'high';

// WHATS THE STATUS OF THAT TASK? procrastinating, doing it, or finally done?
export type Status = 'todo' | 'in-progress' | 'completed';

// this is what a task looks like basically
export interface Task {
  id: string; // unique id so we don't mix up tasks 
  title: string; // what you gotta do
  description: string; // more details about what you gotta do 
  priority: Priority; // how much you're panicking about this
  status: Status; // did u do it or nah
  dueDate: string; // when your teacher/boss wants it (rip)
  createdAt: string; // when you added this to list
}

// what the form needs when you're making a new task
export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string;
}

// filters so you can hide the tasks you don't wanna see right now
export interface FilterOptions {
  status: Status | 'all'; // show me everything or just the ones i'm avoiding
  priority: Priority | 'all'; // panic mode filter
  searchTerm: string; // find that one task you forgot about
}

// props for the task list component (fancy word for "stuff we're passing down")
export interface TaskListProps {
  tasks: Task[]; // all the tasks in an array
  onEdit: (task: Task) => void; // function to edit a task when you realize you messed up
  onDelete: (id: string) => void; // delete that thang
}

// props for the form where you add/edit tasks
export interface TaskFormProps {
  onSubmit: (task: TaskFormData) => void; // what happens when you hit that submit button
  initialData?: Task; // if you're editing, we'll pre-fill the form (the ? means it's optional, no pressure)
  onCancel?: () => void; // bail out if you change your mind/canceeeel
}

// props for the filter component
export interface TaskFilterProps {
  filters: FilterOptions; // current filter settings
  onFilterChange: (filters: FilterOptions) => void; // update filters when you click stuff
}

// props for the main dashboard (the big boss component)
export interface DashboardProps {
  tasks: Task[]; // all the tasks you're juggling
}
