import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../Login/Login';
import '@testing-library/jest-dom';

describe('Login', () => {
    test('renders login form', () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        // Check if the login form elements are rendered
        expect(screen.getByText('Connexion')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Nom d\'utilisateur')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Mot de passe')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Se connecter' })).toBeInTheDocument();
    });
});

test('updates username state on input change', () => {
    render(
        <Router>
            <Login />
        </Router>
    );

    const usernameInput = screen.getByPlaceholderText('Nom d\'utilisateur');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });

    expect(usernameInput.value).toBe('testuser');
});

test('updates password state on input change', () => {
    render(
        <Router>
            <Login />
        </Router>
    );

    const passwordInput = screen.getByPlaceholderText('Mot de passe');
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(passwordInput.value).toBe('testpassword');
});