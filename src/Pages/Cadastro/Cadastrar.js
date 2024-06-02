import './Cadastrar.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserService from '../../service/UserService';

function Cadastrar({ setIsAuthenticated }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function cadastrarUsuario(e) {
        const userService = new UserService();
        e.preventDefault()
        const result = await userService.createUser(name, email, senha)

        if (result.status === 200) {
            navigate('/login')
        } else {
            setError(result.message)
        }
    }

    return (
        <div className="cadastro-content">
            <form onSubmit={cadastrarUsuario}>
                <div className="itens-cadastro">
                    <label>Digite seu nome</label>
                    <input 
                        type="text" 
                        className="input-field" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Digite seu email</label>
                    <input 
                        type="email" 
                        className="input-field" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Digite sua senha</label>
                    <input 
                        type="password" 
                        className="input-field" 
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <button type="submit" className="cadastro-button">Cadastrar</button>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </form>
        </div>
    );
}

export default Cadastrar;