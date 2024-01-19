import React, {useState, useEffect, useRef} from 'react'
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/texts.css'

const Homes = () => {
    const navigate = useNavigate();
    const [texts, setTexts] = useState([]);
    const [newText, setNewText] = useState('');
    const location = useLocation();
    const username = location.state?.userData?.username ?? "non-user";
    const messagesEndRef = useRef(null);

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
                    setTexts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
            }

        fetchdata();

        const intervalId = setInterval(fetchdata, 5000);

        return () => clearInterval(intervalId);
    }, [username]);

    useEffect(() => {
        scrollToBottom();
    }, [texts]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendText = () => {
        axios.post('https://texttut.onrender.com/text', {sender: username, content: newText})
            .then(() => {
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

    const handlePixelBoardClick = () => {
        navigate('/pixel', { state: { userData: { username } } });
    };
    
  
    return (
        <div id="homediv">
            <div className='navBar'><button className='currentTabButton'>Global Chat</button> <button className='tabButton' onClick={handlePixelBoardClick}>PixelBoard</button></div>

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
                <div ref={messagesEndRef} />
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

export default Homes;