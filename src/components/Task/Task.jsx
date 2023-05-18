import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../App";

const Task = (props) => {
  const { setTasks } = useContext(Context);
  const item = props.item;

  const [isOnEdit, setIsOnEdit] = useState(false);
  const [taskValue, setTaskValue] = useState(item.value);
  const inputElem = useRef();

  const deleteTask = () => {
    setTasks((prev) => prev.filter((elem) => elem.id != item.id));
  };

  const enableEdit = () => { 
    setIsOnEdit(!isOnEdit);
    inputElem.current.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        saveEdit();
      }
    });
    inputElem.current.classList.remove("pointerEventsNone");
  };

  const cancelEdit = () => { 
    setIsOnEdit(!isOnEdit);
    setTaskValue(item.value);
    inputElem.current.classList.add("pointerEventsNone");
  };
  const saveEdit = () => {
    setIsOnEdit(false);
    inputElem.current.classList.add("pointerEventsNone");
    setTasks((prev) =>
      prev.map((elem) => {
        if (elem.id == item.id) {
          elem.value = taskValue;
        }
        return elem;
      })
    );
  };
  const changeTaskValue = (e) => {
    setTaskValue(e.target.value);
  }
  const checkTask = () => {
    setTasks(prev => prev.map((elem) => {
      if (elem.id == item.id) {
        elem.completed = !elem.completed;
      }
      return elem;
    }))
  }

  useEffect(() => {
    inputElem.current.setSelectionRange(inputElem.current.value.length, inputElem.current.value.length);
    inputElem.current.focus();
  }, [isOnEdit])

  return (
    <li
      id={item.id}
      key={item.id}
      className={`task ${item.completed ? "completedTask" : ""}`}
    >
      <input
        onChange={checkTask}
        checked={item.completed}
        type="checkbox"
        className="task__checkbox"
      />
      <div className="task__main">
        <input
          ref={inputElem}
          className={`task__value pointerEventsNone ${
            item.completed ? "completedTask" : ""
          }`}
          disabled={!isOnEdit}
          onChange={changeTaskValue}
          type="text"
          value={taskValue}
        />
      </div>
      {isOnEdit ? (
        <>
          <div className={`save task__icon`}>
            <i onClick={saveEdit} class="bx bx-sm bxs-save"></i>
          </div>
          <div className={`cancel task__icon`}>
            <i onClick={cancelEdit} class="bx bx-sm bx-x"></i>
          </div>
        </>
      ) : (
        <>
          <div className={`edit task__icon`}>
            <i onClick={enableEdit} class="bx bx-sm bxs-pencil"></i>
          </div>
          <div className={`delete task__icon`}>
            <i onClick={deleteTask} class="bx bx-sm bx-trash"></i>
          </div>
        </>
      )}
    </li>
  );
};

export default Task;
