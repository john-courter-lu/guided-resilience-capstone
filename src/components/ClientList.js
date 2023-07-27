import { useState, useEffect } from "react"
import "./ClientList.css"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export const ClientList = () => {

    const navigate = useNavigate()

    const [clients, setClients] = useState([])
    const [filteredClients, setFilteredClients] = useState([])
    const [searchTerms, setSearchTerms] = useState("")



    const localLoggedinUser = localStorage.getItem("loggedin_user")
    const loggedinUserObject = JSON.parse(localLoggedinUser)

    const getAndSetAllClients = () => {
        fetch("http://localhost:8088/patients")
            .then(response => response.json())
            .then((clientArray) => {
                setClients(clientArray)
            })
    }

    useEffect(() => {
        getAndSetAllClients();
    }, [])

    useEffect(() => {
        if (searchTerms === "") {
            setFilteredClients(clients)
        }
    }, [clients])

    useEffect(() => {

        const searchedClients = clients.filter(obj => obj.name.toLowerCase()?.startsWith(searchTerms.toLowerCase()))
        setFilteredClients(searchedClients)
    }, [searchTerms])





    const getGenderEmoji = (client) => {
        let genderEmoji;

        if (client.genderId === 1) {
            genderEmoji = "🧑";
        } else if (client.genderId === 2) {
            genderEmoji = "👩";
        } else if (client.genderId === 3) {
            genderEmoji = "🧚";
        } else {
            // Default emoji or content if genderId doesn't match any of the above values
            genderEmoji = "🤷‍♂️";
        }

        return genderEmoji;
    };

    if (searchTerms !== "") {

        return (<>
            <ClientListSearchBar setSearchTerms={setSearchTerms}></ClientListSearchBar>
            <h2>Search Results</h2>
            <article className="clients">
                {
                    filteredClients.map(client => {
                        return (
                            <section className="client" key={`client--${client.id}`}>
                                <div className="client__header">                {getGenderEmoji(client)}{client.name}</div>

                                <div>Date of Birth: {client.dateOfBirth}</div>


                            </section>
                        )
                    })
                }
            </article>
        </>)
    } else {

        return <>



            <ClientListSearchBar setSearchTerms={setSearchTerms}></ClientListSearchBar>
            <h2>List of Clients</h2>
            <article className="clients">
                {
                    filteredClients.map(client => {
                        return (
                            <section className="client" key={`client--${client.id}`}>
                                <div className="client__header"><Link to={`/clients/${client.id}`}>{getGenderEmoji(client)}{client.name}</Link></div>

                                <div>Date of Birth: {client.dateOfBirth}</div>

                            </section>
                        )
                    })
                }
            </article>

            {loggedinUserObject.staff ?
                <button onClick={() => navigate("/clients/add")}>Add Clients</button> : ""
            }
        </>
    }








}

export const ClientListSearchBar = ({ setSearchTerms }) => {
    return <>
        <form className="searchForm">
            <h2 className="searchForm__title"></h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Search for a client"
                        onChange={
                            (changeEvent) => {
                                setSearchTerms(changeEvent.target.value)
                            }
                        }
                    />
                </div>
            </fieldset>
        </form>
    </>
}