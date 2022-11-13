import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
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
