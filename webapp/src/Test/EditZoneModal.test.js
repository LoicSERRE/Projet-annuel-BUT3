import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import EditZoneModal from '../Modal/EditZoneModal';
import '@testing-library/jest-dom';

describe('EditZoneModal', () => {
    test('renders edit zone modal', () => {
        render(
            <Router>
                <EditZoneModal isOpen={true} onRequestClose={() => {}} />
            </Router>
        );

        // Check if the modal title is rendered
        expect(screen.getByText('Éditer une zone')).toBeInTheDocument();

        // Check if the form elements are rendered
        expect(screen.getByLabelText('ID :')).toBeInTheDocument();
        
        // Check if the buttons are rendered
        expect(screen.getByRole('button', { name: 'Éditer' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Annuler' })).toBeInTheDocument();
    });

    test('updates state on input change', () => {
        render(
            <Router>
                <EditZoneModal isOpen={true} onRequestClose={() => {}} />
            </Router>
        );

        // Change the input values
        fireEvent.change(screen.getByLabelText('ID :'), { target: { value: '123' } });

        // Check if the state values are updated
        expect(screen.getByLabelText('ID :').value).toBe('123');
    });
});