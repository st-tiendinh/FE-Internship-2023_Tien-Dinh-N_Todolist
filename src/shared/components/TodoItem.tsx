import React, { ChangeEvent, useState } from 'react';
import { StatusEnum, TaskInterface } from '../../app/core/models/todoItem';

interface TodoItemPropTypes {
  id: string;
  status: StatusEnum;
  title: string;
  tasks: TaskInterface[];
  setTasks: (tasks: TaskInterface[]) => void;
}

const TodoItem = ({ id, status, title, tasks, setTasks }: TodoItemPropTypes) => {
  const [editableTaskId, setEditableTaskId] = useState<string>('');
  const [editedText, setEditedText] = useState<string>('');

  console.log('item render');

  const handleDoubleClick = (id: string, title: string) => {
    setEditableTaskId(id);
    setEditedText(title);
  };

  const handleEditText = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value);
  };

  const handleTaskItemInputBlur = (id: string) => {
    if (editedText.trim()) {
      const findTask = tasks.find((task) => task.id === id);
      if (findTask) {
        findTask.title = editedText;
        setTasks([...tasks]);
        setEditableTaskId('');
      }
    }
  };

  const handleSubmitEditedTask = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter') {
      handleTaskItemInputBlur(id);
    }
  };

  const handleCompleted = (id: string) => {
    setTasks(
      tasks.map((task) => {
        return task.id === id ? { ...task, status: +!task.status } : task;
      })
    );
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((todo) => todo.id !== id));
  };

  return (
    <li key={id} className="todo-item">
      <input
        type="checkbox"
        checked={Boolean(status)}
        onChange={() => handleCompleted(id)}
        className="todo-item-status-checkbox"
        id={id}
      />
      <label className="todo-item-status-label" htmlFor={id}></label>

      {editableTaskId === id ? (
        <input
          className="todo-edit-input"
          type="text"
          value={editedText}
          onChange={handleEditText}
          onKeyUp={(e) => handleSubmitEditedTask(e, id)}
          onBlur={() => handleTaskItemInputBlur(id)}
          autoFocus
        />
      ) : (
        <span
          className={status ? 'todo-title text-completed' : 'todo-title'}
          onDoubleClick={() => handleDoubleClick(id, title)}
        >
          {title}
        </span>
      )}
      <span className="badge badge-remove" onClick={() => handleDelete(id)}></span>
    </li>
  );
};

export default React.memo(TodoItem);
