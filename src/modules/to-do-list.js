import { addToHTML, showPopup } from './html_functions.js';
import storageAvailable from './local_storage.js';

export default class ToDoList {
  tasks;

  constructor() {
    this.tasks = [];
    if (storageAvailable('localStorage') === true) {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
      }
    }
  }

  taskExists = (description, skipIndex) => {
    for (let i = 0; i < this.tasks.length; i += 1) {
      if (i === skipIndex) {
        // eslint-disable-next-line no-continue
        continue;
      }
      if (this.tasks[i].description === description) {
        return true;
      }
    }
    return false;
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

    if (this.taskExists(task.description)) {
      showPopup('This task already exists');
      return;
    }

    this.tasks.push(task);
    addToHTML(task, this);
    this.updateLocalStorage();
  };

  removeTask = (toRemove) => {
    this.tasks.splice(toRemove.index, 1);
    this.#fixIndices(toRemove.index);
    this.updateLocalStorage();
  };

  updateLocalStorage = () => {
    if (storageAvailable('localStorage') === true) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
}