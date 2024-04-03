import styles from '../Style/SideMenu.module.css';
import Sidebar from "react-sidebar";
import { FaBars } from 'react-icons/fa';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Component representing the side menu.
 * @returns {JSX.Element} The side menu component.
 */
function SideMenu() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const onSetSidebarOpen = (open) => {
        setSidebarOpen(open);
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
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
            }
            )
            .then(data => {
                console.log(data);
            }
            )
            .catch(err => {
                console.log(err);
            }
            );

        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');

        window.location.reload();
    };

    return (
        <Sidebar
            sidebar={
                <div className={styles.sidebar}>
                    <img className={styles.logo} src='/logo.png' alt='favicon' />
                    <ul className={styles.sidebarList}>
                        <li className={styles.sidebarListItem}><Link to="/carto">Cartographie</Link></li>
                        <li className={styles.sidebarListItem}><Link to="/account">Mon compte</Link></li>
                        <li className={styles.sidebarListItem}><Link to="/parameters">Paramètres</Link></li>
                        <li className={styles.sidebarListItem}><Link to="/help">Aide</Link></li>
                        <li className={styles.sidebarListItem}><Link to="/informations">À propos</Link></li>
                    </ul>
                    <button className={styles.logoutLink} onClick={handleLogout}>Déconnexion</button>
                </div>
            }
            open={sidebarOpen}
            onSetOpen={onSetSidebarOpen}
            styles={{ sidebar: { background: "white", width: "250px" } }}
        >
            <button className={styles.openSidebarButton} onClick={() => onSetSidebarOpen(true)}>
                <FaBars />
            </button>
        </Sidebar>
    );
}

export default SideMenu;