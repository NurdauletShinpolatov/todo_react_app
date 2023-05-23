import React, { useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { tasksService } from '../../API/tasksService';
import { setTasksActionCreator } from '../../redux/todoReducer';

const AddNewTask = (props) => {
  const postMutation = useMutation(tasksService.create);
  const { setSearchFor } = props;
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("")
  const {data:tasks, isLoading, isSuccess, isError, error} = useQuery(
    "getTasks", 
    () => tasksService.get().then(res => {
      return res.data
    })
    );
  if (isSuccess) {
    dispatch(setTasksActionCreator(tasks))
  }
  
  const addNewTask = (e) => {
    e.preventDefault();
    const taskAddInput = e.target["taskAddInput"];
    if (taskAddInput.value) {
      const newTask = {
        value: taskAddInput.value,
        id: "a"+new Date(),
        status: "notStarted"
      }
      postMutation.mutate(newTask);
      taskAddInput.value = "";
    } else {
      alert("Tasks value should not be empty!");
    }
  }

  const search = () => {
    setSearchFor(inputValue);
  }

  if (!inputValue) {
    setSearchFor("")
  }

  const changeInputValue = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <form onSubmit={addNewTask} className="task__add">
      <input
        value={inputValue}
        onChange={changeInputValue}
        className="task__add-input"
        name="taskAddInput"
        type="text"
        placeholder="Write new task here..."
      />
      <input className="btn" type="submit" value="Add"></input>
      <input
        className="btn"
        onClick={search}
        type="button"
        value="Search"
      ></input>
    </form>
  );
}

export default AddNewTask