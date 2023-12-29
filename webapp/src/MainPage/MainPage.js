import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Carto from './Carto.js';
import Parameters from './Parameter.js';
import Help from './Help.js';
import Informations from './Information.js';
import MyAccount from './MyAccount.js';
import SideMenu from './SideMenu.js';

function MainPage() {
    return (
        <>
            <SideMenu />
            <Routes>
                <Route path="/carto" element={<Carto />} />
                <Route path="/account" element={<MyAccount />} />
                <Route path="/parameters" element={<Parameters />} />
                <Route path="/help" element={<Help />} />
                <Route path="/informations" element={<Informations />} />
            </Routes>
        </>
    );
}


export default MainPage;