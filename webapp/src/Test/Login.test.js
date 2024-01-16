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

    // test('handles form submission', () => {
    //     render(
    //         <Router>
    //             <Login />
    //         </Router>
    //     );
    
    //     // Simulate user input and form submission
    //     fireEvent.change(screen.getByPlaceholderText('Nom d\'utilisateur'), { target: { value: 'testuser' } });
    //     fireEvent.change(screen.getByPlaceholderText('Mot de passe'), { target: { value: 'testpassword' } });
    //     fireEvent.click(screen.getByRole('button', { name: 'Se connecter' }));
    
    //     // Mock the setUsername and setPassword functions
    //     jest.mock('../Login/useLogin.js', () => {
    //         const setUsername = jest.fn();
    //         const setPassword = jest.fn();
    //         const handleSubmit = jest.fn();
    
    //         return {
    //             useLogin: () => ({
    //                 username: '',
    //                 setUsername,
    //                 password: '',
    //                 setPassword,
    //                 handleSubmit,
    //                 error: ''
    //             })
    //         };
    //     });
    
    //     // Check if the mock functions were called with the correct values
    //     expect(setUsername).toHaveBeenCalledWith('testuser');
    // });
});