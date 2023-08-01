import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Message.css"



export const ClientMessageList = () => {

    const localLoggedinUser = localStorage.getItem("loggedin_user")
    const loggedinUserObject = JSON.parse(localLoggedinUser)

    const [messages, setMessages] = useState([])
    const [patient, setPatient] = useState({})


    useEffect(() => {
        fetch("http://localhost:8088/messages")
            .then(response => response.json())
            .then((messageArray) => {
                const myMessages = messageArray.filter(obj => obj.senderId === loggedinUserObject.id || obj.recipientId === loggedinUserObject.id)
                setMessages(myMessages)
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/patients?userId=${loggedinUserObject.id}`)
            .then(response => response.json())
            .then((dataArray) => {
                setPatient(dataArray[0])
            })
    }, [])

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
        <article className="messages">
            {
                messages.map(message => {



                    if (message.senderId === loggedinUserObject.id) {
                        return (<section key={`message--${message.id}`}>
                            <section className="message message__time">{formatDateString(message.time)}</section>
                            <section className="message message__sent" >


                                <div className="message__header ">{getGenderEmoji(patient.genderId)}</div>


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


                                <div className="message__header ">👩‍⚕️</div>

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
    )

}

export const ClientCreateMessage = () => {
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
            recipientId: 1,
            content: newMessage.content,
            time: new Date().toISOString()
        };

        fetch(`http://localhost:8088/messages`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(messageObjToSend)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/messages")
            })
    }

    return (
        <>
            <form className="newMessageForm">
                <h2 className="newMessageForm__title">Create a new message</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="content">What do you want to ask Pam today?</label>
                        <textarea className="form-control"
                            required autoFocus
                            rows="4" 

                            placeholder="New Message"
                            value={newMessage.content}
                            onChange={(evt) => {
                                const copy = { ...newMessage }
                                copy.content = evt.target.value
                                updateNewMessage(copy)
                            }}>
                        </textarea>
                    </div>
                </fieldset>

                <button
                    className="btn btn-primary"
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