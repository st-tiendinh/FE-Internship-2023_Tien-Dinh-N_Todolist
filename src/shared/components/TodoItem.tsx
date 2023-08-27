import React from "react";

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
}: any) => {
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
