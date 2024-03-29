import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import CreateZoneModal from "../Modal/CreateZoneModal.js";
import EditZoneModal from "../Modal/EditZoneModal.js";
import DeleteZoneModal from "../Modal/DeleteZoneModal.js";
import styles from '../Style/Carto.module.css';

/**
 * Custom control to create, edit and delete zones
 * @param {*} props
 * @returns Custom control to create, edit and delete zones
 */
class CustomEditControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creatingZone: false,
            creatingNewZone: false,
            editingZone: false,
            deletingZone: false,
            newZone: null
        };
    }

    handleCreate = () => {
        this.setState({ creatingNewZone: true });
    }

    handleEdit = () => {
        this.setState({ editingZone: true });
    }

    handleDelete = () => {
        this.setState({ deletingZone: true });
    }

    handleCloseCreateModal = () => {
        this.setState({ creatingNewZone: false });
    }

    handleCloseEditModal = () => {
        this.setState({ editingZone: false });
    }

    handleCloseDeleteModal = () => {
        this.setState({ deletingZone: false });
    }

    canPerformAction = (action) => {
        // Get the permissions from the token
        const token = localStorage.getItem('token');
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const permissions = decodedToken.permissions;

        // If permissions are all, we can do everything
        if (permissions === 'all') {
            return true;
        }

        return permissions['/zones'][action];
    }

    render() {
        return (
            <div className={styles.buttoncontainer}>
                {this.canPerformAction('POST') && (
                    <button className={styles.button} onClick={this.handleCreate}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                )}
                {this.canPerformAction('PUT') && (
                    <button className={styles.button} onClick={this.handleEdit}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                )}
                {this.canPerformAction('DELETE') && (
                    <button className={styles.button} onClick={this.handleDelete}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                )}
                {this.state.creatingNewZone && (
                    <CreateZoneModal
                        isOpen={this.state.creatingNewZone}
                        onRequestClose={this.handleCloseCreateModal}
                    />
                )}
                {this.state.editingZone && (
                    <EditZoneModal
                        isOpen={this.state.editingZone}
                        onRequestClose={this.handleCloseEditModal}
                    />
                )}
                {this.state.deletingZone && (
                    <DeleteZoneModal
                        isOpen={this.state.deletingZone}
                        onRequestClose={this.handleCloseDeleteModal}
                    />
                )}
            </div>
        );
    }
}

export default CustomEditControl;