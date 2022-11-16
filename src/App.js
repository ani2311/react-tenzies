import './App.css';
import React, { useEffect } from 'react';
import {useState} from 'react';

import Dice from './Dice';

function App() {
  const [gameover, setGameOver] = useState(false)
  const [dices, setDice] = useState(() => initialDices())

  function initialDices() {
    return [...Array(10)].map(dice => { 
      return {
        "diceId": Math.round(Math.random()*(100-1)),
        "locked": false,
        "value": Math.round(Math.random()*(6-1))
      }
    })
  }
  function startGame() {
    setDice(initialDices())
  }
  function toastDice() {
    setDice(prevDices => {
        return prevDices.map(dice => {
          return dice.locked?
          {...dice}:
          {
            ...dice,
            'value': Math.floor(Math.random()*(6-1))
          }
      })
    })
  }

  function lockDice(diceId) {
    setDice(prevDices => {
      return prevDices.map(dice => {
        return dice.diceId === diceId?
        {
          ...dice,
          'locked': !dice.locked
        }:{...dice}
      })
    })
  }

  useEffect(() => {
    //check dices
    let gameoverFlag = true
    for(let i=0;i<dices.length-1;i++) {
      if(dices[i].value!==dices[i+1].value) {
        gameoverFlag = false
        break
      }
    }
    setGameOver(gameoverFlag)
  }, [dices])

  return (
    <main className="App">
      <section className="header">
        <h1>Tenzies</h1>
      </section>
      <section className="dice-pool">
      { 
        dices.map(dice => <Dice lockDice={lockDice} 
                                value={dice.value} 
                                diceId={dice.diceId}
                                locked={dice.locked}/>)
      }
      </section>
      <section>
        {gameover? <button onClick={startGame}>Start New Game</button>: 
          <button onClick={toastDice}>Toast</button>
        }
      </section>
    </main>
  );
}

export default App;
