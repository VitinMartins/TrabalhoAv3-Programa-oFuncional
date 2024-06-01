import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar({ isAuthenticated, onLogout }) {
    return (
        <div className='navbar-content'>
            <Link className='nav-link' to='/'>Home</Link>
            {!isAuthenticated ? (
                <>
                    <Link className='nav-link' to='/cadastro'>Cadastrar</Link>
                    <Link className='nav-link' to='/login'>Logar</Link>
                </>
            ) : (
                <button className='nav-link' onClick={onLogout}>Logout</button>
            )}
        </div>
    );
}

export default NavBar;