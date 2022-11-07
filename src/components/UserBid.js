import React from "react"

function UserBid(props) {
    
    return(
        <div>
            <h3>Place your bid</h3>
            <form>
                <h4>Quantity</h4>
                <select 
                    id="quantity"
                    value={props.currentQuantity}
                    onChange={props.handleQuantity}
                    name="quantity"
                >
                    {props.quantityArray}
                </select>
                <br/>
                <h4>Dice Face</h4>
                <select
                    id="face"
                    value={props.currentFace}
                    onChange={props.handleFace}
                    name="face"
                >
                    {props.faceArray}
                </select>
                <button>Place Bid</button>
            </form>
        </div>
    )
}
export default UserBid