import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import TranslationHistory from "./TranslationHistory";
import firebase from 'firebase/compat/app';
import {useEffect} from "react";

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

const CREATE_USER = gql`
	mutation ($email: String!) {
		createUser(input: { email: $email }) {
			user {
				email
			}
		}
	}
`;

export default function QuestionInput() {
	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue
	} = useForm<{ englishPhrase: string }>();

	const [createSpanishTranslation, { loading, error }] = useMutation(
		CREATE_SPANISH_TRANSLATION
	);

	const [createUser] = useMutation(CREATE_USER);

	useEffect(() => {
		createUser({variables: {email: firebase.auth()?.currentUser?.email}})
	}, [])

	const submitPhrase = ({ englishPhrase }: any) => {
		createSpanishTranslation({ variables: { englishText: englishPhrase } });
		setValue('englishPhrase', '');
	};

	return (
		<>
			<p>{firebase?.auth()?.currentUser?.email}</p>
			{error ? (
				<p>`Submission error! ${error?.message}`</p>
			) : (
				<>
					<form onSubmit={handleSubmit(submitPhrase)} className="App">
						<Controller
							name="englishPhrase"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<TextField
									id="filled-basic"
									label="Type a phrase"
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
				</>
			)}
			<br />
			<TranslationHistory reload={loading} />
		</>
	);
}
