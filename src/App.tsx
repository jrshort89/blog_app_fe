import LoginForm from "./components/LoginForm";
import firebase from 'firebase/compat/app';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import SpeechWrapper from "./components/SpeechWrapper";
import QuestionInput from "./components/QuestionInput";
import {useEffect, useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {AppBar, Toolbar, Typography} from "@mui/material";
import {Settings} from "./components/Settings";

const CREATE_USER = gql`
	mutation ($email: String!) {
		createUser(input: { email: $email }) {
			user {
				email
			}
		}
	}
`

const firebaseConfig = {
	apiKey: process.env.REACT_APP_GOOGLE_IDENTITY_PLATFORM_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);

function App() {
	const [isAuthenticated, setIsAuthenticatied] = useState(false)
	const [createUser] = useMutation(CREATE_USER);

	const home = isAuthenticated ? '/questioninput' : '/'

	firebase.auth().onAuthStateChanged((user) => {
		setIsAuthenticatied(!!user)
	})

	useEffect(() => {
		if (isAuthenticated) {
			createUser({variables: {email: firebase.auth()?.currentUser?.email}})
		}
	}, [isAuthenticated])

	return (<BrowserRouter>
		<AppBar position='fixed'>
		<Toolbar>
			<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
				<Link style={{color: 'white', textDecoration: 'none'}} color='white' to={home}>
				Translate
				</Link>
			</Typography>
			<Link style={{color: 'white', textDecoration: 'none'}} color='white' to="/settings">Settings</Link>
		</Toolbar>
		</AppBar>
		<Routes>
			<Route path="/" element={<LoginForm />}/>
			{isAuthenticated && (
				<>
					<Route path="/speech" element={<SpeechWrapper/>}/>
					<Route path="/questioninput" element={<QuestionInput/>}/>
					<Route path="/settings" element={<Settings />} />
				</>
			)}
			<Route path='*' element={<p>404: Not Found</p>} />
		</Routes>
	</BrowserRouter>);
}

export default App;
