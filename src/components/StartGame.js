import '../style.css'

function StartGame(props) {

    return(
        <div className="start-game--container">
            <form className="start-game--form" onSubmit={(event) => props.handleStart(event)}>
            <h2 className="start-game--label">Choose how many opponents you want to play against?</h2>
            <select 
                id="numOpponents"
                value={props.numberOfOpponents}
                onChange={props.handleChange}
                name="numOpponents"
            >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </select>
            <br/>
            <button className="start-game--button">Start Game</button>
            </form>
        </div>
    )
}
export default StartGame