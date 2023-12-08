import React from "react";
import "./App.css";
import Home from "./components/pages/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchPage from "./components/pages/SearchPage";
function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='search' element={<SearchPage />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
}
export const NotFound = () => {
	return <div className="Notfound" style={{backgroundColor: "#010409"}}>This is a 404 page</div>;
};

export default App;
