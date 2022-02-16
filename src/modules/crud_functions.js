import { addToHTML, removeFromHTML } from './html_functions.js';

const fixIndices = (tasks, start) => {
  for (let i = start; i < tasks.length; i += 1) {
    tasks.at(i).index = i;
  }
};

export const addNewTask = (tasks, newTask) => {
  const task = {
    description: newTask,
    completed: false,
    index: tasks.length,
  };

  tasks.push(task);
  addToHTML(task);
};

export const removeTask = (tasks, toRemove) => {
  tasks.splice(toRemove.index, 1);
  fixIndices(tasks, toRemove.index);
  removeFromHTML(toRemove);
};