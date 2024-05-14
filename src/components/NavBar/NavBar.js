import './NavBar.css'
import {Link} from 'react-router-dom'
function NavBar() {
    return (
        <div className='navbar-content'>
            <Link className='nav-link' to='/'>Home</Link>
            <Link className='nav-link' to='/cadastro'>Cadastrar</Link>
            <Link className='nav-link' to='/login'>Logar</Link>
        </div>
    )
}

export default NavBar