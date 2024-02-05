import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DeleteZoneModal from '../Modal/DeleteZoneModal';
import '@testing-library/jest-dom';

describe('DeleteZoneModal', () => {
    test('renders delete zone modal', () => {
        render(
            <Router>
                <DeleteZoneModal isOpen={true} onRequestClose={() => {}} />
            </Router>
        );

        // Check if the modal title is rendered
        expect(screen.getByText('Supprimer une zone')).toBeInTheDocument();

        // Check if the form elements are rendered
        expect(screen.getByLabelText('ID :')).toBeInTheDocument();

        // Check if the buttons are rendered
        expect(screen.getByRole('button', { name: 'Supprimer' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Annuler' })).toBeInTheDocument();
    });

    test('updates state on input change', () => {
        render(
            <Router>
                <DeleteZoneModal isOpen={true} onRequestClose={() => {}} />
            </Router>
        );

        // Change the input value
        fireEvent.change(screen.getByLabelText('ID :'), { target: { value: '123' } });

        // Check if the state value is updated
        expect(screen.getByLabelText('ID :').value).toBe('123');
    });
});