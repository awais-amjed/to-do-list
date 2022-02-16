const tasksList = document.getElementById('tasks-list');

const getNewTaskNode = (task) => {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task');

  const taskDetail = document.createElement('div');
  taskDetail.classList.add('task-detail');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;

  const description = document.createElement('div');
  description.classList.add('description');

  const taskInput = document.createElement('input');
  taskInput.type = 'text';
  taskInput.value = task.description;
  taskInput.disabled = true;

  description.appendChild(taskInput);

  taskDetail.appendChild(checkbox);
  taskDetail.appendChild(description);

  const button = document.createElement('button');
  button.innerHTML = '<img class="icon" src="./assets/images/more.png" alt="">';

  taskItem.appendChild(taskDetail);
  taskItem.appendChild(button);

  description.addEventListener('click', () => {
    if (!taskInput.disabled) {
      return;
    }

    taskInput.disabled = false;
    taskInput.focus();

    button.querySelector('img').src = './assets/images/delete.png';
    const done = document.createElement('button');
    done.innerHTML = `
      <img class="icon" src="./assets/images/checked.png" alt="">
    `;
    button.insertAdjacentElement('beforebegin', done);

    done.addEventListener('click', () => {
      taskInput.disabled = true;
      button.querySelector('img').src = './assets/images/more.png';
      task.description = taskInput.value;
      done.remove();
    });
  });

  return taskItem;
};

export const populateAll = (tasks) => {
  tasks.forEach((task) => {
    tasksList.appendChild(getNewTaskNode(task));
  });
};

export const addToHTML = (task) => {
  const hr = document.createElement('li');
  hr.innerHTML = '<hr>';
  tasksList.appendChild(hr);
  tasksList.appendChild(getNewTaskNode(task));
};

export const removeFromHTML = (task) => {
  const listItems = tasksList.querySelectorAll('li');
  listItems.item(task.index * 2).remove();
  listItems.item((task.index * 2) + 1).remove();
};
