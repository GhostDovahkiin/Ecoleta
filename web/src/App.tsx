import React, { useState } from 'react';
import './App.css';
import Header from './Header';

// JSX/TSX: Sintaxe de JavaScript ou TypeScript dentro da aplicação

function App() {
  let [counter, setCounter] = useState(10);

  function handleButtonClick() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <Header title="MIAU"></Header>
      <h1>{counter}</h1>
      <h1>{counter * 2}</h1>
      <button type='button' onClick={handleButtonClick}>AUMENTAR</button>
    </div>
  );
}

export default App;
