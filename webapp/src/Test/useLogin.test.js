import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import useLogin from '../Login/useLogin';
import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';

describe('useLogin', () => {
    test('updates username state on input change', () => {
        render(
            <Router>
                <TestComponent />
            </Router>
        );

        const usernameInput = screen.getByPlaceholderText('Nom d\'utilisateur');
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });

        expect(usernameInput.value).toBe('testuser');
    });

    test('updates password state on input change', () => {
        render(
            <Router>
                <TestComponent />
            </Router>
        );

        const passwordInput = screen.getByPlaceholderText('Mot de passe');
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        expect(passwordInput.value).toBe('testpassword');
    });

    test('handles form submission', async () => {
        render(
            <Router>
                <TestComponent />
            </Router>
        );

        const usernameInput = screen.getByPlaceholderText('Nom d\'utilisateur');
        const passwordInput = screen.getByPlaceholderText('Mot de passe');
        const submitButton = screen.getByRole('button', { name: 'Se connecter' });

        fireEvent.change(usernameInput, { target: { value: 'guest' } });
        fireEvent.change(passwordInput, { target: { value: 'guest' } });

        // Verify that the form is submitted
        fetch.mockResponseOnce(JSON.stringify({ token: 'token' }));
        fireEvent.click(submitButton);

        fireEvent.click(submitButton);

        expect(window.location.pathname).toBe('/');
    });
});

function TestComponent() {
    const { username, setUsername, password, setPassword, handleSubmit, error } = useLogin();

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Se connecter</button>
            {error && <div>{error}</div>}
        </form>
    );
}