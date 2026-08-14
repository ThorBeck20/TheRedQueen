import { useState, useEffect } from 'react';
import SimpleLineChart from './components/SimpleLineChart'
import axios from 'axios';
import './App.css';


  var test_seriesX = Array.from({length: 50}, (_,i) => i)
  var test_seriesY = Array.from({length: 50}, () => Math.random() * 50)

function App() {
  const [data, setData] = useState([]);
  const [obStart, setObStart] = useState("1776-07-04");
  const [obEnd, setObEnd] = useState("9999-12-31");


  useEffect(() => {
    axios.get('http://localhost:8000/bonds/series/DGS1MO', {
      params: {
        ob_start: `${obStart}`,
        ob_end: `${obEnd}`,
        frequency: "d",
        units: "lin"
      }
    })
      .then(response => {
        setData(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, [obStart, obEnd]);

  return (
    <>
      <section id="center">
        <div>
          <SimpleLineChart 
            seriesX={test_seriesX}
            seriesY={test_seriesY} 
            title="Test Chart!"
            width={600}
            height={600}
          />
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
