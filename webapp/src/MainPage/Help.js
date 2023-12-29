import React from 'react';
import SideMenu from './SideMenu.js';

/**
 * Represent the help component for the help page.
 * @returns {JSX.Element} The rendered help component.
 */
function Help() {
    return (
        <>
            <SideMenu />
            <div>
                <h1>Page d'Aide</h1>
            </div>
        </>
    );
}

export default Help;