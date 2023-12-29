import useLogin from './useLogin';
import styles from '../Style/Login.module.css';

/**
 * Represents the Login component for the login page.
 * @returns {JSX.Element} The rendered Login component.
 */
function Login() {
    const { username, setUsername, password, setPassword, handleSubmit, error } = useLogin();

    return (
        <div className={styles.loginBackground}>
            <img className={styles.logo} src='/logo.png' alt='favicon' />
            <form onSubmit={handleSubmit}>
                <h1 className={styles.title}>Connexion</h1>
                <input 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    placeholder="Nom d'utilisateur"
                    className={error ? styles['input-error'] : ''}
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Mot de passe"
                    className={error ? styles['input-error'] : ''}
                />
                {error && <div className={styles['error-message']}>{error}</div>}
                <button className={styles.submit}>Se connecter</button>
            </form>
        </div>
    );
}

export default Login;