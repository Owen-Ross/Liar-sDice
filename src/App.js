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
    const[numberOfOpponents, setNumberOfOpponents] = React.useState(0)


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

    }

    return(
        <main>
            {!hasGameStarted && <StartGame handleChange={handleChange} />}
        </main>
    )
}
export default App