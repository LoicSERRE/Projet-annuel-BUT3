import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from '../Style/ZoneModal.module.css';

Modal.setAppElement('#root');

/**
 * Modal to edit a zone in the database
 * @param {*} isOpen
 * @returns Modal to edit a zone in the database
 */
function EditZoneModal({ isOpen, onRequestClose }) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [xcoord, setXcoord] = useState('');
    const [ycoord, setYcoord] = useState('');
    const [numRows, setNumRows] = useState('');
    const [numCols, setNumCols] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [zone, setZone] = useState('');

    // Request for edit a zone
    const handleSubmit = (event) => {
        // Add the zone to the database and close the modal
        fetch(process.env.REACT_APP_API_IP + '/zones/' + id, {
            method: 'PATCH',
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
                // Make the event 'zoneEdited' to update the map
                window.dispatchEvent(new Event('zoneEdited'));
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

    // Request for get a zone from its id, to initialize the fields of the modal
    const handleIdSubmit = (e) => {
        // Get the zone from its id to initialize the fields
        fetch(process.env.REACT_APP_API_IP + '/zones?id=' + id, {
            method: 'GET',
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
                console.log(data[0].name);
                setName(data[0].name);
                setXcoord(data[0].x);
                setYcoord(data[0].y);
                setNumRows(data[0].nbline);
                setNumCols(data[0].nbcolumn);
                setHeight(data[0].height);
                setWidth(data[0].width);
                setZone(data[0]);
            })
            .catch(err => {
                console.log(err);
            });
        e.preventDefault();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modal}>
            <div className={styles.modalContent}>
                <h2 className={styles.createmodaltitle}>Éditer une zone</h2>
                {!zone ? (
                    <form onSubmit={handleIdSubmit} className={styles.modalcreate}>
                        <label className={styles.label}>
                            ID :
                            <input type="number" value={id} onChange={e => setId(e.target.value)} />
                        </label>
                        <div className={styles.buttonContainer}>
                            <button type="submit">Éditer</button>
                            <button onClick={onRequestClose}>Annuler</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit} className={styles.modalcreate}>
                        <label className={styles.label}>
                            ID :
                            <input type="number" value={id} onChange={e => setId(e.target.value)} />
                        </label>
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
                        <div className={styles.buttonContainer}>
                            <button type="submit">Éditer</button>
                            <button onClick={onRequestClose}>Annuler</button>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
}

export default EditZoneModal;