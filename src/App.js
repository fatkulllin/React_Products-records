import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import SaveProduct from './SaveProduct';
import Products from './Products';
import Graph from './Graph';
import AllSumCat from './allSumCat';

function App() {
  const dispatch = useDispatch()
  const records = useSelector(state => state.records)

  const date = new Date();
  let day = addZero(date.getDate());
  let month = addZero(date.getMonth() + 1);
  let year = date.getFullYear();
  const todayDate = `${year}-${month}-${day}`

  function addZero(num) {
    if (num >= 0 && num <= 9) {
      return '0' + num;
    } else {
      return num;
    }
  }



  // Контекст реакт
  // refs этот querySelector
  // linter



  const [minRange, setMinRange] = useState('')
  const [maxRange, setMaxRange] = useState('')
  const startRange = (event) => {
    setMinRange(event.target.value)
  }
  const endRange = event => {
    setMaxRange(event.target.value)
  }

  const [installDay, setInstallDay] = useState('')
  const editInstallDay = event => {
    setInstallDay(event.target.value)
  }

  return (
    <div>
      <div>

        <div>
          <SaveProduct dispatch={dispatch} records={records} todayDate={todayDate} />

          <Products installDate={todayDate} />

        </div>

        <div>
          <h1>Вывести продукты за определенный день</h1>
          <input type="date" value={installDay} onChange={event => editInstallDay(event)} />
          <Products installDate={installDay} />
        </div>

        <div>
        <h1>Вывести продукты за определенный период</h1>
          <input type="date" value={minRange} onChange={event => startRange(event)} />
          <input type="date" value={maxRange} onChange={event => endRange(event)} />
          <Products minRange={minRange} maxRange={maxRange} />
        </div>

        <AllSumCat />
        <Graph installDay={installDay} minRange={minRange} maxRange={maxRange} />

      </div>
    </div>
  )
}

export default App;
