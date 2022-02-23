/**
 * @jest-environment jsdom
 */

import ToDoList from '../modules/to-do-list.js';
import 'jest';

describe('Manipulate Tasks List', () => {
  const todo = new ToDoList();
  document.body.innerHTML = `
   <ul id="tasks-list">

   </ul>
   `;

  const tasksList = document.getElementById('tasks-list');

  test('Add a task', () => {
    const previousLength = todo.tasks.length;
    todo.addNewTask('Test 1');

    expect(todo.tasks).toHaveLength(previousLength + 1);
    expect(tasksList.childElementCount).toBe((previousLength + 1) * 2);

    // Check if all the nodes are created in DOM
    expect(tasksList.querySelector('.task')).toBeInstanceOf(Node);
    expect(tasksList.querySelector('.task .task-detail')).toBeInstanceOf(Node);
    expect(tasksList.querySelector('button')).toBeInstanceOf(Node);
  });

  test('Test if a Task Exists', () => {
    expect(todo.taskExists('Test 1')).toBe(true);
    expect(todo.taskExists('Test 2')).toBe(false);
  });

  test('Editing a task Description', () => {
    todo.updateExistingTask(0, 'Test test 1');
    expect(todo.tasks.at(0).description).toBe('Test test 1');
  });

  test('Check for the task completion', () => {
    todo.updateChecked(0, true);
    expect(todo.tasks.at(0).completed).toBe(true);
  });
  test('Remove task from the list', () => {
    const task = { index: 0 };
    const previousLength = todo.tasks.length;
    todo.removeTask(task);
    expect(todo.tasks).toHaveLength(previousLength - 1);
  });
});
