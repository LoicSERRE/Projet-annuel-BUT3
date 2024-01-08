import React from 'react';
import SideMenu from './SideMenu.js';
import styles from '../Style/Informations.module.css';

/**
 * Represents the information component for the information page.
 * @returns {JSX.Element} The rendered Information component.
 */
function Information() {
    return (
        <>
            <SideMenu />
            <div className={styles.informationBackground}>
                <div className={styles.content}>
                    <h1 className={styles.title}>À propos</h1>
                    <div className={styles.textbackground}>
                        <p className={styles.text}>Cette application est un POC (Proof of Concept) développé par Loïc SERRE dans le cadre de son BUT Informatique 3ème année. Elle vise à faciliter la gestion des emplacements de conteneurs dans les ports commerciaux.</p>
                        <p className={styles.text}>Grâce à une interface intuitive, les utilisateurs peuvent facilement visualiser et organiser les emplacements de conteneurs, ce qui permet d'améliorer l'efficacité et la productivité des opérations portuaires.</p>
                        <p className={styles.text}>J'espére que vous trouverez cette application utile et je suis toujours ouverts aux commentaires et suggestions pour améliorer l'application.</p>
                    </div>
                    <p className={styles.copyright}>©2023 BUT Informatique - Loïc	SERRE</p>
                </div>
            </div>
        </>
    );
}

export default Information;