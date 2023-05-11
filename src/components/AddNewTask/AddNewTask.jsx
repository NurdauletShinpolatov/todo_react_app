import React from 'react'

const AddNewTask = (addNewTask) => {
  return (
    <form onSubmit={addNewTask.addNewTask} className='task__add'>
        <input className='task__add-input' name='taskAddInput' type="text" placeholder='Write new task here...'/>
        <input className='btn' type='submit' value='Add'></input>
    </form>
  )
}

export default AddNewTask