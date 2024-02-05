// Méthode pour récupérer le token de rafraichissement depuis l'API
export const getRefreshToken = async () => {
    try {
        const response = await fetch(process.env.REACT_APP_API_IP + '/refreshToken', {
            method: 'POST',
            headers: {
                'x-refresh-token': `${localStorage.getItem('refreshToken')}`
            },
            credentials: 'include'
        });
        if (response.status === 401) {
            window.location.href = '/login';
        }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);
    } catch (error) {
        console.error(error);
    }
};