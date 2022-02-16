import { addToHTML } from './html_functions.js';

export default class ToDoList {
  tasks;

  constructor() {
    this.tasks = [];
  }

  #fixIndices = (start) => {
    for (let i = start; i < this.tasks.length; i += 1) {
      this.tasks.at(i).index = i;
    }
  };

  addNewTask = (newTask) => {
    const task = {
      description: newTask,
      completed: false,
      index: this.tasks.length,
    };

    this.tasks.push(task);
    addToHTML(task);
  };

  removeTask = (tasks, toRemove) => {
    tasks.splice(toRemove.index, 1);
    this.#fixIndices(tasks, toRemove.index);
  };
}