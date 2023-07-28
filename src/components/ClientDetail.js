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
                            onClick={() => { navigate(`/treatments/${treatment.id}/update`) }}>
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

    const { treatmentId } = useParams()
    const [treatment, setTreatment] = useState({})
    const [newTreatment, setNewTreatment] = useState({})
    const [conditions, setConditions] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/treatments/${treatmentId}`)
                .then(response => response.json())
                .then((singleObject) => {

                    setTreatment(singleObject)

                })
        },
        [treatmentId]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/conditions`)
                .then(response => response.json())
                .then((dataArray) => {

                    setConditions(dataArray)

                })
        },
        []
    )


    const handleSaveButtonClick = (event) => {

        event.preventDefault()

        //第一步 用PUT 把这条mark as completed
        const markedCompletedTreatment = { ...treatment }
        markedCompletedTreatment.isCompleted = true;
        markedCompletedTreatment.endDate = new Date();

        fetch(`http://localhost:8088/treatments/${treatmentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(markedCompletedTreatment)
        })
            .then(response => response.json())

        //第二步 用POST 新建一个treatment

        return fetch(`http://localhost:8088/treatments/${treatmentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(treatment)
        })
            .then(response => response.json())
            .then(() => {
                //setFeedback("successfully saved")
            })
            .then(() => {
                navigate(`/clients/${treatment.patientId}`)

            })
    }

    return (
        <>
            <form className="treatment__form">
                <h2 className="treatment__title">Update On-going Treament Details</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="condition-select">Condition</label>
                        <select id='condition-select'>
                            <option value='option-0'>Choose a condition</option>
                            {conditions.map(condition => {
                                return <option key={condition.id} value={condition.name}>{condition.name}</option>
                            })}
                        </select>

                      

                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Update
                </button>
            </form>
        </>

    )

}
export const SessionNotes = () => {

}