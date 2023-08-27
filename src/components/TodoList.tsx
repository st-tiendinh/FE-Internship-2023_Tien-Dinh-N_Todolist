import { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import completedAllBtn from '../assets/images/ic-todo.svg';
import TodoItem from './TodoItem';

export enum StorageKey {
  TASK = 'tasks',
}

export interface TaskInterface {
  id: string;
  title: string;
  completed: boolean;
}

const TodoList = () => {
  const [input, setInput] = useState<string>('');
  const [tasks, setTasks] = useState<TaskInterface[]>(
    JSON.parse(localStorage.getItem(StorageKey.TASK) as string) || []
  );
  const [allCompleted, setAllCompleted] = useState<boolean>(false);
  const [showActive, setShowActive] = useState<boolean>(false);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  const [editableTaskId, setEditableTaskId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      if (input.trim() !== '') {
        setTasks([...tasks, { id: uuidv4(), title: input.trim(), completed: false }]);
        setInput('');
      }
    }
  };

  const handleTaskItemKeyDown = (e: any, id: string) => {
    if (e.key === 'Enter') {
      const findTask = tasks.find((task) => task.id === id);
      if (findTask) {
        findTask.title = editedText;
        setEditableTaskId(null);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }
  };

  const handleCompleted = (id: string) => {
    setTasks(
      tasks.map((task) => {
        return task.id === id ? { ...task, completed: !task.completed } : task;
      })
    );
  };

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

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((todo) => todo.id !== id));
  };

  const handleDoubleClick = (taskId: any, taskTitle: any) => {
    setEditableTaskId(taskId);
    setEditedText(taskTitle);
  };

  const handleEditText = (e: any) => {
    setEditedText(e.target.value);
  };

  const handleTaskItemInputBlur = (id: string) => {
    if (editedText.trim() !== '') {
      const findTask = tasks.find((task) => task.id === id);
      if (findTask) {
        findTask.title = editedText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        setEditableTaskId(null);
      }
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      return (showActive && !task.completed) || (showCompleted && task.completed) || (!showActive && !showCompleted);
    });
  }, [showActive, showCompleted, tasks]);

  const activeTasksCount = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const myHandleFunc = {
    handleCompleted,
    handleTaskItemKeyDown,
    handleTaskItemInputBlur,
    handleDoubleClick,
    handleDelete,
    handleEditText,
  };

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
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e)}
            placeholder='What need to be done?'
          />
        </div>

        <ul className='todo-list'>
          {filteredTasks.map((task, index) => {
            return <TodoItem key={index} {...task} editableTaskId={editableTaskId} {...myHandleFunc} />;
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
