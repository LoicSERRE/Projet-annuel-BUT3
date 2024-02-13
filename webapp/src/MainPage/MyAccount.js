import React, { useState } from 'react';
import SideMenu from './SideMenu.js';

/**
 * Represent the MyAccount component for the MyAccount page.
 * 
 * @returns {JSX.Element} The rendered MyAccount component.
 */
function MyAccount() {
    // Get the access token from the local storage
    const token = localStorage.getItem('token');
    
    // Get the user information from the server
    fetch('http://carto.next-vertices.com:3000/users', {
        method: 'GET',
        headers: {
            Authorization: `${token}`
        },
        credentials: 'include'
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        }
        )
        .then(data => {
            console.log(data);
            setAccountInfo(data);
        }
        )
        .catch(err => {
            console.log(err);
        }
        );

    const [accountInfo, setAccountInfo] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setAccountInfo({
            ...accountInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <SideMenu />
            <div>
                <h1>Page de Mon Compte</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nom d'utilisateur :
                        <input type="text" name="username" value={accountInfo.username} onChange={handleChange} />
                    </label>
                    <label>
                        Mot de passe :
                        <input type="password" name="password" value={accountInfo.password} onChange={handleChange} />
                    </label>
                    <input type="submit" value="Mettre à jour" />
                </form>
            </div>
        </>
    );
}

export default MyAccount;