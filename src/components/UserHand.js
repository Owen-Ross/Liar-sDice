import React from 'react'
import '../style.css'

function UserHand(props) {

    const diceArray = props.user.hand.map((dice, index) => 
        <div className="userhand--dice-container" key={index}>
            <h3 className="userhand--dice-face">{dice}</h3>
        </div>
    )

    return(
        <div className="userhand--container">
            <h2 className="userhand--title">Your Hand</h2>
            <div className="userhand--hand">
                {diceArray}
            </div>
        </div>
    )
}
export default UserHand