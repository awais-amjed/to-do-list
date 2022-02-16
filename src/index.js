import './style.scss';
import './assets/images/refresh.png';
import './assets/images/add.png';
import './assets/images/more.png';

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

const tasksList = document.getElementById('tasks-list');
tasks.forEach((task) => {
  tasksList.innerHTML += `
    <li><hr></li>
    <li class="task">
        <div>
            <input type="checkbox" name="checkbox-${task.index}" ${task.completed ? 'checked' : 'unchecked'}>
            <h2>${task.description}</h2>
        </div>
        <button><img class="icon" src="./assets/images/more.png" alt=""></button>
    </li>
  `;
});