import './style.scss';
import './assets/images/refresh.png';
import './assets/images/add.png';
import './assets/images/more.png';
import './assets/images/delete.png';
import './assets/images/checked.png';
import './assets/images/clipboard.png';
import ToDoList from './modules/to-do-list.js';
import { populateAll } from './modules/html_functions.js';

const toDoList = new ToDoList();

populateAll(toDoList);

const addNewTaskForm = document.getElementById('add-new-task');
addNewTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  toDoList.addNewTask(addNewTaskForm.elements.new_task.value);
});
