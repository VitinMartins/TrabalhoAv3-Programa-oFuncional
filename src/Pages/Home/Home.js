import { useState, useEffect } from 'react';
import './Home.css';
import ActivityService from '../../service/ActivityService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({
        id: '',
        nome: '',
        descricao: '',
        prioridade: '',
        data_validade: '',
        status: ''
    });    

    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const idUsuario = storedUserData.id_usuario;
    const nomeUsuario = storedUserData.nome_usuario;  

    useEffect(() => {
        const fetchTasks = async () => {
          const activityService = new ActivityService();
          const response = await activityService.getActivity(idUsuario);
          if (response.status === 200) {
            setTasks(response.tasks);
          } else {
            // Handle error case
            console.error('Failed to fetch tasks:', response.message);
          }
        };
    
        fetchTasks();
    }, []);

    const addTask = async (e) => {
        e.preventDefault();
        const activityService = new ActivityService();
        if (task.nome.trim() === '') return;
        
        const result = await activityService.createActivity(idUsuario, task.nome);

        if(result.status == 200) {
          setTasks([...tasks, { ...task, status: 0 }]);
          setTask({
            id: '',
            nome: '',
            descricao: '',
            prioridade: '',
            data_vencimento: '',
            status: ''
          }); 
          alert(result.message);
        } else alert(result.message);
        

    };

    const updateTask = async (index) => {
        const activityService = new ActivityService();
        const updatedTask = tasks[index];

        const body = {
            nome: updatedTask.nome, // Assuming properties in updatedTask match backend expectations
            descricao: updatedTask.descricao,
            data_vencimento: updatedTask.data_vencimento,
            prioridade: updatedTask.prioridade,
          };
        
        const result = await activityService.updateActivity(updatedTask.id, body); // Pass id from updatedTask

        if (result.status === 200) {
            setTasks(tasks.map((t, i) => (i === index ? updatedTask : t)));
            alert(result.message);
        } else {
            alert(result.message);
        }
    };

    const handleInputChange = (index, field, value) => {
        const newTasks = tasks.map((t, i) => 
            i === index ? { ...t, [field]: value } : t
        );
        setTasks(newTasks);
    };

    const removeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const toggleExpand = (index) => {
        setTasks(tasks.map((t, i) =>
          i === index ? { ...t, isExpanded: !t.isExpanded } : t
        ));
    };

    const sortByDueDate = async () => {
      const activityService = new ActivityService();
      const response = await activityService.getActivityOrderDate(idUsuario);
      if (response.status === 200) {
        setTasks(response.tasks);
      } else {
        console.error('Failed to fetch tasks:', response.message);
      }
    };
    
    const sortByPriority = async () => {
      const activityService = new ActivityService();
      const response = await activityService.getActivityOrderPrioridade(idUsuario);
      if (response.status === 200) {
        setTasks(response.tasks);
      } else {
        console.error('Failed to fetch tasks:', response.message);
      }
    };

      const formatDate = (dateString) => {
        if (!dateString) {
          return "";
        }
        try {
          const [day, month, year] = dateString.split('/');
          return `${year}-${month}-${day}`;
        } catch (error) {
          return "";
        }
      };

      const convertToBrazilianDateFormat = (dateString) => {
        if (!dateString) {
            return "";
        }
        try {
            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        } catch (error) {
            console.error("Error parsing date:", error);
            return "";
        }
    };
    

    return (
        <div className="home-content">
            <form onSubmit={addTask}>
                <input 
                    type="text" 
                    value={task.nome} 
                    placeholder="Add a new task" 
                    onChange={(e) => setTask({ ...task, nome: e.target.value })}
                />
                <button type="submit">Add Task</button>
            </form>

            <div className="buttons-container">
                <button onClick={sortByDueDate}>
                    <FontAwesomeIcon icon={faArrowDownWideShort} style={{ backgroundColor: '#ff4d4d', marginRight: '5px' }} />                
                    Data de Vencimento
                </button>
                <button onClick={sortByPriority} style={{ margin: '10px' }}>
                    <FontAwesomeIcon icon={faArrowDownWideShort} style={{ backgroundColor: '#ff4d4d', marginRight: '5px' }} />    
                    Prioridade
                </button>
            </div>
        
            <ul>
                {tasks.map((t, index) => (
                <li class = "list" key={index} className={t.status} style={{ margin: '20px' }}>
                    <input
                        type="checkbox"
                        checked={t.completed}
                        onChange={() =>
                        updateTask(index, t.text, t.completed ? 'em andamento' : 'concluida')
                        }
                    />
                    <div className="task-item" onClick={() => toggleExpand(index)}>
                    <p>{t.nome}</p>
                    
                    
                    <input type="text" value={t.descricao}
                    onChange={(e) => handleInputChange(index, 'descricao', e.target.value)}/>
                    </div>
                    {t.isExpanded && (
                    <div className="task-details">
                      <p>
                        <label>Data de Vencimento:</label>
                        <input
                            type="date" value={formatDate(t.data_vencimento)}
                            onChange={(e) => handleInputChange(index, 'data_vencimento', convertToBrazilianDateFormat(e.target.value))}
                        />
                      </p>
                        <p>
                        <label>Prioridade:</label>
                        <select
                            value={t.prioridade}
                            onChange={(e) => handleInputChange(index, 'prioridade', e.target.value)}
                        >
                            <option value="baixa">Baixa</option>
                            <option value="media">Média</option>
                            <option value="alta">Alta</option>
                        </select>
                        </p>
                        <button onClick={() => updateTask(index)} style={{ margin: '10px' }}>Salvar Mudanças</button>
                    </div>
                    )}
                    <button onClick={() => removeTask(index)}>Remover</button>
                    
                </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;