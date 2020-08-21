import React, { useState } from 'react';
import './App.css';

function App() {
  const [codeText, setCodeText] = useState('');

  function updateCode(event) {
    
    const canvas = document.querySelector("#canvas").contentWindow.document.querySelector('html');
    canvas.innerHTML = event.target.value;

    setCodeText(event.target.value);
  }

  return (
    <div id="app">
      <div id="wrapper">
        <div id="text-container">
          <span>code-together v1.0</span>
          <textarea id="text-area" onChange={updateCode} value={codeText}/>
        </div>
        <iframe title="Canvas" id="canvas"></iframe>
      </div>
    </div>
  );
}

export default App;
