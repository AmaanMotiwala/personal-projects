import { useState } from "react"

export default function Player({name,symbol,isActive}){
    const [isEditing,setIsEditing] = useState(false);
    const [playername,setplayername] = useState(name);
    function handleEditClick(){
        setIsEditing(isEditing=>!isEditing);
    }
    function handleChange(e){
        setplayername(e.target.value)
    }
    let playerName = <span className="player-name">{playername}</span>;
    if(isEditing){
        playerName = <input type="text" required value={playername} onChange={handleChange}/>
    }
    return <li className={isActive?'active':undefined}>
    <span className="player">
      {playerName}
      <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button>
  </li>
}