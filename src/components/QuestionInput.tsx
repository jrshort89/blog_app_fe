import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const CREATE_SPANISH_TRANSLATION = gql`
	mutation ($englishText: String!) {
		createSpanishTranslation(input: { englishText: $englishText }) {
			spanishTranslation {
				id
				spanishText
				englishText
			}
		}
	}
`;

export default function QuestionInput() {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<{ englishPhrase: string }>();

	const [createSpanishTranslation, { loading, error, data }] = useMutation(
		CREATE_SPANISH_TRANSLATION
	);

	const submitPhrase = ({ englishPhrase }: any) => {
		createSpanishTranslation({ variables: { englishText: englishPhrase } });
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>`Submission error! ${error.message}`</p>;

	return (
		<>
			<form onSubmit={handleSubmit(submitPhrase)} className="App">
				<Controller
					name="englishPhrase"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							id="filled-basic"
							label="englishPhrase"
							variant="filled"
							error={!!errors.englishPhrase}
							{...field}
						/>
					)}
				/>
				{errors.englishPhrase?.type === "required" && "Phrase is required"}
				<br />
				<br />
				<Button type="submit">Submit</Button>
			</form>
			<br />
			{data.createSpanishTranslation.spanishTranslation.englishText}:&nbsp;
			{data.createSpanishTranslation.spanishTranslation.spanishText}
		</>
	);
}
