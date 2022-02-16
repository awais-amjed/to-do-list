const tasksList = document.getElementById('tasks-list');
const popup = document.getElementById('popup');

export const showPopup = () => {
  popup.style.display = 'block';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 3000);
};

const getNewTaskNode = (task, toDoList) => {
  // Initialize All Elements
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

  const moreButton = document.createElement('button');
  moreButton.innerHTML = '<img class="icon" src="./assets/images/more.png" alt="Edit">';

  const doneButton = document.createElement('button');
  doneButton.innerHTML = `
      <img class="icon" src="./assets/images/checked.png" alt="Update">
    `;

  const removeButton = document.createElement('button');
  removeButton.innerHTML = `
      <img class="icon" src="./assets/images/delete.png" alt="Remove">
    `;

  // Create DOM hierarchy
  description.appendChild(taskInput);
  taskDetail.appendChild(checkbox);
  taskDetail.appendChild(description);
  taskItem.appendChild(taskDetail);
  taskItem.appendChild(moreButton);

  // Add Event Listeners
  doneButton.addEventListener('click', () => {
    if (toDoList.taskExists(taskInput.value)) {
      showPopup();
      return;
    }

    taskInput.disabled = true;
    task.description = taskInput.value;
    toDoList.updateLocalStorage();

    doneButton.remove();
    removeButton.remove();
    taskItem.appendChild(moreButton);
  });

  removeButton.addEventListener('click', () => {
    tasksList.querySelectorAll('li').item(task.index * 2).remove();
    taskItem.remove();
    toDoList.removeTask(task);
  });

  moreButton.addEventListener('click', () => {
    if (!taskInput.disabled) {
      return;
    }

    taskInput.disabled = false;
    taskInput.focus();
    moreButton.remove();
    taskItem.append(doneButton, removeButton);
  });

  return taskItem;
};

export const addToHTML = (task, toDoList) => {
  const hr = document.createElement('li');
  hr.innerHTML = '<hr>';
  tasksList.appendChild(hr);
  tasksList.appendChild(getNewTaskNode(task, toDoList));
};

export const populateAll = (toDoList) => {
  toDoList.tasks.forEach((task) => {
    addToHTML(task, toDoList);
  });
};
