import React from 'react';
import SideMenu from './SideMenu.js';
import styles from '../Style/Help.module.css';

/**
 * Represent the help component for the help page.
 * @returns {JSX.Element} The rendered help component.
 */
function Help() {
    return (
        <>
            <SideMenu />
            <div className={styles.helpBackground}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Aide</h1>
                    <div className={styles.textbackground}>
                        <h2 className={styles.subtitle}>Cartographie</h2>
                        <p className={styles.text}>Pour la cartographie, vous pouvez utiliser la barre d'outils à droite de l'écran pour ajouter, modifier, ou bien supprimer une zones.</p>
                        <h2 className={styles.subtitle}>Comptes</h2>
                        <p className={styles.text}>Pour les comptes, vous avez un onglet "Mon compte" dans le menu de gauche. Vous pouvez modifier votre mot de passe, vos informations personnelles.</p>
                        <h2 className={styles.subtitle}>Paramètres</h2>
                        <p className={styles.text}>Dans paramètres, vous pouvez modifier les informations de l'application. En fonction de votre rôle, une interface différente vous sera proposée.</p>
                        <ul className={[styles.text, styles.list].join(' ')}>
                            <li>Si vous êtes un administrateur, vous aurez accès à la gestion des utilisateurs, des zones, et des conteneurs, enfin bref de toute l'application.</li>
                            <li>Si vous êtes un utilisateur, vous n'aurez accès qu'à la cartographie, et à votre compte.</li>
                            <li>Et enfin si vous êtes un invité, vous n'aurez accès qu'à la cartographie.</li>
                        </ul>
                        <h2 className={styles.subtitle}>À propos</h2>
                        <p className={styles.text}>Vous pouvez également consulter la page "À propos" pour des informations sur l'application.</p>
                        <p className={styles.text}>Si vous avez d'autres questions, n'hésitez pas à nous contacter.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Help;