import React from "react"
import '../style.css'

function UserBid(props) {
    
    const quantityOptions = props.quantityArray.map(quantity => 
                            <option key={quantity} value={quantity}>{quantity}</option>)

    const faceOptions = props.faceArray.map(face => 
                            <option key={face} value={face}>{face}</option>)

    return(
        <div className="userbid--container">
            <h3 className="userbid--title">Place your bid</h3>
            <form onSubmit={(event) => props.handleBid(event)}>
                <div className="userbid--selection-container">
                <div className="userbid--selection-container">
                    <h4 className="userbid--quantity-title">Quantity</h4>
                    <select 
                        id="quantity"
                        value={props.currentQuantity}
                        onChange={props.handleQuantity}
                        name="quantity"
                    >
                        {quantityOptions}
                    </select>
                </div>
                <br/>
                <div className="userbid--selection-container">
                    <h4>Dice Face</h4>
                    <select
                        id="face"
                        value={props.currentFace}
                        onChange={props.handleFace}
                        name="face"
                    >
                        {faceOptions}
                    </select>
                </div>
                </div>
                <br/>
                <button className="userbid--bid-button">Place Bid</button>
            </form>
        </div>
    )
}
export default UserBid