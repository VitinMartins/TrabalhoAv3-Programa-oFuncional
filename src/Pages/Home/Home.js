import { useState } from 'react';
import './Home.css';

function Home() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [status, setStatus] = useState('em andamento');

    const addTask = (e) => {
        e.preventDefault();
        if (task.trim() === '') return;
        setTasks([...tasks, { text: task, status }]);
        setTask('');
        setStatus('em andamento');
    };

    const updateTask = (index, newTask, newStatus) => {
        const newTasks = tasks.map((t, i) => 
            i === index ? { ...t, text: newTask, status: newStatus } : t
        );
        setTasks(newTasks);
    };

    const removeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    return (
        <div className="home-content">
            <form onSubmit={addTask}>
                <input 
                    type="text" 
                    value={task} 
                    onChange={(e) => setTask(e.target.value)} 
                    placeholder="Add a new task" 
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="em andamento">Em Andamento</option>
                    <option value="concluida">Concluída</option>
                    <option value="finalizada">Finalizada</option>
                </select>
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.map((t, index) => (
                    <li key={index} className={t.status}>
                        <input 
                            type="text" 
                            value={t.text} 
                            onChange={(e) => updateTask(index, e.target.value, t.status)} 
                        />
                        <select 
                            value={t.status} 
                            onChange={(e) => updateTask(index, t.text, e.target.value)}
                        >
                            <option value="em andamento">Em Andamento</option>
                            <option value="concluida">Concluída</option>
                            <option value="finalizada">Finalizada</option>
                        </select>
                        <button onClick={() => removeTask(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;