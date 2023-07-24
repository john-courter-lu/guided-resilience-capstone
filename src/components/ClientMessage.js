import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./MessageList.css"

const localLoggedinUser = localStorage.getItem("loggedin_user")
const loggedinUserObject = JSON.parse(localLoggedinUser)

export const ClientMessageList = () => {


    const [messages, setMessages] = useState([])


    useEffect(() => {
        fetch("http://localhost:8088/messages")
            .then(response => response.json())
            .then((messageArray) => {
                const myMessages = messageArray.filter(obj => obj.senderId === loggedinUserObject.id || obj.recipientId === loggedinUserObject.id)
                setMessages(myMessages)
            })
    }, [])

    const formatDataString = (dateString) => {

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
        <article className="messages">
            {
                messages.map(message => {



                    if (message.senderId === loggedinUserObject.id) {
                        return (<>
                            <section className="message message__time">{formatDataString(message.time)}</section>
                            <section className="message message__sent" key={`message--${message.id}`}>


                                <div className="message__header ">🧑</div>


                                <div className="message__content">
                                    {message.content}
                                </div>

                            </section>
                        </>
                        )

                    } else {

                        return (<>
                            <section className="message message__time">{formatDataString(message.time)}</section>
                            <section className="message message__received" key={`message--${message.id}`}>


                                <div className="message__header ">👩‍⚕️</div>

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
    )

}

export const ClientCreateMessage = () => {
    const navigate = useNavigate()


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
                        <input
                            required autoFocus
                            type="text"
                            //className="form-control"
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