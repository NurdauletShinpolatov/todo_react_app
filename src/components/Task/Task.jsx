import React from 'react'

const Task = (item) => {

  return (
    <li id={item.item.id} key={item.item.id} className='task'>
      <input type="checkbox" className='task__checkbox' />
      <div className="task__main">
        <input disabled className='task__value' type="text"  value={item.item.value} />
      </div>
      <div className={`task__icon`} >
        <i class='bx bx-sm bxs-save'></i>
      </div>
      <div className={`task__icon`}>
        <i class='bx bx-sm bx-x'></i>
      </div>
      <div className={`task__icon`}>
        <i class="bx bx-sm bxs-pencil"></i>
      </div>
      <div className={`task__icon`}>
        <i class="bx bx-sm bx-trash"></i>
      </div>
    </li>
  )
}

export default Task