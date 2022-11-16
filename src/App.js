import './App.css';
import React, { useEffect } from 'react';
import {useState} from 'react';
import { nanoid } from 'nanoid';
import Confetti from "react-confetti";

import Dice from './Dice';

function App() {
  const [tenzi, setTenzi] = useState(false)
  const [dice, setDice] = useState(() => initialDice())

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
    if(tenzi) setDice(initialDice())
    else {
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
    // maybe more intuitive
    let firstValue = dice[0].value
    let allSameValue = dice.every(die => die.value === firstValue)
    setTenzi(allSameValue)

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
      {tenzi && <Confetti />}
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
        <button onClick={rollDice}>{tenzi? "Start New Game":"Roll"}</button>
      </section>
    </main>
  );
}

export default App;
