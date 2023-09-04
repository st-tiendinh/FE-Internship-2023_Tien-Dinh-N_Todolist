import { memo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import completedAllBtn from '../../../../../assets/images/ic-todo.svg';

import { setAllCompleted, setTasks } from '../../../../../redux/action';
import { StatusEnum } from '../../../../core/models/todoItem';

export const TodoHeader = memo(() => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleChange = () => {
    setInput(inputRef.current!.value);
  };

  const handleSelectAllCompleted = () => {
    dispatch(setAllCompleted());
  };

  const handleSubmit = () => {
    if (inputRef.current!.value.trim()) {
      dispatch(
        setTasks({
          id: Date.now().toString(),
          title: inputRef
            .current!.value.split(' ')
            .filter((word) => word !== '')
            .join(' '),
          status: StatusEnum.ACTIVE,
        })
      );
    }
    inputRef.current!.value = '';
  };

  const handleSubmitByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="todo-header">
      <img
        src={completedAllBtn}
        onClick={handleSelectAllCompleted}
        alt=""
        className="todo-header-img"
      />
      <input
        className="todo-header-input"
        type="text"
        ref={inputRef}
        value={input}
        autoFocus
        onChange={handleChange}
        onBlur={handleSubmit}
        onKeyUp={handleSubmitByEnter}
        placeholder="What need to be done?"
      />
    </div>
  );
});
