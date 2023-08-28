import React, { ChangeEvent } from 'react';
import { StatusEnum } from '../../app/core/models/todoItem';

interface TodoItemProps {
  id: string;
  status: StatusEnum;
  title: string;
  editableTaskId: string;
  editedText: string;
  handleCompleted: (id: string) => void;
  handleSubmitEditedTask: (event: React.KeyboardEvent<HTMLInputElement>, id: string) => void;
  handleTaskItemInputBlur: (id: string) => void;
  handleDoubleClick: (id: string, title: string) => void;
  handleDelete: (id: string) => void;
  handleEditText: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TodoItem = ({
  id,
  status,
  title,
  editableTaskId,
  editedText,
  handleCompleted,
  handleSubmitEditedTask,
  handleTaskItemInputBlur,
  handleDoubleClick,
  handleDelete,
  handleEditText,
}: TodoItemProps) => {
  return (
    <li key={id} className='todo-item'>
      <input
        type='checkbox'
        checked={Boolean(status)}
        onChange={() => handleCompleted(id)}
        className='todo-item-status-checkbox'
        id={id}
      />
      <label className='todo-item-status-label' htmlFor={id}></label>

      {editableTaskId === id ? (
        <input
          className='todo-edit-input'
          type='text'
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
      <span className='badge badge-remove' onClick={() => handleDelete(id)}></span>
    </li>
  );
};

export default React.memo(TodoItem);
