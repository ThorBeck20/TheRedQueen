import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

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
      })
      .catch(error => {
        console.error(error);
      });
  }, [obStart, obEnd]);

  return (
    <>
      <section id="center">
        <ul>
          {data.map(d => (
            <li key={d}></li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default App
