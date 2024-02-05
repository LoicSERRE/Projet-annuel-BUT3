import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateZoneModal from '../Modal/CreateZoneModal';
import '@testing-library/jest-dom';

describe('CreateZoneModal', () => {
    test('renders create zone modal', () => {
        render(
            <Router>
                <CreateZoneModal isOpen={true} onRequestClose={() => {}} />
            </Router>
        );

        // Check if the modal title is rendered
        expect(screen.getByText('Créer une nouvelle zone')).toBeInTheDocument();

        // Check if the form elements are rendered
        expect(screen.getByLabelText('Nom :')).toBeInTheDocument();
        expect(screen.getByLabelText('Coordonnée X :')).toBeInTheDocument();
        expect(screen.getByLabelText('Coordonnée Y :')).toBeInTheDocument();
        expect(screen.getByLabelText('Hauteur :')).toBeInTheDocument();
        expect(screen.getByLabelText('Largeur :')).toBeInTheDocument();
        expect(screen.getByLabelText('Nombre de lignes :')).toBeInTheDocument();
        expect(screen.getByLabelText('Nombre de colonnes :')).toBeInTheDocument();

        // Check if the buttons are rendered
        expect(screen.getByRole('button', { name: 'Créer' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Annuler' })).toBeInTheDocument();
    });

    test('updates state on input change', () => {
        render(
            <Router>
                <CreateZoneModal isOpen={true} onRequestClose={() => {}} />
            </Router>
        );

        // Change the input values
        fireEvent.change(screen.getByLabelText('Nom :'), { target: { value: 'Test Zone' } });
        fireEvent.change(screen.getByLabelText('Coordonnée X :'), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText('Coordonnée Y :'), { target: { value: '20' } });
        fireEvent.change(screen.getByLabelText('Hauteur :'), { target: { value: '100' } });
        fireEvent.change(screen.getByLabelText('Largeur :'), { target: { value: '200' } });
        fireEvent.change(screen.getByLabelText('Nombre de lignes :'), { target: { value: '5' } });
        fireEvent.change(screen.getByLabelText('Nombre de colonnes :'), { target: { value: '8' } });

        // Check if the state values are updated
        expect(screen.getByLabelText('Nom :').value).toBe('Test Zone');
        expect(screen.getByLabelText('Coordonnée X :').value).toBe('10');
        expect(screen.getByLabelText('Coordonnée Y :').value).toBe('20');
        expect(screen.getByLabelText('Hauteur :').value).toBe('100');
        expect(screen.getByLabelText('Largeur :').value).toBe('200');
        expect(screen.getByLabelText('Nombre de lignes :').value).toBe('5');
        expect(screen.getByLabelText('Nombre de colonnes :').value).toBe('8');
    });
});