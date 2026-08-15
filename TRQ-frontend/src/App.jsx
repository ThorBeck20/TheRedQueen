import { useState, useEffect } from 'react';
import ChartContainer from './components/ChartContainer';
import './App.css';

  // var test_seriesX = Array.from({length: 50}, (_,i) => i)
  // var test_seriesY = Array.from({length: 50}, () => Math.random() * 50)

function App() {


  return (
    <>
      <section id="center">
        <div>
          { 
            <ChartContainer />
          }
        </div>
        <ul>
          {/* {data.map(d => (
            <li key={d}></li>
          ))} */}
        </ul>

      </section>
    </>
  )
}

export default App
