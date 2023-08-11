import { Navigate, Route, Routes } from "react-router-dom"
import { Authorized } from "./components/views/Authorized"
import { ApplicationViews } from "./components/views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import './App.css';
import { HomePage } from "./components/HomePage.js"

function App() {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />
		
		<Route path="/home" element={<HomePage />} />

		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					<ApplicationViews />
				</>
			</Authorized>

		} />
	</Routes>
}

export default App;
