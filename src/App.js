import Bot from './components/Bot';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import './App.css'

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://json-bot-server-3sd4.onrender.com/bots")
      .then((res) => res.json())
      .then((bots) => {
        setData(bots);
      });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={data && <Bot bots={data} />} />
      </Routes>
    </div>
  );
}

export default App;