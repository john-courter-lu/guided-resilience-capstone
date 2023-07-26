import { useState, useEffect } from "react"
import "./ClientList.css"
import { useNavigate } from "react-router-dom"

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



    if (searchTerms !== "") {

        return (<>

            <h2>Search Results</h2>
            <article className="clients">
                {
                    filteredClients.map(client => {
                        return (
                            <section className="client" key={`client--${client.id}`}>
                                <div className="client__header">🧑{client.name}</div>

                                <div>Date of Birth: {client.dateOfBirth}</div>


                            </section>
                        )
                    })
                }
            </article>
        </>)
    } else {

        return <>


            {loggedinUserObject.staff ?
                <button onClick={() => navigate("/clients/create")}>Add Clients</button> : ""
            }
            <h2>List of Clients</h2>
            <article className="clients">
                {
                    filteredClients.map(client => {
                        return (
                            <section className="client" key={`client--${client.id}`}>
                                <div className="client__header">🧑{client.name}</div>

                                <div>Date of Birth: {client.dateOfBirth}</div>

                            </section>
                        )
                    })
                }
            </article>
        </>
    }



}
