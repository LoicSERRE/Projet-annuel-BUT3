import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login.js';
import MainPage from './MainPage/MainPage.js';
import PrivateRoute from './Route/PrivateRoute.js';
import './Style/App.css';

/**
 * Represents the main component of the application.
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/container-manager" element={<PrivateRoute><MainPage /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;