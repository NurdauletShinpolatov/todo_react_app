import React from 'react'

const Filter = (props) => {
  return (
    <div className="filter">
        <div className="filter__by-status">
        <label htmlFor="filterByStatus"></label>
        <select onChange={props.filterByStatus} name="filterByStatus" id="filterByStatus" value={props.selectedStatus}>
            <option value="all">All</option>
            <option value="notStarted">Not started</option>
            <option value="inProgress">In progress</option>
            <option value="completed">Completed</option>
        </select>
        </div>
    </div>
  )
}

export default Filter