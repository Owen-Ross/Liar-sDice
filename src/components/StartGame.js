function StartGame(props) {

    return(
        <div>
            <form onSubmit={(event) => props.handleStart(event)}>
            <label htmlFor="numOpponents">Choose how many opponents you want to play against?</label>
            <br />
            <select 
                id="numOpponents"
                value={props.numberOfOpponents}
                onChange={(event) => props.handleChange(event)}
                name="NumOpponents"
            >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </select>
            <button>Start Game</button>
            </form>
            
        </div>
    )
}
export default StartGame