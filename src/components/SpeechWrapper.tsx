import { useState } from "react";
import Question from "./Question";
import Speech from "./Speech";

export default function SpeechWrapper() {
	const [questions] = useState([
		{
			question: "Do you like cats?",
			correctAnswer: "no",
		},
		{
			question: "Do you like dogs?",
			correctAnswer: "sí",
		},
	]);
	const [questionIndex, setQuestionIndex] = useState(0);

	const { question, correctAnswer } = questions[questionIndex];

	const checkAnswer = (answer: string, reset: () => {}) => {
		if (answer === correctAnswer)
			setTimeout(() => {
				if (questionIndex < questions.length - 1) {
					reset();
					setQuestionIndex((i) => i + 1);
				}
			}, 1500);
	};

	return (
		<Speech checkAnswer={checkAnswer}>
			<Question correctAnswer={correctAnswer} question={question} />
		</Speech>
	);
}
