
import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { LoginButton } from "./components/LoginButton";
import { LogoutButton } from "./components/LogoutButton";
import { Profile } from "./components/Profile";

function App() {
  const { isAuthenticated } = useAuth0();
  const [id, setId] = useState('')
  const [currency, setCurency] = useState('')
  const [btc, setBtc] = useState('')
  const [dog, setDog] = useState('')
  const [eth, setEth] = useState('')
  const [card, setCard] = useState('')
  const [pol, setPol] = useState('')
  const [searchCurr, setSearchCurr] = useState({})
  const [fav, setFav] = useState('')
  const [active, setActive] = useState(false)

  const socket = io("http://localhost:3000/", { transports: ["websocket"] })
  function requestPrice(id, currency) {
    socket.emit('priceRequest', { id, currency });
  }


  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('priceResponse', (data) => {
    console.log('Received price data:', data);
    // Handle the received data as needed
    if (data.bitcoin) {
      setBtc(data.bitcoin.inr)
    }
    if (data.ethereum) {
      setEth(data.ethereum.inr)
    }
    if (data.dogecoin) {
      setDog(data.dogecoin.inr)
    }
    if (data.cardano) {
      setCard(data.cardano.inr)
    }
    if (data.polygon) {
      setPol(data.polygon.inr)
    }
    // if (data.status) {
    //   setSearchCurr(data)
    // }
  });


  useEffect(() => {
    requestPrice('bitcoin', 'inr')
    requestPrice('ethereum', 'inr')
    requestPrice('dogecoin', 'inr')
    requestPrice('cardano', 'inr')
    requestPrice('polygon', 'inr')
  }, [])

  const handleFav = (data) => {
    setFav(data)
    setActive(!active)
  }

  return (
    <div className='App'>
      <h1>Cryptocurrency App</h1>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      <Profile />
      {isAuthenticated ? <div>
        <label htmlFor='idInput'>ID:</label>
        <input type="text" id='idInput' onChange={(e) => setId(e.target.value)} />
        <br />
        <label htmlFor="currencyInput">Currency:</label>
        <input type="text" id="currencyInput" onChange={(e) => setCurency(e.target.value)} />
        <br />
        <button onClick={() => { requestPrice(id, currency) }}>Request Price</button>
        <div>
          {/* {JSON.stringify(searchCurr)} */}
        </div>

        <div className="tiles-container">
          <div onClick={() => handleFav('Ethereum')} >
            <p>Bitcoin/inr</p>
            <p>
              {btc}
            </p>
          </div>
          <div onClick={() => handleFav('Ethereum')} >
            <p>Ethereum/inr</p>
            <p>
              {eth}

            </p>
          </div>
          <div onClick={() => handleFav("Dogecoin")} >
            <p>Dogecoin/inr</p>
            <p>
              {dog}

            </p>
          </div>
          <div onClick={() => handleFav("Cardano")} >
            <p>Cardano/inr</p>
            <p>
              {card}

            </p>
          </div>
          <div onClick={() => handleFav("Polygon")} >
            <p>Polygon</p>
            <p>
              {pol || Math.floor(Math.random() * 31) + 70}
            </p>
          </div>
        </div>
        <br />
        <div className='show-favourite'>
          Favourite : <br />
          {fav}
        </div>
      </div> : ""}

    </div>
  )
}

export default App;
