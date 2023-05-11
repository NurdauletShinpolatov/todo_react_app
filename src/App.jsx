import React, { useState } from 'react'
import './css/_null.css'
import './css/App.css'
import Task from './components/Task/Task';
import AddNewTask from './components/AddNewTask/AddNewTask';
import Filter from './components/Filter/Filter';

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
  const [onEdit, setOnEdit] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const deleteTask = (id) => {
    setTasks(prev => (prev.filter(elem => (elem.id != id))))
  }

  const enableEdit = (id) => { setOnEdit(id); }
  const cancelEdit = () => { setOnEdit(""); }
  const saveEdit = (id) => {
    const editedValue = document.querySelector("#"+id).querySelector(".task__value").value;
    setTasks(prev => (prev.map(item => {
      if (item.id == id) {
        item.value = editedValue;
      }
      return item;
    })));
    setOnEdit("");
  }

  const addNewTask = (e) => {
    e.preventDefault();
    const taskAddInput = e.target["taskAddInput"];
    if (taskAddInput.value) {
      const newTask = {
        value: taskAddInput.value,
        id: "a"+Date(),
        status: "notStarted"
      }
      setTasks(prev => ([newTask, ...prev]));
      taskAddInput.value = "";
    } else {
      alert("Tasks value should not be empty!");
    }
  }

  const clearAllTasks = () => {
    setTasks([]);
  }

  const filterByStatus = () => {
    const newSelectedStatus = document.querySelector("#filterByStatus").value;
    console.log(newSelectedStatus);
    setSelectedStatus(newSelectedStatus);
  }

    // .filter((elem) => {
  //   if (selectedStatus == "all") {
  //     return true;
  //   } else {
  //     return elem.status == selectedStatus;
  //   }
  // })

  const tasksJsx = tasks.map((item) => (
    < Task item={item}/>
  ))


  return (
    <>
      <div className='wrapper'>
        <div className="block">
          <AddNewTask addNewTask={addNewTask} />
          <Filter props={{filterByStatus, selectedStatus}} />
          <ul className="tasks__container">
            {tasksJsx}
          </ul>
          <button onClick={clearAllTasks} className='clearAll'>clear</button>
        </div>
      </div>
    </>
  )
}

export default App