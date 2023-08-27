const TodoItem = ({
  id,
  completed,
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
        checked={completed}
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
          onBlur={(e) => handleTaskItemInputBlur(id)}
          autoFocus
        />
      ) : (
        <span
          className={completed ? 'todo-title text-completed' : 'todo-title'}
          onDoubleClick={() => handleDoubleClick(id, title)}
        >
          {title}
        </span>
      )}
      <span className='badge badge-remove' onClick={() => handleDelete(id)}></span>
    </li>
  );
};

export default TodoItem;
