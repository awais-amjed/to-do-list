const tasksList = document.getElementById('tasks-list');
const popup = document.getElementById('popup');

export const showPopup = () => {
  popup.style.display = 'block';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 3000);
};

const doneButtonListener = (toDoList, taskItem, taskInput,
  task, doneButton, removeButton, moreButton) => {
  if (toDoList.taskExists(taskInput.value, task.index)) {
    showPopup();
    return;
  }

  taskInput.disabled = true;
  task.description = taskInput.value;
  toDoList.updateLocalStorage();

  doneButton.remove();
  removeButton.remove();
  taskItem.appendChild(moreButton);
};

const removeButtonListener = (toDoList, taskItem, task) => {
  tasksList.querySelectorAll('li').item(task.index * 2).remove();
  taskItem.remove();
  toDoList.removeTask(task);
};

const moreButtonListener = (toDoList, taskItem, taskInput, task,
  doneButton, removeButton, moreButton) => {
  if (!taskInput.disabled) {
    return;
  }

  taskInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      doneButtonListener(toDoList, taskItem, taskInput,
        task, doneButton, removeButton, moreButton);
    }
  });

  taskInput.disabled = false;
  taskInput.focus();
  moreButton.remove();
  taskItem.append(doneButton, removeButton);
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
    doneButtonListener(toDoList, taskItem, taskInput, task, doneButton, removeButton, moreButton);
  });

  removeButton.addEventListener('click', () => {
    removeButtonListener(toDoList, taskItem, task);
  });

  moreButton.addEventListener('click', () => {
    moreButtonListener(toDoList, taskItem, taskInput, task, doneButton, removeButton, moreButton);
  });

  return taskItem;
};

export const addToHTML = (task, toDoList) => {
  // Adds a new Element to HTML DOM
  const hr = document.createElement('li');
  hr.innerHTML = '<hr>';
  tasksList.appendChild(hr);
  tasksList.appendChild(getNewTaskNode(task, toDoList));
};

export const populateAll = (toDoList) => {
  // Populate the To-DO List when the page loads
  toDoList.tasks.forEach((task) => {
    addToHTML(task, toDoList);
  });
};
