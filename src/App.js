import React, { useState } from "react"
import './App.css';
import Convert from './components/Convert';

function App() {
  const [text, setText] = useState("");
  const textLength = text.length;
  
  return (
    <div className="App">
      <div className="app-inner">
        <div className="col">
          <div className={`input-wrapper textarea-wrapper ${textLength !== 0 ? 'text-added' : ""}`}>
            <textarea onChange={e => setText(e.target.value)} name="inputText" id="inputText" placeholder="Ingrese texto en español aquí" value={text.text}></textarea>
          </div>
        </div>
        <div className="col">
          <Convert text={text} language="en" />
        </div>
      </div>
    </div>
  );
}

export default App;
