import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io.connect('http://localhost:4000');

function App() {
  const [codeText, setCodeText] = useState('');

  useEffect(() => {
    document.querySelector("#canvas").contentWindow.document.querySelector('html').innerHTML = codeText;
    document.querySelector("#text-area").innerHTML = codeText;
    
  }, [codeText])

  function updateCode(event) {
    setCodeText(event.target.value);
    socket.emit('codeChanged', event.target.value);
  }

  socket.on('codeChanged', ({ text }) => {
    setCodeText(text);
  })

  return (
    <div id="app">
      <div id="wrapper">
        <div id="text-container">
          <span>code-together v1.0</span>
          <textarea id="text-area" onChange={e => updateCode(e)} value={codeText}/>
        </div>
        <iframe title="Canvas" id="canvas"></iframe>
      </div>
    </div>
  );
}

export default App;
