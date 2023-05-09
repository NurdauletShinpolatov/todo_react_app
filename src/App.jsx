import React, { useState } from 'react'
import './css/_null.css'
import './css/App.css'

const App = () => {
  const [tasks, setTasks] = useState([
    {
      value: "Malumotlar LOCAL STORAGE da saqlanadi",
      id: "a1",
      status: "inProgress",
    },
    {
      value: "DRAG qilib vaziyfalarning tartiblang",
      id: "a2",
      status: "inProgress",
    },
    {
      value: "Ozgartirib bolgach ENTER bosing",
      id: "a3",
      status: "notStarted",
    },
    { 
      value: "CRUD", 
      id: "a4", 
      status: "notStarted",
    },
    {
      value: "BAJARILGAN vaziyfani belgilasa boladi",
      id: "a5",
      status: "completed",
    },
    {
      value: "barajilgan/bajarilmaganlarni FILTRLANG",
      id: "a6",
      status: "completed",
    }
  ]);

  const tasksJsx = tasks.map((item) => (
    <li className='task'>
      <input type="text" className='toggleCheck' />
      <div className="task_value">
        <input type="text"  value={item.value} />
      </div>
      <div className="icon">
        <i class='bx bx-sm bxs-save'></i>
      </div>
      <div className="icon">
        <i class='bx bx-sm bx-x'></i>
      </div>
      <div className="icon">
        <i class="bx bx-sm bxs-pencil"></i>
      </div>
      <div className="icon">
        <i class="bx bx-sm bx-trash"></i>
      </div>
    </li>
  ))
  return (
    <>
      <div className='wrapper'>
        {tasksJsx}
      </div>
    </>
  )
}

export default App