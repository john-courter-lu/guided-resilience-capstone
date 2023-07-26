import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    const localLoggedinUser = localStorage.getItem("loggedin_user")
    const loggedinUserObject = JSON.parse(localLoggedinUser)

    return (
        <ul className="navbar">
            <li className="navbar__item navbar__logo">
                <p>LOGO</p>
            </li>
            <li className="navbar__item ">
                <Link className="navbar__link" to="/messages" >Messages</Link>
            </li>

            {!loggedinUserObject.staff ?
                <li className="navbar__item ">
                    <Link className="navbar__link" to="/create-message" >Send New Messages</Link>
                </li> :
                <li className="navbar__item ">
                    <Link className="navbar__link" to="/clients" >Clients</Link>
                </li>
            }

            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("loggedin_user")
                    navigate("/", { replace: true })
                }}>Logout</Link>
            </li>
        </ul>
    )
}

