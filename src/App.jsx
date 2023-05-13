import React, { useEffect, useState } from 'react'
import './css/_null.css'
import './css/App.css'
import Task from './components/Task/Task';
import AddNewTask from './components/AddNewTask/AddNewTask';
import Filter from './components/Filter/Filter';

// cd ../..
// E:
// cd Coding\WWW\Uacademy\react\todo_project

const App = () => {
  const [tasks, setTasks] = useState([
    {
      value: "Malumotlar LOCAL STORAGE da saqlanadi",
      id: "a1",
      completed: false,
    },
    {
      value: "DRAG qilib vaziyfalarning tartiblang",
      id: "a2",
      completed: false,
    },
    {
      value: "Ozgartirib bolgach ENTER bosing",
      id: "a3",
      completed: true,
    },
    { 
      value: "CRUD", 
      id: "a4", 
      completed: true,
    },
    {
      value: "BAJARILGAN vaziyfani belgilasa boladi",
      id: "a5",
      completed: false,
    },
    {
      value: "barajilgan/bajarilmaganlarni FILTRLANG",
      id: "a6",
      completed: false,
    }
  ]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [taskPerPage, setTaskPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  let pages =  [];
  
  const clearAllTasks = () => { setTasks([]); }

  const filterByStatus = () => ( tasks.filter((elem) => {
    switch (selectedStatus) {
      case "completed":
        return elem.completed
      case "inProgress":
        return !elem.completed
      default:
        return true;
    }
  }) )

  const filterByPage = (array) => {
    let numOfPages = tasks.length == 0 ? 1 : (Math.ceil(array.length / taskPerPage));
    for (let i = 1; i <= numOfPages; i++) {
      pages.push(i);
    }
    return array.slice((currentPage-1)*taskPerPage, currentPage*taskPerPage);
  }

  const tasksJsx = filterByPage(filterByStatus()).map((item) => (
    < Task key={item.id} item={item} setTasks={setTasks} />
  ))

  const changeTasksPerPage = (e) => {
    if (e.target.value == "") {
      alert("It cannot be 0. You should write a different number");
      setTaskPerPage(9);
    } else {
      setTaskPerPage(e.target.value)
    }
  }

  const pageClicked = (item) => {
    setCurrentPage(item);
  }

  // min = 1, max = 9
  return (
    <>
      <div className="wrapper">
        <div className="block">
          <AddNewTask setTasks={setTasks} />
          <Filter
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
          <ul className="tasks__container">{tasksJsx}</ul>
          <button onClick={clearAllTasks} className="clearAll">
            clear
          </button>
          <div className="pagination">
            <div>
              <label htmlFor="numOfTasks">Number of tasks: </label>
              <input
                type="number"
                onChange={changeTasksPerPage}
                name="numOfTasks"
                className="numOfTasks"
                value={taskPerPage}
              />
            </div>
            <div className="pages">
              {pages.map((item) => (
                <span
                  onClick = {() => { pageClicked(item); }}
                  key = {item}
                  className = "page"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App