import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedStatusActionCreator } from '../../redux/todoReducer';

const Filter = () => {
  const selectedStatus = useSelector( (state) => state.todos.selectedStatus);
  const dispatch = useDispatch()

  const changeSelectedStatus = (e) => {
    dispatch(setSelectedStatusActionCreator(e.target.value));
  }


  return (
    <div className="filter">
        <div className="filter__by-status">
          <label className='filterByStatus-label' htmlFor="filterByStatus">Filter: </label>
          <select className='filterByStatus' onChange={changeSelectedStatus} name="filterByStatus" id="filterByStatus" value={selectedStatus}>
              <option value="all">All</option>
              <option value="inProgress">In progress</option>
              <option value="completed">Completed</option>
          </select>
        </div>
    </div>
  )
}

export default Filter