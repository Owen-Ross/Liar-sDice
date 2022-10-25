import Opponent from "./components/Opponent"
import CurrentBid from "./components/CurrentBid"
import UserHand from "./components/UserHand"
import StartGame from "./components/StartGame"
import { nanoid } from 'nanoid'
import React from "react"
import './style.css'

function App() {

    // Will hold all of the dice values for the user
    const[userDice, setUserDice] = React.useState(generateDice())
    // Will hold all of the dice values for the opponents
    const[opponents, setOpponents] = React.useState([{}])
    const[hasGameStarted, setHasGameStarted] = React.useState(false)
    // Will hold the number of opponents the user wanted to play against
    const[numberOfOpponents, setNumberOfOpponents] = React.useState()

    /**
     * This function will generate an array of random numbers between 1 and 6,
     * this will be executed after every round
     * @param {*} numOfDice The number of dice that is left in a hand
     * @returns An array of numbers that will represent their hand for a round
     */
    function generateDice(numOfDice) {
        const newDice = []
        for(let i = 0; i < numOfDice; i++) {
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

        // Sets the hasGameStarted to true, which will hide the StartGame component and start the game
        setHasGameStarted(prevState => !prevState)

        /* Will call the generateOpponents function and store the returned array to state, this array will
           represent all of the opponents the user will play against*/
        setOpponents(generateOpponents())
    }

    function generateOpponents() {
        const opponentsArray = []
        for(let i = 0; i < numberOfOpponents; i++) {
            opponentsArray.push({
                id: nanoid(),
                numberOfDiceLeft: 5,
                hand: generateDice(5)
            })
        }
        return opponentsArray
    }

    function generateOpponentElements() {
        const opponentElements = opponents.map(opponent => <Opponent opponent={opponent}/>)
        return opponentElements
    }

    return(
        <main className="app--container">
            {!hasGameStarted && <StartGame handleChange={handleChange} numberOfOpponents={numberOfOpponents} handleStart={handleStart}/>}
            <div>
                {hasGameStarted && generateOpponentElements()}
            </div>
        </main>
    )
}
export default App