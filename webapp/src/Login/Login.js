import useLogin from './useLogin';

/**
 * Component for rendering a login form.
 *
 * @returns {JSX.Element} The rendered login form.
 */
function Login() {
    const { username, setUsername, password, setPassword, handleSubmit, error } = useLogin();

    return (
        <div>
            <img className='logo' src='/logo.png' alt='favicon' />
            <form onSubmit={handleSubmit}>
                <h1 className='title'>Connexion</h1>
                <input 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    placeholder="Nom d'utilisateur"
                    className={error ? 'input-error' : ''}
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Mot de passe"
                    className={error ? 'input-error' : ''}
                />
                {error && <div className='error-message'>{error}</div>}
                <button className='submit'>Se connecter</button>
            </form>
        </div>
    );
}

export default Login;