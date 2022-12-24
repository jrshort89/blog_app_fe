import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import Question from "./Question";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import React, { useEffect } from "react";

const Speech = ({ checkAnswer, children }: any) => {
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();

	useEffect(() => {
		checkAnswer(transcript, resetTranscript);
	}, [checkAnswer, resetTranscript, transcript]);

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
	}

	const startUp = () => {
		SpeechRecognition.startListening({ language: "es-ES" });
	};

	return (
		<div>
			{React.Children.map(children, (child) => {
				const { correctAnswer, question } = child.props;

				if (React.isValidElement(child)) {
					return React.cloneElement(
						child as React.ReactElement<typeof Question>,
						{
							answer: transcript,
							correctAnswer: correctAnswer,
							question: question,
						} as Partial<{
							answer: string;
							correctAnswer: string;
							question: string;
						}>
					);
				}
				return child;
			})}
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					width: "100%",
					justifyContent: "center",
				}}
			>
				{listening ? <MicIcon htmlColor="#cd0000" /> : <MicOffIcon />}
            </div>
            <br />
			<button onClick={startUp}>Start</button>
			<button onClick={SpeechRecognition.stopListening}>Stop</button>
			<button onClick={resetTranscript}>Reset</button>
		</div>
	);
};
export default Speech;
