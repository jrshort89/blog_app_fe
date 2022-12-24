import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function Question({
	question,
	answer,
	correctAnswer,
}: {
	answer?: string;
	correctAnswer: string;
	question: string;
}) {
	return (
		<>
			<div>{question}</div>
			{answer?.length ? (
				<div style={{ height: "6rem" }}>
					{
						<>
							<p>{answer}</p>
							{answer === correctAnswer ? (
								<CheckCircleOutlineIcon htmlColor="green" />
							) : (
								<HelpOutlineIcon htmlColor="orange" />
							)}
						</>
					}
				</div>
			) : (
				<div style={{ height: "6rem", marginTop: "16px" }}>
					<br />
					<br />
				</div>
			)}
		</>
	);
}
