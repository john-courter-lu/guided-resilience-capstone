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

    const getGenderEmoji = () => {
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

    return (<article className="clients" >
        <h2>Client Info Details</h2>
        <section className="client" key={`client--${client.id}`}>
            <div className="client__header">
                {getGenderEmoji()}
                {client.name}
            </div>
            <div>
                DOB:
            </div>
            <div>
                Address:
            </div>

            <div><button
                onClick={handleDeleteButtonClick}>
                Delete This Client</button></div>


        </section>
    </article>
    )
}

export const TreatmentDetail = () => {

    const { clientId } = useParams()
    const [treatments, setTreatments] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/treatments/?patientId=${clientId}`)
                .then(response => response.json())
                .then((clientTreatmentsArray) => {

                    setTreatments(clientTreatmentsArray)

                })
        },
        [clientId]
    )



    return (<article className="treatments">
        <h2>Treatment Details</h2>

        {treatments.map(treatment => {

            return <section className="treatment" key={`treatment--${treatment.id}`}>
                <div className="treatment__header">
                    {treatment.approachId}
                </div>
                <div>
                    Start Date: {treatment.startDate}
                </div>


                {treatment.isCompleted === false ?
                    <>
                        <div>
                            Status: On Going
                        </div>
                        <div><button
                            onClick={() => { navigate(`treatments/update`) }}>
                            Update Treament Details</button>
                        </div>
                    </>
                    :
                    <div>
                        Status: Completed
                    </div>}
            </section>

        })}

    </article>
    )

}
export const TreatmentForm = () => {

}
export const SessionNotes = () => {

}