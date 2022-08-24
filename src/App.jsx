import React from "react"
import Dice from "./components/Dice"
import Confetti from "react-confetti"
import {nanoid} from "nanoid"

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const firstValue = dice[0].value
    const allHeld = dice.every(num => num.isHeld)
    const allSameValue = dice.every(num => num.value === firstValue)

    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
  }
  }, [dice]) 


  function allNewDice() {
    const nums = []
    for(let i = 0; i < 10; i++) {
      nums.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return nums
  }


  function rollDice() {
    if(!tenzies) {
      setDice(prevDice => prevDice.map(num => {
        return num.isHeld ? num : {value: Math.ceil(Math.random() * 6), isHeld: false, id:nanoid()}
      }))
    }
    else {
      setDice(allNewDice)
      setTenzies(false)
    }
  }


  function holdDice(id) {
    setDice(prevDice => prevDice.map(num => {
      return num.id === id ? {...num, isHeld: !num.isHeld} : num
    }))
  }


  const diceElements = dice.map(num => <Dice key={num.id} value={num.value} isHeld={num.isHeld} hold={() => holdDice(num.id)} />)


  return (
    <main>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

      <div className="dice-container">
        {diceElements}
      </div>

      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>

      {tenzies && <Confetti />}
    </main>
  )
}
