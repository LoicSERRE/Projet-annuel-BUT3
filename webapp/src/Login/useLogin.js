// useLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for handling login functionality.
 *
 * @returns {Object} An object containing the username, setUsername, password, setPassword, handleSubmit, and error.
 */
export default function useLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            username: username,
            password: password
        };

        fetch(process.env.REACT_APP_API_IP + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('refreshToken', data.refreshToken);
                navigate('/carto');
            })
            .catch(err => {
                setError('Utilisateur ou mot de passe incorrect');
            });
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        handleSubmit,
        error
    };
}