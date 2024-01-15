import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import CreateZoneModal from "../Modal/CreateZoneModal.js";
import styles from '../Style/Carto.module.css';

class CustomEditControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creatingZone: false,
            creatingNewZone: false,
            newZone: null
        };
    }

    handleCreate = () => {
        this.setState({ creatingNewZone: true });
    }

    onDrawEdit = (e) => {
        console.log("modification d'une zone", e);
    }

    onDrawDelete = (e) => {
        console.log("suppression d'une zone", e);
    }

    handleCloseCreateModal = () => {
        this.setState({ creatingNewZone: false });
    }

    handleEdit = () => {
        // Activez le mode d'édition ici
        console.log("modification d'une zone");
    }

    handleDelete = () => {
        // Activez le mode de suppression ici
        console.log("suppression d'une zone");
    }

    render() {
        return (
            <div className={styles.buttoncontainer}>
                <button className={styles.button} onClick={this.handleCreate}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                <button className={styles.button} onClick={this.handleEdit}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className={styles.button} onClick={this.handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
                {this.state.creatingNewZone && (
                    <CreateZoneModal
                        isOpen={this.state.creatingNewZone}
                        onRequestClose={this.handleCloseCreateModal}
                    />
                )}
            </div>
        );
    }
}

export default CustomEditControl;