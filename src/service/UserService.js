var LINK_API = "http://127.0.0.1:5000"

class UserService {
    async createUser (name, email, password) {
        const response = await fetch(LINK_API + '/cadastro', {
            method: 'POST',
            body: JSON.stringify({
                nome: name,
                email: email,
                senha: password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    
        const data = await response.json();
    
        return { message: data.message, status: response.status };
    
    }

    async getUser (email, password) {
        const response = await fetch(LINK_API + '/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                senha: password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    
        const data = await response.json();
    
        if(response.status === 200){
            const userData = {
                id_usuario: data.id_usuario,
                nome_usuario: data.nome_usuario
            };

            // Store user data in local storage
            localStorage.setItem('userData', JSON.stringify(userData));
            return { message: 'Login bem sucedido!', status: response.status };
        }
        return { message: data.message, status: response.status };
    
    }
}

export default UserService;