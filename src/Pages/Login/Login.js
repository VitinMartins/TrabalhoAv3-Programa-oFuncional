import { useState } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    function logarUsuario(e) {
        e.preventDefault();
        const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

        if (usuarioSalvo && usuarioSalvo.email === email && usuarioSalvo.senha === senha) {
            alert('Login bem sucedido!');
            setIsAuthenticated(true);
            navigate('/');
        } else {
            alert('Credenciais inválidas. Tente novamente ou Usuario não cadastrado');
            setEmail('');
            setSenha('');
        }
    }

    return (
        <div className="login-content">
            <form onSubmit={logarUsuario}>
                <div className="itens-login">
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
                    <button type="submit" className="login-button">Logar</button>
                </div>
            </form>
        </div>
    );
}

export default Login;