// Utils
import { useState } from 'react';

const initialState = ['Walk the dog', 'Water the plants', 'Wash the dishes'];

export default function ToDoList() {
  const [tasks, setTasks] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = e.target.elements.task.value;
    setTasks((prev) => [...prev, task]);
    e.target.reset();
  };

  const handleDelete = (task) => {
    setTasks((prev) => prev.filter((_, i) => i !== task));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='p-2 border'
          name='task'
          placeholder='Add your task'
          autoFocus
        />
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>

      <ul>
        {tasks.map((task, i) => (
          <TaskItem
            key={i}
            taskIndex={i}
            text={task}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

function TaskItem({ text, taskIndex, handleDelete }) {
  return (
    <li>
      <span>{text}</span>
      <button
        onClick={() =>
          window.confirm('Are you sure you want to delete the task?') &&
          handleDelete(taskIndex)
        }
        className='px-2 py-1 border bg-slate-300'
      >
        Delete
      </button>
    </li>
  );
}
