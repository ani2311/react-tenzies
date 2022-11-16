import './App.css';
import React, { useEffect } from 'react';
import {useState} from 'react';
import { nanoid } from 'nanoid';
import Confetti from "react-confetti";

import Dice from './Dice';

function App() {
  const [tenzi, setTenzi] = useState({
    complete: false,
    roll: 0,
    bestRoll: parseInt(localStorage.getItem('best-roll')) || 0,
    newBestRoll: false
  })
  const [dice, setDice] = useState(() => initialDice())
  // const [roll, setRoll] = useState(0)
  // const [newBestRoll, setNewBestRoll] = useState(false)
  // const [bestRoll, setBestRoll] = useState(
  //   () => localStorage.getItem('best-roll') || 0)
  const bestRollStyle = {
    color: tenzi.newBestRoll?"yellow":"#fff",
    fontWeight: tenzi.newBestRoll?900:500
  }
  function initialDice() {
    return [...Array(10)].map(createDice)
  }
  function createDice() {
    return {
      "dieId": nanoid(),
      "isLocked": false,
      "value": Math.ceil(Math.random()*6)
    }
  }
  function rollDice() {
    if(tenzi.complete) {
      setDice(initialDice())
      setTenzi(prevTenzi => {
        return {
          ...prevTenzi,
          complete: false,
          roll: 0,
          newBestRoll: false
        }
      })
    }
    else {
      setTenzi(prevTenzi =>  {
        return {
          ...prevTenzi, 
          roll: prevTenzi.roll + 1
        }
      })
      setDice(prevDice => {
          return prevDice.map(die => {
            return die.isLocked?
            die:
            createDice()
        })
      })
    }
  }

  function lockDie(dieId) {
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.dieId === dieId?
        {
          ...die,
          'isLocked': !die.isLocked
        }:die
      })
    })
  }

  useEffect(() => {
    // may be more intuitive
    let firstValue = dice[0].value
    let allSameValue = dice.every(die => die.value === firstValue)
    if(allSameValue) {
      if(!tenzi.bestRoll | (tenzi.bestRoll && tenzi.roll < tenzi.bestRoll)) {
        localStorage.setItem('best-roll', tenzi.roll)
        setTenzi(prevTenzi => {
          return {
            ...prevTenzi,
            bestRoll: prevTenzi.roll,
            newBestRoll: true
          }
        })
      }
      setTenzi(prevTenzi => {
        return {
          ...prevTenzi,
          complete: true,
        }
      })
    }


    //check dice
    // let gameoverFlag = true
    // for(let i = 0;i < dice.length - 1;i++) {
    //   if(dice[i].value!==dice[i+1].value) {
    //     gameoverFlag = false
    //     break
    //   }
    // }
    // setGameOver(gameoverFlag)
  }, [dice])

  return (
    <main className="App">
      {tenzi.complete && <Confetti />}
      <section className="header">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same.
          Click each die to freeze it as its current value between rolls.</p>
      </section>
      <section className="dice-pool">
      { 
        dice.map(die => <Dice lockDie={lockDie} 
                              key={die.dieId}
                              die={die}
                              />)
      }
      </section>
      <section>
        <button onClick={rollDice}>{tenzi.complete?"Start New Game":"Roll"}</button>
      </section>
      <section className="roll-record">
        <div>Current Roll Count: {tenzi.roll}</div>
        <div style={bestRollStyle}>
          Best Rolls: {tenzi.bestRoll===0?"N/A":tenzi.bestRoll}
        </div>
      </section>
    </main>
  );
}

export default App;
