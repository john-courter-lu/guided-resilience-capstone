import { useState,useEffect } from "react"
import { Link } from "react-router-dom"

export const ClientMessageList = () => {
   

        const [messages, setMessages] = useState([])
    
        const localLoggedinUser = localStorage.getItem("loggedin_user")
        const loggedinUserObject = JSON.parse(localLoggedinUser)
    
        useEffect(() => {
            fetch("http://localhost:8088/messages")
                .then(response => response.json())
                .then((messageArray) => {
                    const myMessages = messageArray.filter(obj=>obj.senderId===loggedinUserObject.id||obj.recipientId===loggedinUserObject.id)
                    setMessages(myMessages)
                })
        }, [])
    
        return (
            <article className="messages">
                {
                    messages.map(message => {
                        return (
                            <section className="message" key={`message--${message.id}`}>
                                
                                   {message.senderId===loggedinUserObject.id?
                                   <div className="message__header message__sent">🧑</div> :
                                   <div className="message__header message__received">👩‍⚕️</div>} 
                               
                                <div className="message__content">
                                    {message.content}
                                </div>
                                
                            </section>
                        )
                    })
                }
            </article>
        )
    
}

export const ClientCreateMessage = () => {
    
}