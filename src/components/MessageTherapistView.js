import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Message.css"


export const TherapistMessageList = () => {
    const localLoggedinUser = localStorage.getItem("loggedin_user")
    const loggedinUserObject = JSON.parse(localLoggedinUser)

    // fetch all messages function
    const [messages, setMessages] = useState([])

    const fetchSetAllMessages = () => {
        fetch("http://localhost:8088/messages")
            .then(response => response.json())
            .then((messageArray) => {
                setMessages(messageArray)
            })
    }

    // initial state and filter message
    const [patients, setPatients] = useState([])
    const [patientId, setPatientId] = useState(2)
    const [filteredMessages, setFilteredMessages] = useState([])

    useEffect(() => {
        //fetch all patients
        fetch("http://localhost:8088/patients")
            .then(response => response.json())
            .then((patientArray) => {
                setPatients(patientArray)
            })
        //fetch all messages
        fetchSetAllMessages()

    }, [])

    //filter messages   

    useEffect(() => {
        const patientMessages = messages.filter(obj => obj.senderId === patientId || obj.recipientId === patientId)
        setFilteredMessages(patientMessages)
    }, [messages])

    useEffect(() => {
        const patientMessages = messages.filter(obj => obj.senderId === patientId || obj.recipientId === patientId)
        setFilteredMessages(patientMessages)
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

    const getGenderEmoji = (genderId) => {
        let genderEmoji;

        if (genderId === 1) {
            genderEmoji = "🧑";
        } else if (genderId === 2) {
            genderEmoji = "👩";
        } else if (genderId === 3) {
            genderEmoji = "🧚";
        } else {
            // Default emoji or content if genderId doesn't match any of the above values
            genderEmoji = "🤷‍♂️";
        }

        return genderEmoji;
    };


    return (
        <main className="patient-message-create-container">
            <section className="patients">

                <ul>
                    {patients.map(patient => {
                        return <li key={`patient--${patient.id}`} onClick={() => {
                            setPatientId(patient.userId);
                            // for changing background color when clicked
                            const listItems = document.querySelectorAll(".patients li");

                            listItems.forEach(item => {
                                item.addEventListener("click", function () {
                                    // Remove "clicked" class from all <li> elements
                                    listItems.forEach(li => li.classList.remove("clicked"));

                                    // Add "clicked" class to the currently clicked <li> element
                                    this.classList.add("clicked");
                                });
                            });

                        }}>{getGenderEmoji(patient.genderId)} {patient.name}</li>
                    })}
                </ul>
            </section>
            <section className="list-create-container">
                <article className="messages">
                    {
                        filteredMessages.map(message => {
                            if (message.senderId === 1) {
                                return (<section key={`message--${message.id}`}>
                                    <section className="message message__time" >{formatDateString(message.time)}</section>
                                    <section className="message message__sent" >
                                        <div className="message__header ">👩‍⚕️</div>
                                        <div className="message__content">
                                            {message.content}
                                        </div>
                                    </section>
                                </section>
                                )

                            } else {
                                return (<section key={`message--${message.id}`}>
                                    <section className="message message__time">{formatDateString(message.time)}</section>
                                    <section className="message message__received" >
                                        <div className="message__header ">}</div>
                                        <div className="message__content">
                                            {message.content}
                                        </div>
                                    </section>
                                </section>
                                )
                            }


                        })
                    }

                </article>
                <TherapistCreateMessage patientId={patientId} fetchSetAllMessages={fetchSetAllMessages}></TherapistCreateMessage>
            </section></main>
    )
}


export const TherapistCreateMessage = ({ patientId, fetchSetAllMessages }) => {
    const navigate = useNavigate()

    const localLoggedinUser = localStorage.getItem("loggedin_user")
    const loggedinUserObject = JSON.parse(localLoggedinUser)


    const [newMessage, updateNewMessage] = useState({
        senderId: 0,
        recipientId: 0,
        content: "",
        time: ""
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const messageObjToSend = {
            senderId: Number(loggedinUserObject.id),
            recipientId: patientId,
            content: newMessage.content,
            time: new Date().toISOString()
        };

        fetch(`http://localhost:8088/messages`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(messageObjToSend)
        })
            .then(res => res.json())
            .then(fetchSetAllMessages)
    }

    return (
        <>
            <form className="newMessageForm">

                <fieldset>
                    <div className="form-group">

                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="New Message"
                            value={newMessage.content}
                            onChange={(evt) => {
                                const copy = { ...newMessage }
                                copy.content = evt.target.value
                                updateNewMessage(copy)
                            }}
                        />

                    </div>
                </fieldset>

                <button className="form-btn btn btn-primary"
                    onClick={(evt) => {
                        handleSaveButtonClick(evt)
                    }}
                >
                    Send
                </button>

            </form>
        </>
    )
}