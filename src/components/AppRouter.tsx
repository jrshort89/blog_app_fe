import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Blogs from "./Blogs";

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/blogs" element={<Blogs />} />
			</Routes>
		</BrowserRouter>
	);
}
