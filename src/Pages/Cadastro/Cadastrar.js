import './Cadastrar.css'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";

function Cadastrar() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()


    function cadastrarUsuario(e) {
        e.preventDefault()
        console.log(`Usuário ${name} foi cadastrado com sucesso utilizando a senha: ${senha} e foi utilizado o email: ${email}`)
        localStorage.setItem('usuario', JSON.stringify({name, email, senha}))

        setName('')
        setEmail('')
        setSenha('')
        navigate('/login')

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
                onChange={(e) => setName(e.target.value)}>
                </input>
                <label>Digite seu email</label>
                <input 
                type="email" 
                className="input-field" 
                value={email}
                onChange={((e) => setEmail(e.target.value))}></input>
                <label>Digite sua senha</label>
                <input 
                type="password" 
                className="input-field" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}></input>
                <button type="submit" className="cadastro-button">Cadastrar</button>
                </div>
            </form>
        </div>
    )
}

export default Cadastrar