// import './App.css'
import Clothes from './components/Clothes'
import Header from './components/Header';

import { useEffect, useState } from 'react'

function App() {
  const [clothes, setClothes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClothes() {
      try {
        console.log("Zaczynam pobieranie danych");
        const response = await fetch("http://localhost:8081/api/clotheses");
        console.log("Koniec pobierania danych");

        if (!response.ok) {
          setError("Error fetching data");
          return;
        }

        const data = await response.json();
        setClothes(data._embedded.clotheses);
        console.log("Ubrania: ", data._embedded.clotheses);
      } catch (error) {
        console.error(error);
      }
    }
    //fetchClothes();
  }, []);

  return (
    <>
      <Header />
      <Clothes clothes={clothes}/>
    </>
  )
}

export default App
