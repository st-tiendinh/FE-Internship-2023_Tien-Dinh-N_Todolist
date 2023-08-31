import { useDispatch, useSelector } from 'react-redux';

import { StatusEnum, Tab } from '../../../../../app/core/models/todoItem';
import { clearAllCompleted } from '../../../../../redux/action';
import { StateInterface } from '../../../../../redux/reducer';

interface TodoFooterPropTypes {
  currentTab: Tab;
  setCurrentTab: (tab: Tab) => void;
}

export const TodoFooter = ({ currentTab, setCurrentTab }: TodoFooterPropTypes) => {
  const tabs = [Tab.ALL, Tab.ACTIVE, Tab.COMPLETED];
  const tasks = useSelector((state: StateInterface) => state.tasks);
  const dispatch = useDispatch();

  const handleClearAllCompleted = () => {
    dispatch(clearAllCompleted());
  };

  return (
    <div className="todo-footer">
      <span className="todo-footer-quantity">
        {tasks.filter((task) => task.status === StatusEnum.ACTIVE).length} item(s) left
      </span>
      <ul className="todo-filter-list">
        {tabs.map((tab, index) => (
          <li key={index} className="todo-filter-item" onClick={() => setCurrentTab(tab)}>
            <span className={`todo-filter-type ${tab === currentTab && 'active'}`}>{tab}</span>
          </li>
        ))}
      </ul>

      <span className="todo-clear-completed" onClick={handleClearAllCompleted}>
        Clear Completed
      </span>
    </div>
  );
};
