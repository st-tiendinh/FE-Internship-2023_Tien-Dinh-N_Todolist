import React from 'react';

import './stylesheet/style.scss';
import Home from './app/core/pages/Home';

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1 className="header-title">
            todos <span className="header-logo">📒</span>
          </h1>
        </header>
        <main className="main">
          <div className="home-page">
            <Home />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
