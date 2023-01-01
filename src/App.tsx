import LoginForm from "./components/LoginForm";
import firebase from 'firebase/compat/app';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_GOOGLE_IDENTITY_PLATFORM_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

function App() {
	return <LoginForm firebaseApp={firebaseApp} />;
}

export default App;
