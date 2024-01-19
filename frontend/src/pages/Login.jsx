import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/login.css';

const Login = () => {
    const navigate = useNavigate();
    const [curUsername, setUsername] = useState('');
    const [curPassword, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false); 

    const handleSendCreds = () => {
        setIsLoading(true); 

        axios.post('https://texttut.onrender.com/user/login', {username: curUsername, password: curPassword})
            .then( response => {
                console.log('Login successful', response.data);

                navigate('/home', {state: { userData: response.data }});
            })
            .catch( error => {
                console.error("error: ", error);
                setLoginError('wrong creds');
            })
            .finally(() => {
                setIsLoading(false); // Set loading state to false after request completes
            });
    }

    const redirectSignUp = () => {
        navigate('signup');
    }

    return (
        <div id = "outdiv">
            <div id = "indiv">
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>Log-in</h1>
                <input
                    type="text"
                    value={curUsername}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    id = "textBar"
                />

                <input
                    type="password"
                    value={curPassword}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    id = "textBar"
                />

                {loginError && <p>{loginError}</p>}

                <button onClick={handleSendCreds} id="lisu" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Login'}
                </button>

                <button onClick={redirectSignUp} id="lisu">Sign-Up Page</button>
            </div>
        </div>
    ) 
}

export default Login