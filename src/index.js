import './style.scss';
import ToDoList from './modules/to-do-list.js';
import {
  populateAll, removeAllCompleted, showPopup, swing, drop,
} from './modules/html_functions.js';
import 'animate.css';
import './assets/images/refresh.png';
import './assets/images/add.png';
import './assets/images/more.png';
import './assets/images/delete.png';
import './assets/images/clipboard.png';
import './assets/images/accept.png';
import './assets/images/favicon.png';

const toDoList = new ToDoList();

populateAll(toDoList);

const addNewTaskForm = document.getElementById('add-new-task');
addNewTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  toDoList.addNewTask(addNewTaskForm.elements.new_task.value);
  addNewTaskForm.elements.new_task.value = '';
});

document.getElementById('clear-completed-button').addEventListener('click', () => {
  if (removeAllCompleted(toDoList) === false) {
    showPopup('Nothing to Remove');
  }
});

const refreshButton = document.getElementById('refresh-button');
refreshButton.addEventListener('click', () => {
  swing();
});

document.querySelector('.clipboard img').addEventListener('click', () => {
  drop();
});