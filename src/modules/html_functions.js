const tasksList = document.getElementById('tasks-list');
const popup = document.getElementById('popup');
const toDoContainer = document.getElementById('to-do-container');
const clipBoard = document.querySelector('.clipboard img');

export const swing = () => {
  toDoContainer.classList.remove('animate__shakeX');
  toDoContainer.classList.add('animate__swing');
  setTimeout(() => {
    toDoContainer.classList.remove('animate__swing');
  }, 1000);
};

export const showPopup = (error) => {
  if (error) {
    popup.querySelector('p').textContent = error;
  }

  popup.style.display = 'block';
  popup.classList.remove('animate__slideOutRight');
  popup.classList.add('animate__slideInRight');
  setTimeout(() => {
    popup.classList.remove('animate__slideInRight');
    popup.classList.add('animate__slideOutRight');
  }, 3000);

  toDoContainer.classList.remove('animate__shakeX');
  setTimeout(() => {
    toDoContainer.classList.add('animate__shakeX');
  }, 10);
};

export const drop = () => {
  toDoContainer.classList.remove('animate__shakeX');
  toDoContainer.classList.add('animate__hinge');
  document.body.style.overflowY = 'hidden';
  setTimeout(() => {
    document.getElementById('dropped').style.display = 'flex';
    clipBoard.addEventListener('click', () => {
      showPopup("Should've thought about it before. Just Refresh the page now.");
    });
    clipBoard.removeEventListener('click', drop);
  }, 2000);
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

  doneButton.classList.add('animate__fadeOutDown');
  removeButton.classList.add('animate__fadeOutDown');
  setTimeout(() => {
    doneButton.remove();
    removeButton.remove();
    moreButton.classList.add('animate__fadeInDown');
    doneButton.classList.remove('animate__fadeOutDown');
    removeButton.classList.remove('animate__fadeOutDown');
    taskItem.appendChild(moreButton);
  }, 100);
};

const removeButtonListener = (toDoList, taskItem, task) => {
  tasksList.querySelectorAll('li').item(task.index * 2).remove();
  taskItem.classList.remove('animate__bounceInLeft');
  setTimeout(() => {
    taskItem.classList.add('animate__bounceOutRight');
    setTimeout(() => {
      taskItem.remove();
    }, 500);
  }, 10);
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
  moreButton.classList.add('animate__fadeOutDown');
  setTimeout(() => {
    moreButton.remove();
    taskItem.append(doneButton, removeButton);
    moreButton.classList.remove('animate__fadeOutDown');
  }, 100);
};

const checkboxListener = (toDoList, task, checkbox, taskInput) => {
  task.completed = checkbox.checked;
  if (checkbox.checked === true) {
    taskInput.classList.add('checked');
  } else {
    taskInput.classList.remove('checked');
  }
  toDoList.updateLocalStorage();
};

const getNewTaskNode = (task, toDoList) => {
  // Initialize All Elements
  const taskItem = document.createElement('li');
  taskItem.classList.add('animate__animated', 'animate__bounceInLeft');
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
  if (task.completed === true) {
    taskInput.classList.add('checked');
  }

  const moreButton = document.createElement('button');
  moreButton.classList.add('animate__animated', 'animate__faster');
  moreButton.innerHTML = '<img class="icon" src="./assets/images/more.png" alt="Edit">';

  const doneButton = document.createElement('button');
  doneButton.classList.add('animate__animated', 'animate__fadeInDown', 'animate__faster');
  doneButton.innerHTML = `
      <img class="icon" src="./assets/images/accept.png" alt="Update">
    `;

  const removeButton = document.createElement('button');
  removeButton.classList.add('animate__animated', 'animate__fadeInDown', 'animate__faster');
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

  checkbox.addEventListener('click', () => {
    checkboxListener(toDoList, task, checkbox, taskInput);
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

export const removeAllCompleted = (toDoList) => {
  const listItems = tasksList.querySelectorAll('li');
  let removed = false;

  for (let i = toDoList.tasks.length - 1; i >= 0; i -= 1) {
    if (toDoList.tasks.at(i).completed === true) {
      removed = true;
      const item = listItems.item(i * 2 + 1);
      removeButtonListener(toDoList, item, toDoList.tasks.at(i));
    }
  }

  return removed;
};

export const populateAll = (toDoList) => {
  // Populate the To-DO List when the page loads
  toDoList.tasks.forEach((task) => {
    addToHTML(task, toDoList);
  });
};
