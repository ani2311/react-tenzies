export default function Dice(props) {
    return (
        <div className={`dice-face ${props.locked?"locked":""}`}
             onClick={() => props.lockDice(props.diceId)}
            >
            <p>{props.value}</p>
        </div>
    )
}