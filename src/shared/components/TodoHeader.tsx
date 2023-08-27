import { ChangeEvent, useState } from 'react';

import completedAllBtn from '../../assets/images/ic-todo.svg';

interface TodoHeaderProps {
  handleSelectAllCompleted: () => void;
  handleHeaderInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>, input: string) => void;
}

const TodoHeader = ({ handleSelectAllCompleted, handleHeaderInputKeyDown }: TodoHeaderProps) => {
  const [input, setInput] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleHeaderInputKeyDown(e, input);
    if (e.key === 'Enter') {
      setInput('');
    }
  };

  return (
    <div className='todo-header'>
      <img src={completedAllBtn} onClick={handleSelectAllCompleted} alt='' className='todo-header-img' />
      <input
        className='todo-header-input'
        type='text'
        value={input}
        autoFocus
        onChange={handleInputChange}
        onKeyDown={handleSubmit}
        placeholder='What need to be done?'
      />
    </div>
  );
};

export default TodoHeader;
