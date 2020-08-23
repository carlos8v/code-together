import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io.connect('http://localhost:4000');

function App() {
  const [codeText, setCodeText] = useState('');

  useEffect(() => {
    document.querySelector("#canvas").contentWindow.document.querySelector('html').innerHTML = codeText;
  }, [codeText])

  function updateCode(event) {
    socket.emit('change', { text : event.target.value });
  }

  socket.on('newConnection', ({ text }) => {
    setCodeText(text);
  })

  socket.on('codeChanged', ({ text, id: connectionId }) => {
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
