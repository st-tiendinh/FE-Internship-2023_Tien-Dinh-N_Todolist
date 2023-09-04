import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { TodoHeader, TodoList, TodoFooter } from './components';

import { TaskProps, StorageKey, StatusEnum, Tab } from '../../../../app/core/models/todoItem';
import { StateInterface } from '../../../../redux/reducer';

export const Todo = () => {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.ALL);
  const tasks = useSelector((state: StateInterface) => state.tasks);
  const changeTab: Record<Tab, () => TaskProps[]> = useMemo(() => {
    return {
      [Tab.ALL]: () => tasks,
      [Tab.ACTIVE]: () => tasks.filter((item: TaskProps) => item.status === StatusEnum.ACTIVE),
      [Tab.COMPLETED]: () =>
        tasks.filter((item: TaskProps) => item.status === StatusEnum.COMPLETED),
    };
  }, [tasks]);

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
