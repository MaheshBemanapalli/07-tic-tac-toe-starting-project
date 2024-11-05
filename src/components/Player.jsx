import { useState } from "react"
export default function Player({ initialName, symbol, isActive, onChnageName }) {
    // the value provided in useState is assigned to isEditing variable initially
    //we can change that value using setIsEditing function any time
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleEditClick() {
        //here we are using the state to change it to true when button is clicked
        // thisis the best practice so that we work with the current state
        setIsEditing((editing) => !editing)
        //this also does the same thing as above but not the best practice 
        // setIsEditing(!isEditing)
        console.log(isEditing)
        onChnageName(symbol,playerName)
    }
    function handleEditChange(event){
        setPlayerName(event.target.value);
    }

    return (
        <li className={isActive? 'active': undefined}>
            <span className="player">
                {isEditing ?
                    <input type="text" required onChange={handleEditChange} value={playerName} /> :
                    <span className="player-name">{playerName}</span>
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </li>)
}
