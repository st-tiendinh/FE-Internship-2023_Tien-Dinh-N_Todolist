import React from 'react';
import TodoList from './components/TodoList';
import './stylesheet/style.scss';

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <header className='header'>
          <h1 className='header-title'>
            todos <span className='header-logo'>📒</span>
          </h1>
        </header>
        <main className='main'>
          <div className='home-page'>
            <TodoList />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
