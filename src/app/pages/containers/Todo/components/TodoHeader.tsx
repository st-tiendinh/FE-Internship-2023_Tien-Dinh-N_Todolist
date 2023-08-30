import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import completedAllBtn from '../../../../../assets/images/ic-todo.svg';

import { setAllCompleted, setTasks } from '../../../../../shared/redux/action';
import { StatusEnum } from '../../../../core/models/todoItem';

export const TodoHeader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleSelectAllCompleted = () => {
    dispatch(setAllCompleted());
  };

  const handleSubmitByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = inputRef.current!.value;
    if (e.key === 'Enter' && inputValue.trim()) {
      dispatch(setTasks({ id: uuidv4(), title: inputValue.trim(), status: StatusEnum.ACTIVE }));
      inputRef.current!.value = '';
    }
  };

  return (
    <div className="todo-header">
      <img src={completedAllBtn} onClick={handleSelectAllCompleted} alt="" className="todo-header-img" />
      <input
        className="todo-header-input"
        type="text"
        ref={inputRef}
        autoFocus
        onKeyUp={handleSubmitByEnter}
        placeholder="What need to be done?"
      />
    </div>
  );
};
