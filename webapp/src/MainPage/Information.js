import React from 'react';
import SideMenu from './SideMenu.js';

/**
 * Represents the information component for the information page.
 * @returns {JSX.Element} The rendered Information component.
 */
function Information() {
    return (
        <>
            <SideMenu />
            <div>
                <h1>Page À propos</h1>
            </div>
        </>

    );
}

export default Information;