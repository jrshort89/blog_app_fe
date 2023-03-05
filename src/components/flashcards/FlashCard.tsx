import ReactCardFlip from "react-card-flip";
import { useState } from "react";

interface FlashCardProps {
  answer: string;
  question: string;
}

export const FlashCard = ({ answer, question }: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => setIsFlipped((isFlip) => !isFlip);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <p onClick={flipCard}>{question}</p>
      <p onClick={flipCard}>{answer}</p>
    </ReactCardFlip>
  );
};
