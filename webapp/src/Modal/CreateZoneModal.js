import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from '../Style/ZoneModal.module.css';

Modal.setAppElement('#root');

function CreateZoneModal({ isOpen, onRequestClose }) {
    const [name, setName] = useState('');
    const [xcoord, setXcoord] = useState('');
    const [ycoord, setYcoord] = useState('');
    const [numRows, setNumRows] = useState('');
    const [numCols, setNumCols] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');

    const handleSubmit = (event) => {
        console.log(name, xcoord, ycoord, numRows, numCols, height, width);
        // Ajoute la zone à la base de données et ferme la modal
        fetch(process.env.REACT_APP_API_IP + '/zones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            },
            credentials: 'include',
            body: JSON.stringify({
                name: name,
                x: xcoord,
                y: ycoord,
                nbline: numRows,
                nbcolumn: numCols,
                height: height,
                width: width
            })
        })
            .then(res => {
                console.log(res);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            }
            )
            .then(data => {
                console.log(data);
                onRequestClose();
            }
            )
            .catch(err => {
                console.log(err);
            }
            );
        event.preventDefault();

        // Close the modal
        onRequestClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modal}>
            <div className={styles.modalContent}>
                <h2 className={styles.createmodaltitle}>Créer une nouvelle zone</h2>
                <form onSubmit={handleSubmit} className={styles.modalcreate}>
                    <label className={styles.label}>
                        Nom :
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </label>
                    <label className={styles.label}>
                        Coordonnée X :
                        <input type="number" value={xcoord} onChange={e => setXcoord(e.target.value)} />
                    </label>
                    <label className={styles.label}>
                        Coordonnée Y :
                        <input type="number" value={ycoord} onChange={e => setYcoord(e.target.value)} />
                    </label>
                    <label className={styles.label}>
                        Hauteur :
                        <input type="number" value={height} onChange={e => setHeight(e.target.value)} />
                    </label>
                    <label className={styles.label}>
                        Largeur :
                        <input type="number" value={width} onChange={e => setWidth(e.target.value)} />
                    </label>
                    <label className={styles.label}>
                        Nombre de lignes :
                        <input type="number" value={numRows} onChange={e => setNumRows(e.target.value)} />
                    </label>
                    <label className={styles.label}>
                        Nombre de colonnes :
                        <input type="number" value={numCols} onChange={e => setNumCols(e.target.value)} />
                    </label>
                    <button type="submit">Créer</button>
                    <button onClick={onRequestClose}>Annuler</button>
                </form>
            </div>
        </Modal>
    );
}

export default CreateZoneModal;