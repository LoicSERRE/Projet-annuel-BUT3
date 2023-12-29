import React from 'react';
import SideMenu from './SideMenu.js';

/**
 * Represent the MyAccount component for the MyAccount page.
 * 
 * @returns {JSX.Element} The rendered MyAccount component.
 */
function MyAccount() {
    return (
        <>
            <SideMenu />
            <div>
                <h1>Page de Mon Compte</h1>
            </div>
        </>
    );
}

export default MyAccount;