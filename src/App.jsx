import React, { createContext, useEffect, useState } from 'react'
import './css/_null.css'
import './css/App.css'
import Task from './components/Task/Task';
import AddNewTask from './components/AddNewTask/AddNewTask';
import Filter from './components/Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { clearAllTasksActionCreator, setTasksActionCreator } from './redux/todoReducer';
import { useQuery } from 'react-query';
import { tasksService } from './API/tasksService';

// cd ../..
// E:
// cd Coding\WWW\Uacademy\react\todo_project
// npm start

const App = () => {
  const todoFromRedux = useSelector( (state) => state.todos.tasks);
  const dispatch = useDispatch();
  const {data:tasks, isLoading, isSuccess, isError, error} = useQuery(
    "getTasks", 
    () => tasksService.get().then(res => {
      return res.data
    })
    );
  if (isSuccess) {
    dispatch(setTasksActionCreator(tasks))
  }
  
  const selectedStatus = useSelector( (state) => state.todos.selectedStatus);

  const [taskPerPage, setTaskPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFor, setSearchFor] = useState("");
  let pages =  [];

  const filterByStatus = () => ( todoFromRedux.filter((elem) => {
    switch (selectedStatus) {
      case "completed":
        return elem.completed
      case "inProgress":
        return !elem.completed
      default:
        return true;
    }
  }) )

  const search = () => {
    // setCurrentPage(1);
    return todoFromRedux.filter(task => task.value == searchFor)
  }

  const filterByPage = (array) => {
    let numOfPages = todoFromRedux.length == 0 ? 1 : (Math.ceil(array.length / taskPerPage));
    for (let i = 1; i <= numOfPages; i++) {
      pages.push(i);
    }
    return array.slice((currentPage-1)*taskPerPage, currentPage*taskPerPage);
  }

  const tasksJsx = filterByPage(searchFor ? search() : filterByStatus()).map((item) => (
    < Task key={item.id} item={item} />
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
  
  const clearAllTasks = () => {
    dispatch(clearAllTasksActionCreator())
  }

  return (
      <div className="wrapper">
        <div className="block">
          <AddNewTask setSearchFor={setSearchFor} />
          <Filter />
          <ul className="tasks__container">
            { tasksJsx }
          </ul>
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
  );
}

export default App