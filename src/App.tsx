import { FC, useState } from 'react';
import './App.scss';
import { GoodsList } from './Components/GoodsList';
import { GoodForm } from './Components/GoodForm';
import { useAppContext } from './Context/AppContext';

export const App: FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    colors,
    addGood,
  } = useAppContext();

  const [counter, setCounter] = useState(0);

  return (
    <>
      <h1 className="appTitle">Goods list</h1>

      <input
        type="search"
        placeholder="Search"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      <div>
        <h2>Counter</h2>
        <button
          type="button"
          onClick={() => setCounter(prev => prev + 1)}
        >
          {counter}
        </button>
      </div>

      <div className="appContainer">
        <GoodsList />

        <GoodForm
          colors={colors}
          onSubmit={addGood}
          submitButtonText="Add good"
        />
      </div>
    </>
  );
};
