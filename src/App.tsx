import LoginForm from "./components/LoginForm";
import firebase from "firebase/compat/app";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SpeechWrapper from "./components/SpeechWrapper";
import QuestionInput from "./components/QuestionInput";
import {useEffect, useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {Settings} from "./components/Settings";
import {Navbar} from "./components/Navbar";
import FlashCardsWrapper from "./components/flashcards/FlashCardsWrapper";

// TODO: move to query file
const CREATE_USER = gql`
  mutation ($email: String!) {
    createUser(input: { email: $email }) {
      user {
        email
      }
    }
  }
`;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_IDENTITY_PLATFORM_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {
  console.error(error);
}

function App() {
  const [isAuthenticated, setIsAuthenticatied] = useState(false);
  const [createUser] = useMutation(CREATE_USER);

  firebase.auth().onAuthStateChanged((user) => {
    setIsAuthenticatied(!!user);
  });

  useEffect(() => {
    if (isAuthenticated) {
      createUser({ variables: { email: firebase.auth()?.currentUser?.email } });
    }
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route
          path="/"
          element={<LoginForm isAuthenticated={isAuthenticated} />}
        />
        {isAuthenticated && (
          <>
            <Route path="/speech" element={<SpeechWrapper />} />
            <Route path="/flashcards" element={<FlashCardsWrapper />} />
            <Route path="/questioninput" element={<QuestionInput />} />
            <Route path="/settings" element={<Settings />} />
          </>
        )}
        <Route path="*" element={<p>404: Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
