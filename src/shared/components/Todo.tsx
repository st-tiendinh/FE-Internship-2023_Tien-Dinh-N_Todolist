import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';

import { TaskInterface, StorageKey, StatusEnum, Tab } from '../../app/core/models/todoItem';
import { getFromLocalStorage } from '../utils/local-storage';

const Todo = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>(getFromLocalStorage(StorageKey.TASK, []));
  const [allCompleted, setAllCompleted] = useState<StatusEnum>(0);
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.ALL);

  const handleSubmitByEnter = (e: React.KeyboardEvent<HTMLInputElement>, input: string) => {
    if (e.key === 'Enter') {
      if (input.trim()) {
        setTasks([{ id: uuidv4(), title: input.trim(), status: StatusEnum.ACTIVE }, ...tasks]);
      }
    }
  };

  const handleSelectAllCompleted = () => {
    setAllCompleted(+!allCompleted);
    setTasks((prevTask) =>
      prevTask.map((task) => ({
        ...task,
        status: allCompleted,
      }))
    );
  };

  const handleClearAllCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.status !== StatusEnum.COMPLETED));
  };

  const changeTab: Record<Tab, () => TaskInterface[]> = {
    [Tab.ALL]: () => tasks,
    [Tab.ACTIVE]: () => tasks.filter((item: TaskInterface) => item.status === StatusEnum.ACTIVE),
    [Tab.COMPLETED]: () => tasks.filter((item: TaskInterface) => item.status === StatusEnum.COMPLETED),
  };

  useEffect(() => {
    localStorage.setItem(StorageKey.TASK, JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="wrapper">
      <div className="todo">
        <TodoHeader handleSelectAllCompleted={handleSelectAllCompleted} handleSubmitByEnter={handleSubmitByEnter} />

        <TodoList tasks={tasks} setTasks={setTasks} changeTab={changeTab} currentTab={currentTab} />

        {tasks.length ? (
          <TodoFooter
            tasks={tasks}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            handleClearAllCompleted={handleClearAllCompleted}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Todo;
