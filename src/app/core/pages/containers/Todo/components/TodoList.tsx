import TodoItem from './TodoItem';
import { Tab, TaskInterface } from '../../../../models/todoItem';

interface TodoListPropTypes {
  changeTab: Record<Tab, () => TaskInterface[]>;
  currentTab: Tab;
}

export const TodoList = ({ changeTab, currentTab }: TodoListPropTypes) => {
  return (
    <ul className="todo-list">
      {changeTab[currentTab]().map((task: TaskInterface) => {
        return <TodoItem key={task.id} {...task} />;
      })}
    </ul>
  );
};
