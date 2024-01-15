import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from '../Style/ZoneModal.module.css';

Modal.setAppElement('#root');

function DeleteZoneModal({ isOpen, onRequestClose }) {
    const [id, setId] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Supprime la zone de la base de données et ferme la modal
        fetch(process.env.REACT_APP_API_IP + '/zones/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
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
                onRequestClose();
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modal}>
            <div className={styles.modalContent}>
                <h2 className={styles.createmodaltitle}>Supprimer une zone</h2>
                <form onSubmit={handleSubmit} className={styles.modalcreate}>
                    <label className={styles.label}>
                        ID :
                        <input type="number" value={id} onChange={e => setId(e.target.value)} />
                    </label>
                    <button type="submit">Supprimer</button>
                    <button onClick={onRequestClose}>Annuler</button>
                </form>
            </div>
        </Modal>
    );
}

export default DeleteZoneModal;