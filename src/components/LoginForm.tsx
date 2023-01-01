import {Button, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

type FormData = {
	email: string;
	password: string;
};

export default function LoginForm({firebaseApp}: any) {
	const {
		handleSubmit,
		control,
		formState: {errors},
	} = useForm<FormData>();
	const navigate = useNavigate();

	const uiConfig = {
		signInFlow: 'popup',
		signInSuccessUrl: '/questioninput',
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		],
	};

	const submitLogin = async ({email, password}: FormData) => {
		const body = {
			session: {
				email: email,
				password: password,
			},
		};

		try {
			await fetch("http://localhost:3000/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			navigate("/questioninput");
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<form onSubmit={handleSubmit(submitLogin)} className="App">
			<Controller
				name="email"
				control={control}
				rules={{required: true}}
				render={({field}) => (
					<TextField
						id="filled-basic"
						label="Email"
						variant="filled"
						error={!!errors.email}
						{...field}
					/>
				)}
			/>
			{errors.email?.type === "required" && "Email is required"}
			<br/>
			<br/>
			<Controller
				name="password"
				control={control}
				rules={{required: true}}
				render={({field}) => (
					<TextField
						id="filled-basic"
						label="Password"
						variant="filled"
						error={!!errors.password}
						{...field}
					/>
				)}
			/>
			{errors.password?.type === "required" && "Password is required"}
			<br/>
			<br/>
			<Button type="submit">Submit</Button>
			<br/>
			<br/>
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
		</form>
	);
}