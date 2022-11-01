import '../style.css'

function UserHand(props) {

    const diceArray = props.user.hand.map(dice => 
        <div className="userhand--dice-container">
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