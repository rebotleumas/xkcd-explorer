import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { fetchXkcd, Xkcd } from './services/xkcd';

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetchXkcd(100, 150).then(response => response.json()).then(json => console.log(json));
  }, []);

  return (
    <>
      <h1>XKCD explorer</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
