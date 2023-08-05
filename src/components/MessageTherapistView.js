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
    const [patient, setPatient] = useState({})
    const [filteredMessages, setFilteredMessages] = useState([])
    // for hidden Delete button
    const [showDelete, setShowDelete] = useState(false);

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
        const patientMessages = messages.filter(obj => obj.senderId === patient.userId || obj.recipientId === patient.userId)
        setFilteredMessages(patientMessages)
    }, [messages])

    useEffect(() => {
        const patientMessages = messages.filter(obj => obj.senderId === patient.userId || obj.recipientId === patient.userId)
        setFilteredMessages(patientMessages)
    }, [patient])

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

    // for hidden delete button and 
    const handleContentClick = () => {
        setShowDelete(!showDelete);
    };

    const handleDeleteButtonClick = (event) => {
        // Handle delete button click event here
        event.stopPropagation();
        console.log('Delete button clicked!');

        fetch(`http://localhost:8088/messages/${Number(event.target.key)}`, {
            method: "DELETE"
        })
            // .then(response => response.json()) <--- dont need it since we arent sending anything
            .then()
    };

    return (
        <main className="patient-message-create-container">
            <section className="patients">

                <ul>
                    {patients.map(patient => {
                        return <li key={`patient--${patient.id}`}
                            onClick={() => {

                                setPatient(patient);

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

                                        {/* 修改showDelete的boolean值 */}

                                        {/* When rendering the text, replace "\n" characters with HTML line breaks (<br> tags): */}
                                        <div className="message__content"
                                            onClick={handleContentClick}>

                                            <p dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br/>') }} />

                                        </div>

                                        {showDelete && (
                                            <div className="delete-button"
                                                key={`${message.id}`}
                                                onClick={handleDeleteButtonClick}>

                                                <button>  Delete </button>
                                            </div>
                                        )}
                                    </section>
                                </section>
                                )

                            } else {
                                return (<section key={`message--${message.id}`}>
                                    <section className="message message__time">{formatDateString(message.time)}</section>
                                    <section className="message message__received" >
                                        <div className="message__header ">{getGenderEmoji(patient.genderId)}</div>
                                        {/* When rendering the text, replace "\n" characters with HTML line breaks (<br> tags): */}
                                        <div className="message__content">
                                            <p dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br/>') }} />
                                        </div>
                                    </section>
                                </section>
                                )
                            }


                        })
                    }

                </article>
                {Object.keys(patient).length !== 0 ?
                    <TherapistCreateMessage patient={patient} fetchSetAllMessages={fetchSetAllMessages}></TherapistCreateMessage> : ""}
            </section></main>
    )
}


export const TherapistCreateMessage = ({ patient, fetchSetAllMessages }) => {
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
            recipientId: patient.userId,

            // Replace line breaks with "\n" character before saving to the database
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

                        <textarea
                            required autoFocus

                            className="form-control"
                            placeholder="New Message"
                            value={newMessage.content}
                            onChange={(evt) => {
                                const copy = { ...newMessage }
                                copy.content = evt.target.value
                                updateNewMessage(copy)
                            }}
                        />
                        <button className="form-btn btn btn-primary"
                            onClick={(evt) => {
                                handleSaveButtonClick(evt);

                                //the input field's placeholder will reset to "New Message" since the state of newMessage.content will be an empty string after the function below is called.

                                //resetInputField
                                const emptyMessage = { ...newMessage };
                                emptyMessage.content = '';
                                updateNewMessage(emptyMessage);

                            }}
                        >
                            <span className="icon">
                                <ion-icon name="send" size="large"></ion-icon>
                            </span>
                        </button>
                    </div>
                </fieldset>



            </form>
        </>
    )
}