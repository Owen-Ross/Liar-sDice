/* Imported the reactjs-popup to create the "How to play" popup.
   the Library is created an maintained by: Youssouf EL Azizi
   Link to the Library: https://www.npmjs.com/package/reactjs-popup */
import Popup from 'reactjs-popup';

function Header() {
    return(
        <header className="header">
            <h1 className="header--title">Liar's Dice</h1>
            
                <Popup trigger={<button className="header--popup-button">How to play</button>} position="top center" modal>
                {close => (
                    <div>
                        <button className="header--popup-close-button" onClick={close}>&times;</button>
                        <h3 className="header--popup-title">Liar's Dice Rules</h3>
                        {/* Rule were taken from: https://www.dicegamedepot.com/liars-dice-rules/ */}
                        <p>Each player starts with 5 standard 6-sided dice. At the begginning of each round, everyone will roll their dice.
                           Everyone's dice will be hidden from each other except for their own dice. The first player will place a bid
                           consisting of a face(a nummber from 1 to 6) and a quantity(a number from 0 to the amount of dice the player has left).
                           Each player after can either make a higher bid for the same face(e.g. three "4's"), or they can bid a higher quantity
                           of the same face or any quantity of a higher face, or they can challenge the previous bid. If a bid is challenged, then
                           all of the players reveal their dice. If the bid is matched or exceeded then the bidder wins the round, otherwise the
                           challenger wins. If the challenger wins, then the bidder loses one of their dice. If the bidder wins, the challenger looses
                           one of their dice. When ever someone looses all of their dice, they are eliminated. The winner is the last player with
                           dice left. In the event that the game comes down to two players with one dice each, then the bids are of the sum of both dice,
                           instead of the quantity of the dice faces.
                        </p>
                    </div>
                )}
                </Popup>
        </header>
    )
}
export default Header