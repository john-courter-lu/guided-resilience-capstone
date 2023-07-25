import { Route, Routes, Outlet } from "react-router-dom"
import { ClientCreateMessage, ClientMessageList } from "../ClientMessage.js"
import { TherapistMessageList } from "../TherapistMessage.js"

export const ApplicationViews = () => {

	const localLoggedinUser = localStorage.getItem("loggedin_user")
	const loggedinUserObject = JSON.parse(localLoggedinUser)

	return <Routes>
		<Route path="/" element={
			<>
				<h1>Guided Resilience</h1>
				<h4>You're so much stronger than you think!</h4>

				<Outlet />
			</>
		}>

			{loggedinUserObject.staff ?
				<Route path="/messages" element={<TherapistMessageList />} /> :
				<Route path="/messages" element={<ClientMessageList />} />
			}
			<Route path="/create-message" element={<ClientCreateMessage />} />



		</Route>
	</Routes>
}

