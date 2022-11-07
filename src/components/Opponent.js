import OpponentIcon from "../images/opponent-icon.png"
import '../style.css'

function Opponent(props) {
    return(
        <div className="opponent--container">
            <h2>{props.name}</h2>
            <img src={OpponentIcon} className="opponent--icon"/>
            <h2 className="opponent--dice-left">Dice left: {props.opponent.numberOfDiceLeft}</h2>
        </div>
    )
}
export default Opponent