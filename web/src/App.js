import React, { useState, useMemo } from 'react';

import './App.css';

import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

function App() {
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '<h1 style="font-weight: bold; color: #006c7c;">Code with the world :)</h1>' }],
    },
  ]);

  const editor = useMemo(() => withReact(createEditor()), [])

  function renderCode(newValue) {
    document.querySelector("#canvas").contentWindow.document.querySelector('html').innerHTML = newValue[0].children[0].text;
    setValue(newValue);
  }

  return (
    <div id="app">
      <div id="wrapper">
        <Slate
          editor={editor}
          value={value}
          onChange={newValue => renderCode(newValue)}
        >
          <Editable id="text-area" />
        </Slate>
        <iframe title="canvas" id="canvas" />
      </div>
    </div>
  );
}

export default App;
