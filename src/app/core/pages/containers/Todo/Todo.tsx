import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { TodoHeader, TodoList, TodoFooter } from './components';

import { TaskInterface, StorageKey, StatusEnum, Tab } from '../../../models/todoItem';
import { StateInterface } from '../../../../../shared/redux/reducer';

export const Todo = () => {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.ALL);

  const tasks = useSelector((state: StateInterface) => state.tasks);

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
        <TodoHeader />

        <TodoList changeTab={changeTab} currentTab={currentTab} />

        {tasks.length ? <TodoFooter currentTab={currentTab} setCurrentTab={setCurrentTab} /> : ''}
      </div>
    </div>
  );
};
