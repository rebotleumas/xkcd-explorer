import { Main } from './components/Main';
import { Header } from './components/Header';
import { useState } from 'react';

function App() {
  const currentDate = new Date();
  const [filter, setFilter] = useState({});
  
  return (
    <div>
      <Header setFilter={setFilter} filter={filter} />
      <Main setFilter={setFilter} filter={filter} />
    </div>
  )
}

export default App;
