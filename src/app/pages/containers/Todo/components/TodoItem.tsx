import React, { ChangeEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteTask, editTask, setCompletedTask } from '../../../../../redux/action';
import { StatusEnum } from '../../../../core/models/todoItem';

interface TodoItemPropTypes {
  id: string;
  status: StatusEnum;
  title: string;
}

export const TodoItem = ({ id, status, title }: TodoItemPropTypes) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [input, setInput] = useState<string>(title);

  const taskInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleDoubleClick = () => {
    setIsEditable(true);
  };

  const handleEditText = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleTaskItemInputBlur = (id: string) => {
    setIsEditable(false);
    if (taskInputRef.current!.value.trim()) {
      dispatch(
        editTask(
          taskInputRef
            .current!.value.split(' ')
            .filter((word) => word !== '')
            .join(' '),
          id
        )
      );
      setInput(
        taskInputRef
          .current!.value.split(' ')
          .filter((word) => word !== '')
          .join(' ')
      );
    }
  };

  const handleSubmitEditedTask = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter') {
      handleTaskItemInputBlur(id);
    }
  };

  const handleCompleted = (id: string) => {
    dispatch(setCompletedTask(id));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <li key={id} className="todo-item">
      <input
        className="todo-item-status-checkbox"
        type="checkbox"
        checked={Boolean(status)}
        onChange={() => handleCompleted(id)}
        id={id}
      />
      <label className="todo-item-status-label" htmlFor={id}></label>

      {isEditable ? (
        <input
          className="todo-edit-input"
          type="text"
          value={input}
          ref={taskInputRef}
          onChange={handleEditText}
          onKeyUp={(e) => handleSubmitEditedTask(e, id)}
          onBlur={() => handleTaskItemInputBlur(id)}
          autoFocus
        />
      ) : (
        <span
          className={status ? 'todo-title text-completed' : 'todo-title'}
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </span>
      )}
      <span className="badge badge-remove" onClick={() => handleDelete(id)}></span>
    </li>
  );
};
