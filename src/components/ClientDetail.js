import { useState, useEffect } from "react"

import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const InfoDetail = () => {
    const { clientId } = useParams()
    const [client, setClient] = useState({})
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/patients/${clientId}`)
                .then(response => response.json())
                .then((singleObject) => {

                    setClient(singleObject)

                })
        },
        [clientId]
    )
    const handleDeleteButtonClick = () => {
        fetch(`http://localhost:8088/patients/${clientId}`, {
            method: "DELETE"
        })
            // .then(response => response.json()) <--- dont need it since we arent sending anything
            .then(() => {
                navigate(`/clients`)
            })
    }

    return (
        <section className="client" key={`client--${client.id}`}>
            <div className="client__header">
                {client.name} 
            </div>
            <div> DOB:

            </div>

            <div><button
                onClick={handleDeleteButtonClick}>
                Delete This Client</button></div>


        </section>
    )
}

export const TreatmentDetail = () => {

}
export const TreatmentForm = () => {

}
export const SessionNotes = () => {

}