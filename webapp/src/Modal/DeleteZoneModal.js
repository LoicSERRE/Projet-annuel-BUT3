import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from '../Style/ZoneModal.module.css';

Modal.setAppElement('#root');

/**
 * Modal to delete a zone from the database
 * @param {*} isOpen
 * @returns Modal to delete a zone from the database
 */
function DeleteZoneModal({ isOpen, onRequestClose }) {
    const [id, setId] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Delete the zone from the database and close the modal
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
                // Make the event 'newZoneAdded' to update the map
                window.dispatchEvent(new Event('zoneDeleted'));
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
                    <div className={styles.buttonContainer}>
                        <button type="submit">Supprimer</button>
                        <button onClick={onRequestClose}>Annuler</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default DeleteZoneModal;