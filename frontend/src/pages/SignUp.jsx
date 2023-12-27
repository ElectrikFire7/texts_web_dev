import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/login.css'

const SignUp = () => {
    const navigate = useNavigate();
    const [newUsername, setUsername] = useState('');
    const [newPassword, setPassword] = useState('');
    const [signUpError, setSignUpError] = useState('');

    const handleSendCreds = () => {
        axios.post('https://texttut.onrender.com/user/signin', {username: newUsername, password: newPassword})
            .then( response => {
                console.log('Sign-Up successful', response.data);

                navigate('/home', {state: { userData: response.data }});
            })
            .catch( error => {
                console.error("error: ", error);
                setSignUpError('Username already exists');
            });
    }

    const redirectLogin = () => {
        navigate('/');
    }
  
    return (
        <div id = "outdiv">
        <div id = "indiv">
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>Sign-Up</h1>
            <input
                type="text"
                value={newUsername}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                id = "textBar"
            />

            <input
                type="password"
                value={newPassword}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                id = "textBar"
            />

            <button onClick={handleSendCreds} id = "lisu">Sign-Up</button>

            {signUpError && <p>{signUpError}</p>}

            <button onClick={redirectLogin} id = "lisu">Login Page</button>
        </div>
        </div>
    )
}

export default SignUp