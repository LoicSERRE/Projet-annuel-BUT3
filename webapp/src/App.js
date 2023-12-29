import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login.js';
import MainPage from './MainPage/MainPage.js';
import PrivateRoute from './Route/PrivateRoute.js';
import Carto from '../src/MainPage/Carto.js';
import MyAccount from '../src/MainPage/MyAccount.js';
import Parameters from '../src/MainPage/Parameter.js';
import Help from '../src/MainPage/Help.js';
import Informations from '../src/MainPage/Information.js';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/container-manager/*" element={<PrivateRoute><MainPage /></PrivateRoute>} />
                <Route path="/carto" element={<PrivateRoute><Carto /></PrivateRoute>} />
                <Route path="/account" element={<PrivateRoute><MyAccount /></PrivateRoute>} />
                <Route path="/parameters" element={<PrivateRoute><Parameters /></PrivateRoute>} />
                <Route path="/help" element={<PrivateRoute><Help /></PrivateRoute>} />
                <Route path="/informations" element={<PrivateRoute><Informations /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;