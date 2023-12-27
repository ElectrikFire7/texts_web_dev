import React, {useState, useEffect} from 'react'
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/texts.css'

const home = () => {
    const [texts, setTexts] = useState([]);
    const [newText, setNewText] = useState('');
    const location = useLocation();
    const username = location.state?.userData?.username ?? "non-user";

    if(username === "non-user"){
        const navigate = useNavigate();
        useEffect(() => {
            navigate('/');
        });

        return (<div>go back simon</div>);
    }

    useEffect(() => {
        const fetchdata = () => {
            axios.get('https://texttut.onrender.com/text')
                .then(response => {
                    console.log(response.data);
                    setTexts(response.data);
                    console.log(texts);
                })
                .then()
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
            }

        fetchdata();

        const intervalId = setInterval(fetchdata, 10000);

        return () => clearInterval(intervalId);
    }, [username]);


    const handleSendText = () => {
        axios.post('https://texttut.onrender.com/text', {sender: username, content: newText})
            .then( () => {
                axios.get('https://texttut.onrender.com/text')
                    .then(response => {
                        setTexts(response.data);
                    })
            })
            .then(
                setNewText('')
            )
            .catch(error => {
                console.error('Error fetching messages:', error);
            })
    };
  
    return (
        <div id="homediv">
            <ul id="ul">
                {texts.slice().reverse().map(text => {
                    return (
                        <li key={text._id}>
                          <div id="text">
                            <p id="sender">{text.sender}</p>
                            <p id="content">{text.content}</p>
                          </div>
                        </li>
                    )
                })}
            </ul>

            <div id="send">
                <input
                    type="text"
                    value={newText}
                    onChange={e => setNewText(e.target.value)}
                    placeholder="Enter your message"
                    id="sendBar"
                />
                <button onClick={handleSendText} id="sendbutton">Send</button>
            </div>
        </div>
    )
}

export default home;