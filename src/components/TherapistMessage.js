import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./MessageList.css"


export const TherapistMessageList = () => {
    const localLoggedinUser = localStorage.getItem("loggedin_user")
    const loggedinUserObject = JSON.parse(localLoggedinUser)

    
    // show patient list
    const [patients, setPatients] = useState([])
    
    useEffect(() => {
        fetch("http://localhost:8088/patients")
        .then(response => response.json())
        .then((patientArray) => {
            setPatients(patientArray)
        })
    }, [])
    
    // setPatientId
    const [patientId, setPatientId] = useState(2)
    
    // show messages
    const [messages, setMessages] = useState([])

    useEffect(() => {
        fetch("http://localhost:8088/messages")
            .then(response => response.json())
            .then((messageArray) => {
                const myMessages = messageArray.filter(obj => obj.senderId === patientId || obj.recipientId === patientId)
                setMessages(myMessages)
            })
    }, [patientId])

    // function 
    const formatDateString = (dateString) => {

        // Parse the date string to a Date object
        const date = new Date(dateString);

        // Define the options for the date and time formatting
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };

        // Create a new DateTimeFormat object with the desired format
        const dateTimeFormatter = new Intl.DateTimeFormat("en-US", options);

        // Format the date using the DateTimeFormat object
        const formattedDate = dateTimeFormatter.format(date);

        return formattedDate;
    }

    return (
        <>
            <section className="patients">
                Patients List
                <ul>
                {patients.map(patient => { return <li onClick={() => {setPatientId(patient.userId)}}>{patient.name}</li>  })}
                </ul>
            </section>

            <article className="messages">
                {
                    messages.map(message => {
                        if (message.senderId === 1) {
                            return (<>
                                <section className="message message__time">{formatDateString(message.time)}</section>
                                <section className="message message__sent" key={`message--${message.id}`}>
                                    <div className="message__header ">👩‍⚕️</div>
                                    <div className="message__content">
                                        {message.content}
                                    </div>
                                </section>
                            </>
                            )

                        } else {
                            return (<>
                                <section className="message message__time">{formatDateString(message.time)}</section>
                                <section className="message message__received" key={`message--${message.id}`}>
                                    <div className="message__header ">🧑</div>
                                    <div className="message__content">
                                        {message.content}
                                    </div>
                                </section>
                            </>
                            )
                        }


                    })
                }

            </article>
        </>
    )
}

export const TherapistCreateMessage = () => { }