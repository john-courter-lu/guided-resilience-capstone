import { Route, Routes, Outlet } from "react-router-dom"
import { ClientCreateMessage, ClientMessageList } from "../ClientMessage.js"

export const ApplicationViews = () => {
	return <Routes>
	<Route path="/" element={
		<>
			<h1>Guided Resilience</h1>
			<h4>You're so much stronger than you think!</h4>

			<Outlet />
		</>
	}>

		<Route path="/messages" element={<ClientMessageList />} />
		<Route path="/create-message" element={<ClientCreateMessage />} />
		


	</Route>
</Routes>
}

