var LINK_API = "http://127.0.0.1:5000"

class ActivityService {

    async createActivity (user_id, title) {
        const response = await fetch(LINK_API + '/' + user_id + '/atividades/nova', {
            method: 'POST',
            body: JSON.stringify({
                nome: title,
                descricao: "",
                data_vencimento: "",
                prioridade: "baixa"
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    
        const data = await response.json();

        return { message: data.message, status: response.status };
    }

    async getActivity (user_id) {
        const response = await fetch(LINK_API + '/' + user_id + '/atividades', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
    
        const data = await response.json();

        return { tasks: data.atividades, status: response.status };
      }

    async updateActivity (atv_id, atv) {
        console.log(atv)
        const response = await fetch(LINK_API + '/atividade/' + atv_id + '/update', {
            method: 'POST',
            body: JSON.stringify(atv),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const data = await response.json();

        return { message: data.message, status: response.status };
    }

}

export default ActivityService;