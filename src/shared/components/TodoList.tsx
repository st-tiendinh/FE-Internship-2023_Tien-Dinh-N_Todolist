import { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TaskInterface, StorageKey, StatusEnum } from '../../services/TodoItemService';
import TodoItem from './TodoItem';
import TodoHeader from './TodoHeader';

const TodoList = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>(
    JSON.parse(localStorage.getItem(StorageKey.TASK) as string) || []
  );
  const [allCompleted, setAllCompleted] = useState<StatusEnum>(0);
  const [showActive, setShowActive] = useState<boolean>(false);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  const [editableTaskId, setEditableTaskId] = useState<string>('');
  const [editedText, setEditedText] = useState<string>('');

  const handleSelectAllCompleted = () => {
    setAllCompleted(+!allCompleted);
    setTasks((prevTask) =>
      prevTask.map((task) => ({
        ...task,
        status: allCompleted,
      }))
    );
  };

  const handleHeaderInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, input: string) => {
    if (e.key === 'Enter') {
      if (input.trim() !== '') {
        setTasks([...tasks, { id: uuidv4(), title: input.trim(), status: StatusEnum.ACTIVE }]);
      }
    }
  };

  const handleTaskItemKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter') {
      const findTask = tasks.find((task) => task.id === id);
      if (findTask) {
        findTask.title = editedText;
        setEditableTaskId('');
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }
  };

  const handleCompleted = (id: string) => {
    setTasks(
      tasks.map((task) => {
        return task.id === id ? { ...task, status: +!task.status } : task;
      })
    );
  };

  const clearAllCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.status !== StatusEnum.COMPLETED));
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((todo) => todo.id !== id));
  };

  const handleDoubleClick = (id: string, title: string) => {
    setEditableTaskId(id);
    setEditedText(title);
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
        setEditableTaskId('');
      }
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      return (
        (showActive && task.status === StatusEnum.ACTIVE) ||
        (showCompleted && task.status === StatusEnum.COMPLETED) ||
        (!showActive && !showCompleted)
      );
    });
  }, [showActive, showCompleted, tasks]);

  const activeTasksCount = useMemo(() => tasks.filter((task) => task.status === StatusEnum.ACTIVE).length, [tasks]);

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
        <TodoHeader handleSelectAllCompleted={handleSelectAllCompleted} handleHeaderInputKeyDown={handleHeaderInputKeyDown} />

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
