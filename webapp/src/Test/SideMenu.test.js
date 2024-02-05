import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SideMenu from '../MainPage/SideMenu';
import '@testing-library/jest-dom';

describe('SideMenu', () => {
    test('renders side menu', () => {
        render(
            <Router>
                <SideMenu />
            </Router>
        );

        // Check if the sidebar logo is rendered
        expect(screen.getByAltText('favicon')).toBeInTheDocument();

        // Check if the sidebar links are rendered
        expect(screen.getByText('Cartographie')).toBeInTheDocument();
        expect(screen.getByText('Mon compte')).toBeInTheDocument();
        expect(screen.getByText('Paramètres')).toBeInTheDocument();
        expect(screen.getByText('Aide')).toBeInTheDocument();
        expect(screen.getByText('À propos')).toBeInTheDocument();

        // Check if the logout button is rendered
        expect(screen.getByRole('button', { name: 'Déconnexion' })).toBeInTheDocument();
    });
});