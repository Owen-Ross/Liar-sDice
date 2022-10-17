import OpponentHand from "./components/OpponentHand"
import CurrentBid from "./components/CurrentBid"
import UserHand from "./components/UserHand"
import StartGame from "./components/StartGame"
import React from "react"

function App() {

    // Will hold all of the dice values for the user
    const[userDice, setUserDice] = React.useState(generateDice())
    // Will hold all of the dice values for the opponents
    const[opponentDice, setOpponentDice] = React.useState([])
    const[hasGameStarted, setHasGameStarted] = React.useState(false)
    // Will hold the number of opponents the user wanted to play against
    const[numberOfOpponents, setNumberOfOpponents] = React.useState()


    function generateDice() {
        const newDice = []
        for(let i = 0; i < 5; i++) {
            newDice.push(Math.ceil(Math.random() * 6))
        }
        return newDice
    }

    /* Will be used to update the value when the user changes the number of opponents they
       want to play against */
    function handleChange(event) {
        setNumberOfOpponents(event.target.value)
    }

    /* This will be executed once the start game button is clicked, it will take the number 
       of opponents the user wants to play against, and it will start the game */
    function handleStart(event) {
        event.preventDefault()

    }

    return(
        <main>
            {!hasGameStarted && <StartGame handleChange={handleChange} numberOfOpponents={numberOfOpponents} handleStart={handleStart}/>}
        </main>
    )
}
export default App