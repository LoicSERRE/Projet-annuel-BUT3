import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * PrivateRoute component.
 * 
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The children components to render.
 * @param {string} props.path - The path of the route.
 * @returns {ReactNode} - The rendered component.
 */
function PrivateRoute({ children, path }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_IP + '/roles?id=1', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }
            } catch (err) {

                // Try to refresh the token
                const refreshToken = localStorage.getItem('refreshToken');
                const refreshResponse = await fetch(process.env.REACT_APP_API_IP + '/refreshToken', {    
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-refresh-token': `${refreshToken}`
                    }
                });

                if (!refreshResponse.ok) {
                    navigate('/login');
                    return;
                }

                const refreshData = await refreshResponse.json();
                localStorage.setItem('token', refreshData.token);

                fetchData();
            }
        };

        fetchData();
    }, [navigate, token]);

    return token ? children : null;
}

export default PrivateRoute;