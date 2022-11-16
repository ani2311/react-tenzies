export default function Dice(props) {
    return (
        <div className={`dice-face ${props.die.isLocked?"locked":""}`}
             onClick={() => props.lockDie(props.die.dieId)}
            >
            <p>{props.die.value}</p>
        </div>
    )
}