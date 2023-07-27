import { Route, Routes, Outlet } from "react-router-dom"
import { ClientCreateMessage, ClientMessageList } from "../MessageClientView.js"
import { TherapistMessageList } from "../MessageTherapistView.js"
import { ClientList } from "../ClientList.js"
import { InfoDetail, TreatmentDetail } from "../ClientDetail.js"

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
				<Route path="messages" element={<TherapistMessageList />} /> :
				<Route path="messages" element={<ClientMessageList />} />
			}
			<Route path="create-message" element={<ClientCreateMessage />} />
			<Route path="clients" element={<ClientList />} />
			<Route path="clients/:clientId" element={<><InfoDetail /><TreatmentDetail /></>} />



		</Route>
	</Routes>
}

