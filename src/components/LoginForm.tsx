import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const emailHandler = (e: ChangeEvent<HTMLInputElement>) =>
		setEmail(e.currentTarget.value);

	const passwordHandler = (e: ChangeEvent<HTMLInputElement>) =>
		setPassword(e.currentTarget.value);

	const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const body = {
			session: {
				email: email,
				password: password,
			},
		};

		try {
			await fetch("http://localhost:3003/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			navigate("/blogs");
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<form onSubmit={submitLogin} className="App">
			<label htmlFor="email">Email:&nbsp;</label>
			<input value={email} onChange={emailHandler} />
			<br />
			<br />
			<label htmlFor="password">Password:&nbsp;</label>
			<input value={password} onChange={passwordHandler} />
			<br />
			<br />
			<button type="submit">Submit</button>
		</form>
	);
}
