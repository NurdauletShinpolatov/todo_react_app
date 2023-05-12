import React from 'react'

const AddNewTask = (props) => {
  const {setTasks} = props;

  const addNewTask = (e) => {
    e.preventDefault();
    const taskAddInput = e.target["taskAddInput"];
    if (taskAddInput.value) {
      const newTask = {
        value: taskAddInput.value,
        id: "a"+new Date(),
        status: "notStarted"
      }
      setTasks(prev => ([newTask, ...prev]));
      taskAddInput.value = "";
    } else {
      alert("Tasks value should not be empty!");
    }
  }

  return (
    <form onSubmit={addNewTask} className='task__add'>
        <input className='task__add-input' name='taskAddInput' type="text" placeholder='Write new task here...'/>
        <input className='btn' type='submit' value='Add'></input>
    </form>
  )
}

export default AddNewTask