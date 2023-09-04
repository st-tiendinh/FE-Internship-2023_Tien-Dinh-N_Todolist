import { TodoItem } from './TodoItem';
import { TaskProps, Tab } from '../../../../core/models/todoItem';

interface TodoListPropTypes {
  changeTab: Record<Tab, () => TaskProps[]>;
  currentTab: Tab;
}

export const TodoList = ({ changeTab, currentTab }: TodoListPropTypes) => {
  return (
    <ul className="todo-list">
      {changeTab[currentTab]().map((task: TaskProps) => {
        return <TodoItem key={task.id} {...task} />;
      })}
    </ul>
  );
};
