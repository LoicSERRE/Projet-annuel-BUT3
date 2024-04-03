import React, { useState } from 'react';
import SideMenu from './SideMenu.js';
import Styles from '../Style/Account.module.css';

function MyAccount() {
    const token = localStorage.getItem('token');
    const id = JSON.parse(atob(token.split('.')[1])).id;

    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vérifiez si le nouveau mot de passe et sa confirmation correspondent
        if (newPassword !== newPasswordConfirmation && newPassword !== '') {
            // Mettre à jour le message d'erreur
            setErrorMessage('Le nouveau mot de passe ne sont pas identiques');
            return;
        } 
        // Si l'ancien mot de passe est valide
        else if (CheckPassword(oldPassword) === false) {
            // Mettre à jour le message d'erreur
            setErrorMessage('Ancien mot de passe invalide');
            return;
        }
        else {
            setErrorMessage('');
        }

        // Envoyer la requête pour mettre à jour le nom d'utilisateur et le mot de passe
        fetch(process.env.REACT_APP_API_IP + "/users/" + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                username: username,
                password: newPassword,
                role_id: id
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log('User updated successfully');
            // Deconnecter l'utilisateur vers la page de connexion
            window.location.href = '/login';
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            fetch(process.env.REACT_APP_API_IP + '/logout', {
                method: 'POST',
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
            })
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        });
    };

    async function CheckPassword(inputtxt) {
        // Fonction qui fait une requete à l'api pour générer un token et vériier si le mot de passe est correct
        try {
            const res = await fetch(process.env.REACT_APP_API_IP + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: inputtxt
                })
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    return (
        <>
            <div className={Styles.accountBackground}>
                <SideMenu />
                <h1 className={Styles.title}>Mon compte</h1>
                <div className={Styles.content}>
                    <div className={Styles.textbackground}>
                        <form onSubmit={handleSubmit} className={Styles.form}>
                            <label className={Styles.formItem}>
                                Nom d'utilisateur :
                                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </label>
                            <label className={Styles.formItem}>
                                Ancien mot de passe :
                                <input type="password" name="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                            </label>
                            <label className={Styles.formItem}>
                                Nouveau mot de passe :
                                <input type="password" name="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </label>
                            <label className={Styles.formItem}>
                                Confirmez le nouveau mot de passe :
                                <input type="password" name="newPasswordConfirmation" value={newPasswordConfirmation} onChange={(e) => setNewPasswordConfirmation(e.target.value)} />
                            </label>
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            <input type="submit" value="Mettre à jour" className={Styles.submitButton} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyAccount;