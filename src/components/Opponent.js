import OpponentIcon from "../images/opponent-icon.png"

function Opponent(props) {
    return(
        <div>
            <img src={OpponentIcon}/>
            <h2>Dice left: {props.opponent.numberOfDiceLeft}</h2>
        </div>
    )
}
export default Opponent