import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./MessageList.css"

export const ClientMessageList = () => {


    const [messages, setMessages] = useState([])

    const localLoggedinUser = localStorage.getItem("loggedin_user")
    const loggedinUserObject = JSON.parse(localLoggedinUser)

    useEffect(() => {
        fetch("http://localhost:8088/messages")
            .then(response => response.json())
            .then((messageArray) => {
                const myMessages = messageArray.filter(obj => obj.senderId === loggedinUserObject.id || obj.recipientId === loggedinUserObject.id)
                setMessages(myMessages)
            })
    }, [])

    return (
        <article className="messages">
            {
                messages.map(message => {
                    if (message.senderId === loggedinUserObject.id) {
                        return (
                            <section className="message message__sent" key={`message--${message.id}`}>


                                <div className="message__header ">🧑</div>


                                <div className="message__content">
                                    {message.content}
                                </div>

                            </section>
                        )

                    } else {

                        return (
                            <section className="message message__received" key={`message--${message.id}`}>


                                <div className="message__header ">👩‍⚕️</div>

                                <div className="message__content">
                                    {message.content}
                                </div>

                            </section>
                        )
                    }
                })
            }
        </article>
    )

}

export const ClientCreateMessage = () => {

}