import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Question from "./Question";
import Speech from "./Speech";
import SpeechWrapper from "./SpeechWrapper";

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/speech" element={<SpeechWrapper />} />
			</Routes>
		</BrowserRouter>
	);
}
