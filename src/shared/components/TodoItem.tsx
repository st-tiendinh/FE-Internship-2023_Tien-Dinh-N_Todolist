import React, { ChangeEvent } from 'react';
import { StatusEnum } from '../../services/TodoItemService';

interface TodoItemProps {
  id: string;
  status: StatusEnum;
  title: string;
  editableTaskId: string;
  editedText: string;
  handleCompleted: (id: string) => void;
  handleTaskItemKeyDown: (event: React.KeyboardEvent<HTMLInputElement>, id: string) => void;
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
  handleTaskItemKeyDown,
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
          onKeyDown={(e) => handleTaskItemKeyDown(e, id)}
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
