import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    const localLoggedinUser = localStorage.getItem("loggedin_user")
    const loggedinUserObject = JSON.parse(localLoggedinUser)

    return (<header>

        <div className="image-container logo">
            <img src="https://content.codecademy.com/courses/freelance-1/unit-6/logo-sm.png" />
        </div>

        <nav>
            <ul className="navbar">


               

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
                    <Link className="navbar__link" to="/home" onClick={() => {
                        localStorage.removeItem("loggedin_user")
                        navigate("/home", { replace: true })
                    }}>Logout</Link>
                </li>

            </ul>
        </nav>
    </header>)
}

