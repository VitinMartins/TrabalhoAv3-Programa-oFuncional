import NavBar from './components/NavBar/NavBar';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Cadastrar from './Pages/Cadastro/Cadastrar';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('usuario'));
    const navigate = useNavigate();

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('usuario'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <div className='App'>
            <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <Routes>
                <Route path='/' element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                <Route path='/cadastro' element={<Cadastrar setIsAuthenticated={setIsAuthenticated} />} />
                <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            </Routes>
        </div>
    );
}

export default App;