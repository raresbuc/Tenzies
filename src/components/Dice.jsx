import React from "react"

export default function Dice(props) {
    return (
        <div className="dice-face" onClick={props.hold} style={{backgroundColor: props.isHeld ? "#59E391" : "white"}}>
            <h2 className="dice-num">{props.value}</h2>
        </div>
    )
}