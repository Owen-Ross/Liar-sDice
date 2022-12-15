import Header from "./components/Header"
import Opponent from "./components/Opponent"
import CurrentBid from "./components/CurrentBid"
import UserHand from "./components/UserHand"
import StartGame from "./components/StartGame"
import { nanoid } from 'nanoid'
import React from "react"
import './style.css'
import UserBid from "./components/UserBid"

function App() {

    // Will hold all of the dice values for the user
    const[user, setUser] = React.useState({
        id: nanoid(),
        numberOfDiceLeft: 5,
        hand: generateDice(5)
    })
    // Will hold all of the dice values for the opponents
    const[opponents, setOpponents] = React.useState([{}])
    // Will hold a boolenan value that will signal if the user has started the game or not
    const[hasGameStarted, setHasGameStarted] = React.useState(false)
    // Will hold the number of opponents the user wanted to play against
    const[numberOfOpponents, setNumberOfOpponents] = React.useState(1)
    // Will hold the quantity value of the current bid
    const[currentQuantity, setCurrentQuantity] = React.useState(1)
    // Will hold the face value of the current bid
    const[currentFace, setCurrentFace] = React.useState(1)
    // Will hold a boolean value that will signal if it is currently the user's turn
    const[isUsersTurn, setIsUsersTurn] = React.useState(false)
    // Will hold the array of the quantity values that can be selected for a bid
    const [quantityArray, setQuatityArray] = React.useState([])
    // Will hold the array of the face values that can be selected for a bid
    const [faceArray, setFaceArray] = React.useState([])
    const [currentPlayer, setCurrentPlayer] = React.useState({})

    /**
     * This function will generate an array of random numbers between 1 and 6,
     * this will be executed after every round
     * @param {*} numOfDice The number of dice that is left in a hand
     * @returns An array of numbers that will represent their hand for a round
     */
    function generateDice(numOfDice) {
        const newDice = []
        for(let i = 0; i < numOfDice; i++) {
            // Getting a random number between 1 and 6, this will represent the number on the face of the dice
            newDice.push(Math.ceil(Math.random() * 6))
        }
        // Returning an array of random numbers which will represent each a hand of dice
        return newDice
    }

    /* Will be used to update the value when the user changes the number of opponents they
       want to play against */
    function handleChange(event) {
        setNumberOfOpponents(event.target.value)
    }

    /* Will be used to update the currentQuantity value every time the user selects a value */
    function handleQuantity(event) {
        setCurrentQuantity(event.target.value)
    }

    /* Will be used to update the currentFace value every time the user selects a value */
    function handleFace(event) {
        setCurrentFace(event.target.value)
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

        setIsUsersTurn(prevState => !prevState)
    }

    /**
     * This function will generate opponent objects when the user first starts the game.
     * The number of opponents that are generated, depend on the number of opponents the
     * use chose to play against
     * @returns an array of opponent objects
     */
    function generateOpponents() {
        const opponentsArray = []
        for(let i = 0; i < numberOfOpponents; i++) {
            // Creating an opponent object and pushing it to the opponentsArray
            opponentsArray.push({
                // Using the nanoid library to generate an unique id for th eopponent
                id: nanoid(),
                numberOfDiceLeft: 5,
                hand: generateDice(5)
            })
        }
        // Returing an array filled with opponent objects
        return opponentsArray
    }


    /**
     * This function will map through the opponents array and create an array of Opponent components
     * @returns An array filled with Opponent components
     */
    function generateOpponentElements() {
        const opponentElements = opponents.map((opponent, index) => <Opponent key={opponent.id} opponent={opponent} name={"Opponent " + (index + 1)}/>)
        // Returning an array filled with opponent components
        return opponentElements
    }

    /**
     * This function will be triggered when the user submits their bid, then the current player will be
     * set to the first opponent and the isUsersTurn will be set ot false
     */
    function handleBid(event) {
        event.preventDefault()

        // set isUsersTurn to false, becuase it is no longer the users turn
        setIsUsersTurn(prevState => !prevState)
        // set the currentPlayer to the first opponent
        setCurrentPlayer(opponents[0])
    }

    /**
     * This function will be triggered when the next button is clicked, it will determine what the opponent's bid
     * will be or if they will challenege the previous bid
     */
    function handleNext() {
        // declaring the variables that will hold all of the face and quantity options the opponent to choose from
        const quantityOptions = []
        const faceOptions = []
        // this will determine whether the opponent will choose to challenge the previous bid or place one
        const option = Math.floor(Math.random() * 2)
        // declaring the variables that will hold the face and quantity for the opponents bid
        let quantityBid
        let faceBid

        // populating the quatityOptions array with all of the possible quantity values the opponent can choose
        for(let i = currentQuantity; i < quantityArray.length; i++) {
            // adding the value of i to the quatityOptions array
            quantityOptions.push(i)
        }

        // populating the faceOptions array with all of the possible face values the opponent can choose
        for(let i = currentFace; i < faceArray.length; i++) {
            // adding the value of i to the faceOptions array
            faceOptions.push(i)
        }

        /* checking if the option value is equal to 1, if it is then the previous bid will be challenged, if
           it's not, then the opponent will place a bid */
        if(option === 1) {
            challengeBid()
        } else {
            /* getting a random value from the quantityOptions and faceOptions arrays that will be the opponent's bid,
               then the face and quantity will be set as the new current bid */
            setCurrentQuantity(quantityOptions[Math.floor(Math.random() * quantityOptions.length)])
            setCurrentFace(faceOptions[Math.floor(Math.random() * faceOptions.length)])
        }

    }

    function challengeBid() {
        console.log("bid challenged")
    }

    // Populate both of the quantity and face arrays with all of the values that can be selected for a bid
    React.useEffect(() => {
        const quantityOptions = []
        const faceOptions = []

        /* Loops through all of the quantity options that can be selected for a bid, starting at the quantity in the current bid */
        for(let i = currentQuantity; i < 6; i++) {
            quantityOptions.push(i)
        }

        /* Loops through all of the face options that can be selected for a bid, starting at the face in the current bid */
        for(let i = currentFace; i < 7; i++) {
            faceOptions.push(i)
        }
        setQuatityArray(quantityOptions)
        setFaceArray(faceOptions)
    }, [isUsersTurn])

    return(
        <main className="app--container">
            <Header />
            {!hasGameStarted && <StartGame handleChange={handleChange} numberOfOpponents={numberOfOpponents} handleStart={handleStart}/>}
            <div>
                {hasGameStarted && <div className="app--opponent-container">{generateOpponentElements()}</div>}
                {hasGameStarted && <CurrentBid currentFace={currentFace} currentQuantity={currentQuantity} isUsersTurn={isUsersTurn} handleNext={handleNext} />}
                {isUsersTurn && <UserBid  quantityArray={quantityArray} faceArray={faceArray} handleQuantity={handleQuantity} 
                                    handleFace={handleFace} handleBid={handleBid}/>}
                {hasGameStarted && <UserHand user={user} />
                }
            </div>
        </main>
    )
}
export default App