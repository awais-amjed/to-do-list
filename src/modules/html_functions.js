const tasksList = document.getElementById('tasks-list');

const getHTMLCode = (task) => `
    <li><hr></li>
    <li class="task">
        <div>
            <input type="checkbox" name="checkbox-${task.index}" ${task.completed ? 'checked' : 'unchecked'}>
            <h2>${task.description}</h2>
        </div>
        <button><img class="icon" src="./assets/images/more.png" alt=""></button>
    </li>
  `;

export const populateAll = (tasks) => {
  tasks.forEach((task) => {
    tasksList.innerHTML += getHTMLCode(task);
  });
};

export const addToHTML = (task) => {
  tasksList.innerHTML += getHTMLCode(task);
};

export const removeFromHTML = (task) => {
  const listItems = tasksList.querySelectorAll('li');
  listItems.item(task.index * 2).remove();
  listItems.item((task.index * 2) + 1).remove();
};
