import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';


export interface ResultProps {
  count: number,
  name: string,
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
}



function App() {
  const [urlBase, seturlBase,] = useState(1)
  const [countPerson, setCountPerson,] = useState(0)
  const [personForPage, setpersonForPage,] = useState(0)
  const [personData, setPersonData] = useState<ResultProps[]>([])

  function next() {
    if (urlBase >= 10) {
      alert('Você já está na ultima página ')
      seturlBase(10)
    }
    else {
      seturlBase(urlBase + 1)
      fetchPerson()
    }
  }

  function prev() {
    if (urlBase === 1) {
      alert('Você já está na ultima página ')
      seturlBase(1)
    }
    else {
      seturlBase(urlBase - 1)
      fetchPerson()
    }
  }


  const fetchPerson = async () => {
    try {
      const res = await axios.get(`https://swapi.dev/api/people/?page=` + urlBase);
      setCountPerson(res.data.count);
      setpersonForPage(res.data.results.length)
      setPersonData(res.data.results)
      getPersons()
    } catch (err) {
      console.log(err);
    }
  };

  function getPersons() {
    for (let persons of personData) {
      console.log(`Name: ${persons.name}  Height: ${Number(persons.height) / 100} m Mass: ${persons.mass} kgs`)
    }

  }

  useEffect(() => {
    fetchPerson()
  }, [])

  return (
    <div className="App">
      <h1>Star Wars Wiki</h1>
      <h3>Page: {urlBase}</h3>
      <div className="card">
        <p>Total : {countPerson} characters</p>

      </div>
      <p className="read-the-docs">
        Characters for Page : {personForPage}
      </p>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <button onClick={getPersons}>Update Page</button>
        <button onClick={next}>Next Page</button>
        <button onClick={prev}>Previos Page</button>

      </div>

    </div>
  )
}

export default App
