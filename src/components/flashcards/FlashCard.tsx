import ReactCardFlip from 'react-card-flip';
import {useState} from "react";

export const FlashCard = () => {
    const [isFlipped, setIsFlipped] = useState(false)

    const flipCard = () => setIsFlipped((isFlip) => !isFlip)

    return <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <p onClick={flipCard}>front</p>
        <p onClick={flipCard}>back</p>
    </ReactCardFlip>
}