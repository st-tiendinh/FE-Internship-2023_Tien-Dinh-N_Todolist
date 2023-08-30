import TodoItem from './TodoItem';
import { Tab, TaskInterface } from '../../app/core/models/todoItem';

interface TodoListPropTypes {
  tasks: TaskInterface[];
  setTasks: (tasks: TaskInterface[]) => void;
  changeTab: any;
  currentTab: Tab;
}

const TodoList = ({ tasks, setTasks, changeTab, currentTab }: TodoListPropTypes) => {
  return (
    <ul className="todo-list">
      {changeTab[currentTab]().map((task: TaskInterface) => {
        return <TodoItem key={task.id} {...task} setTasks={setTasks} tasks={tasks} />;
      })}
    </ul>
  );
};

export default TodoList;
