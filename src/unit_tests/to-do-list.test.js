/**
 * @jest-environment jsdom
 */

import ToDoList from '../modules/to-do-list.js';

describe('Manipulate Tasks List', () => {
  const todo = new ToDoList();

  test('Add a task', () => {
    document.body.innerHTML = `
       <ul id="tasks-list">

       </ul>
      `;

    const tasksList = document.getElementById('tasks-list');
    const previousLength = todo.tasks.length;
    todo.addNewTask('Test 1');

    expect(todo.tasks).toHaveLength(previousLength + 1);
    expect(tasksList.childElementCount).toBe((previousLength + 1) * 2);
  });

  test('Remove task from the list', () => {
    const task = { index: 0 };
    const previousLength = todo.tasks.length;
    todo.removeTask(task);
    expect(todo.tasks).toHaveLength(previousLength - 1);
  });
});