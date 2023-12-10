import React, { useState, useEffect } from 'react';
import '../style.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const generateRandomQrCode = async () => {
      try {
        const text = "情報科学科, 「5422074:馬場光希」";
        const size = 100; 
        const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&size=${size}x${size}`);
        setQrCodeUrl(response.url);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateRandomQrCode();
  }, []); 

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>メモ帳</h1>
        <div>
          <input
            type="text"
            placeholder="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => removeTask(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <div className ="maker">
          <h2>作成者</h2>
          {qrCodeUrl && <img src={qrCodeUrl} alt="作成者" />}
        </div>
      </header>
    </div>
  );
}

export default App;
