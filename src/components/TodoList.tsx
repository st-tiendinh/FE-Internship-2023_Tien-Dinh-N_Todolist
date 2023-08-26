import { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import completedAllBtn from '../assets/images/ic-todo.svg';

export enum StorageKey {
  TASK = 'tasks',
}

const TodoList = () => {
  const [input, setInput] = useState<string>('');
  const [tasks, setTasks] = useState<any[]>(JSON.parse(localStorage.getItem(StorageKey.TASK) as string) || []);
  const [allCompleted, setAllCompleted] = useState<boolean>(false);
  const [showActive, setShowActive] = useState<boolean>(false);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  const [editableTaskId, setEditableTaskId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, { id: uuidv4(), title: input.trim(), completed: false }]);
      setInput('');
    }
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((todo) => todo.id !== id));
  };

  const handleCompleted = (id: number) => {
    setTasks(
      tasks.map((task) => {
        return task.id === id ? { ...task, completed: !task.completed } : task;
      })
    );
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      return (showActive && !task.completed) || (showCompleted && task.completed) || (!showActive && !showCompleted);
    });
  }, [showActive, showCompleted, tasks]);

  const handleSelectAllCompleted = () => {
    setAllCompleted(!allCompleted);
    setTasks((prevTask) =>
      prevTask.map((task) => ({
        ...task,
        completed: allCompleted,
      }))
    );
  };

  const clearAllCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleTaskItemKeyDown = (e: any, id: number) => {
    if (e.key === 'Enter') {
      const findTask = tasks.find((task) => task.id === id);
      findTask.title = editedText;
      setEditableTaskId(null);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  };

  const activeTasksCount = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks]);

  const handleDoubleClick = (taskId: any, taskTitle: any) => {
    setEditableTaskId(taskId);
    setEditedText(taskTitle);
  };

  const handleEditText = (e: any) => {
    setEditedText(e.target.value);
  };

  const handleTaskItemInputBlur = (id: number) => {
    if (editedText.trim() !== '') {
      const findTask = tasks.find((task) => task.id === id);
      findTask.title = editedText;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      setEditableTaskId(null);
    }
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className='wrapper'>
      <div className='todo'>
        <div className='todo-header'>
          <img src={completedAllBtn} onClick={handleSelectAllCompleted} alt='' className='todo-header-img' />
          <input
            className='todo-header-input'
            type='text'
            value={input}
            autoFocus
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e)}
            placeholder='What need to be done?'
          />
        </div>

        <ul className='todo-list'>
          {filteredTasks.map((task) => {
            return (
              <li key={task.id} className='todo-item'>
                <input
                  type='checkbox'
                  checked={task.completed}
                  onChange={() => handleCompleted(task.id)}
                  className='todo-item-status-checkbox'
                  id={task.id}
                />
                <label className='todo-item-status-label' htmlFor={task.id}></label>

                {editableTaskId === task.id ? (
                  <input
                    className='todo-edit-input'
                    type='text'
                    value={editedText}
                    onChange={handleEditText}
                    onKeyDown={(e) => handleTaskItemKeyDown(e, task.id)}
                    onBlur={(e) => handleTaskItemInputBlur(task.id)}
                    autoFocus
                  />
                ) : (
                  <span
                    className={task.completed ? 'todo-title text-completed' : 'todo-title'}
                    onDoubleClick={() => handleDoubleClick(task.id, task.title)}
                  >
                    {task.title}
                  </span>
                )}
                <span className='badge badge-remove' onClick={() => handleDelete(task.id)}></span>
              </li>
            );
          })}
        </ul>

        {JSON.stringify(tasks) !== '[]' ? (
          <div className='todo-footer'>
            <span className='todo-footer-quantity'>{activeTasksCount} items left</span>
            <ul className='todo-filter-list'>
              <li
                className='todo-filter-item'
                onClick={() => {
                  setShowActive(false);
                  setShowCompleted(false);
                }}
              >
                <span className={`todo-filter-type ${!showActive && !showCompleted && 'active'}`}>All</span>
              </li>
              <li
                className='todo-filter-item'
                onClick={() => {
                  setShowActive(true);
                  setShowCompleted(false);
                }}
              >
                <span className={`todo-filter-type ${showActive && 'active'}`}>Active</span>
              </li>
              <li
                className='todo-filter-item'
                onClick={() => {
                  setShowCompleted(true);
                  setShowActive(false);
                }}
              >
                <span className={`todo-filter-type ${showCompleted && 'active'}`}>Completed</span>
              </li>
            </ul>

            <span className='todo-clear-completed' onClick={clearAllCompleted}>
              Clear Completed
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default TodoList;
