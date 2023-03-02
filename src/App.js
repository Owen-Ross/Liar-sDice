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
        setCurrentQuantity(parseInt(event.target.value))
    }

    /* Will be used to update the currentFace value every time the user selects a value */
    function handleFace(event) {
        setCurrentFace(parseInt(event.target.value))
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

        setIsUsersTurn(true)
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
        setIsUsersTurn(false)
        // set the currentPlayer to the first opponent
        setCurrentPlayer(opponents[0])
    }

    /**
     * This function will be triggered when the next button is clicked, it will determine what the opponent's bid
     * will be or if they will challenege the previous bid
     */
    function handleNext() {

        // this will determine whether the opponent will choose to challenge the previous bid or place one
        const option = Math.floor(Math.random() * 2)

        /* checking if the option value is equal to 1, if it is then the previous bid will be challenged, if
           it's not, then the opponent will place a bid */
        if(option === 1) {
            challengeBid()
        } else {
            // declaring the variables that will hold all of the face and quantity options the opponent can choose from
            const quantityBidOptions = []
            const faceBidOptions = []

            // populating the quantityBidOptions array with all of the possible quantity values the opponent can choose
            for(let i = currentQuantity; i < 6; i++) {
                // adding the value of i to the quantityBidOptions array
                quantityBidOptions.push(i)
            }

            // populating the faceBidOptions array with all of the possible face values the opponent can choose
            for(let i = currentFace; i < 7; i++) {
                // adding the value of i to the faceBidOptions array
                faceBidOptions.push(i)
            }

            /* getting a random value from the quantityBidOptions and faceBidOptions arrays that will be the opponent's bid,
               then the face and quantity will be set as the new current bid */
            setCurrentQuantity(quantityBidOptions[Math.floor(Math.random() * quantityBidOptions.length)])
            setCurrentFace(faceBidOptions[Math.floor(Math.random() * faceBidOptions.length)])

            switchToNextPlayer()
        }



    }

    /**
     * This function will be executed when a bid is challenged, it will get the bid placer and 
     * the player that challenged the bid
     */
    function challengeBid() {
        // checking if the bid that was challenged came from the user
        if(currentPlayer.id === opponents[0].id) {
            // calling the checkBid function, passing in the user and the first opponent
            checkBid(user, opponents[0])
        } else {
            // getting the player that placed the bid
            const challengedUser = opponents[opponents.indexOf(currentPlayer) - 1]
            /* calling the checkBid function, passing in the player that placed the bid and 
               the one that challeneged it */
            checkBid(challengedUser, currentPlayer)
        }
        
    }

    /**
     * This function will be executed when ever a bid is challenged, it will check to see if player that placed the bid
     * was successful or not, which ever player was not successful will loose a die from their hand
     * @param {*} bidPlacer The opponent/user object that placed the bid
     * @param {*} bidChallenger The opponent/user object that challenged the bid
     */
    function checkBid(bidPlacer, bidChallenger) {
        let handQuantity = 0

        // looping through the hand to see if the bid placer has the same amount of faces as in the bid
        for(let i = 0; i < bidPlacer.hand.length; i++) {
            // checking to see if the bid placer has the face in their hand that they bid
            if(currentFace === bidPlacer.hand[i]) {
                // incrementing the value of the handQuantity variable
                handQuantity++
            }
        }
        
        /* checking to see if the number of dice faces in the bid placers hand matched the bid, if it 
           does then the player that places the bid looses a die, if it does not then the player that 
           challeneged the bid looses a die */
        if(handQuantity >= currentQuantity) {
            removeDice(bidChallenger.id)
        } else {
            removeDice(bidPlacer.id)
        }

        setCurrentFace(1)
        setCurrentQuantity(1)

    }

    /**
     * This function will be used to remove a die from a player's hand
     * @param {*} id The id of the player that is getting a die removed from their hand
     */
    function removeDice(id) {
        // checking if the id that was passed into the function is the user's or not
        if(id === user.id) {
            /* removing a die from the user's hand by subtracting 1 form the numberOfDiceLeft value and
               set the new user value to state*/
            setUser(prevUser => { return {
                ...prevUser, numberOfDiceLeft: (prevUser.numberOfDiceLeft - 1), hand: generateDice(prevUser.numberOfDiceLeft - 1)
            }})
            // will execute if the id that was passed in isn't from the user
        } else {
            // storing the new array with the updated numberOfDiceValues in state
            setOpponents(prevOpponents => {
                const newArray = [] 
                /* looping through the array of opponents to find the opponent object with the id that
                   was passed into the function */
                for(let i = 0; i < prevOpponents.length; i++) {
                    const newOpponent = prevOpponents[i]
                    // checking to see if the current opponent in the array matches the id that was passed in
                    if(newOpponent.id === id) {
                        /* if the id of the current opponent matches the id that was passed in, then remove
                           a die from their hand and push that opponent object to the array of opponents */
                        newArray.push({...newOpponent, numberOfDiceLeft: (newOpponent.numberOfDiceLeft - 1), 
                            hand: generateDice(newOpponent.numberOfDiceLeft - 1)})
                        // will be executed if the opponent id doesn't match the one that was passed in
                    } else {
                        // pushing the opponent object to the opponent array
                        newArray.push({...newOpponent, hand: generateDice(newOpponent.numberOfDiceLeft)})
                    }
                }
                return newArray
            })
        }
        switchToNextPlayer()
    }


    function switchToNextPlayer() {
        // checking to see if the next turn is the user's turn
        if(opponents.indexOf(currentPlayer) === (opponents.length - 1)) {
            // if the next turn is the user's turn, then setting the state to the user object
            setCurrentPlayer(user)
            setIsUsersTurn(true)
        } else if(currentPlayer.id === user.id) {
            setCurrentPlayer(opponents[0])
            setIsUsersTurn(false)
        } else {
            // otherwise set the current player state to the next opponent object in the array
            setCurrentPlayer(prevOpponent => opponents[opponents.indexOf(prevOpponent) + 1])
        }
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