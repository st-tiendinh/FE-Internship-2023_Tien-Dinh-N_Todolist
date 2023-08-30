import { StatusEnum, Tab, TaskInterface } from '../../app/core/models/todoItem';

interface TodoFooterPropTypes {
  tasks: TaskInterface[];
  handleClearAllCompleted: () => void;
  currentTab: Tab;
  setCurrentTab: (tab: Tab) => void;
}

const TodoFooter = ({ tasks, handleClearAllCompleted, currentTab, setCurrentTab }: TodoFooterPropTypes) => {
  const tabs = [Tab.ALL, Tab.ACTIVE, Tab.COMPLETED];
  return (
    <div className="todo-footer">
      <span className="todo-footer-quantity">
        {tasks.filter((task) => task.status === StatusEnum.ACTIVE).length} items left
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

export default TodoFooter;
