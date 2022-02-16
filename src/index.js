import './style.scss';
import './assets/images/refresh.png';
import './assets/images/add.png';
import './assets/images/more.png';
import './assets/images/delete.png';
import './assets/images/checked.png';
import { addNewTask } from './modules/crud_functions.js';
import { populateAll } from './modules/html_functions.js';

const tasks = [
  {
    description: 'Wash the Dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'Complete To Do List Projects',
    completed: false,
    index: 1,
  },
];

populateAll(tasks);

const addNewTaskForm = document.getElementById('add-new-task');
addNewTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addNewTask(tasks, addNewTaskForm.elements.new_task.value);
});
