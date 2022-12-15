import '../style.css'

function CurrentBid(props) {
    return(
        <div className="current-bid--container">
            <h2>Current Bid</h2>
            <h3>Quantity: {props.currentQuantity}</h3>
            <h3>Face: {props.currentFace}</h3>
            {!props.isUsersTurn && <button onClick={props.handleNext}>Next</button>} 
        </div>
    )
}
export default CurrentBid