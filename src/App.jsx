import { useEffect, useRef, useState } from 'react';
import './App.scss';

function App() {
  const [tasks,setTasks] = useState([]);
  const [taskInput,setTaskInput] = useState("");

  const inputRef = useRef(null);


  useEffect(
    ()=>{
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      if (storedTasks && Array.isArray(storedTasks)) {
        setTasks(storedTasks);
      }
    },[]);

    useEffect(() => {
      if (tasks.length > 0) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }, [tasks]);

    const addTask = () => {
      if (taskInput.trim()) {
        const newTask = taskInput;
        setTasks((prevTasks) => [...prevTasks, newTask]); 
        setTaskInput(''); 
        inputRef.current.focus(); 
      }
    };

    const clearTask = () =>{
      setTasks([]);
    }


  return (
    <div className="App">
         <h1>To-Do List</h1>
          <div>
            <input
              ref={inputRef} 
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)} 
              placeholder="Enter a new task"
            />
            <button onClick={addTask}>Add Task</button>
            <button onClick={clearTask}>Clear Task</button>
          </div>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
    </div>
  );
}

export default App;
