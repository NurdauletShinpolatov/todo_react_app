const ADD = "ADD";
const DELETE = "DELETE";
const EDIT = "EDIT";
const TOGGLE_CHECK = "TOGGLE_CHECK";
const SET_SELECTED_STATUS = "SET_SELECTED_STATUS";
const CLEAR_ALL_TASKS = "CLEAR_ALL_TASKS";
const SET_TASKS = "SET_TASKS";
const RELOAD = "RELOAD"

const initialState = {
  tasks: [
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
  ],
  selectedStatus: "all",
  reload: true
}

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD:
            return {...state, tasks: [action.newTodo, ...state.tasks]};

        case EDIT:
            return {...state, tasks: state.tasks.map((task) => {
              if (task.id == action.id) {
                return action.task;
              }
              return task;
            })}

        case DELETE:
            return {...state, tasks: state.tasks.filter((task) => {
              if (task.id == action.id){
                return false;
              }
              return true;
            })}

        case TOGGLE_CHECK:
            return {...state, tasks: state.tasks.map((task) => {
              if (task.id == action.id) {
                task.completed = !task.completed;
              }
              return task
            })}

        case SET_SELECTED_STATUS:
          return {...state, selectedStatus: action.status}

        case CLEAR_ALL_TASKS:
          return {...state, tasks: []}

        case SET_TASKS:
          return {...state, tasks: action.tasks}

        case RELOAD:
          return {...state, reload: !state.reload}

        default:
            return state;
    }
}

export const addActionCreator = (newTask) => {
    return {
        type: ADD,
        newTask,
    };
};
export const setSelectedStatusActionCreator = (status) => {
    return {
        type: SET_SELECTED_STATUS,
        status,
    };
};
export const setTasksActionCreator = (tasks) => {
  return {
    type: SET_TASKS,
    tasks,
  }
}
export const toggleCompletedActionCreator = (id) => {
    return {
        type: TOGGLE_CHECK,
        id,
    };
};
export const editActionCreator = (id, task) => {
    return {
        type: EDIT,
        id,
        task,
    };
};
export const deleteActionCreator = (id) => {
    return {
        type: DELETE,
        id,
    };
};
export const clearAllTasksActionCreator = () => {
    return {
        type: CLEAR_ALL_TASKS
    };
};
export const reloadAC = () => {
  return {
    type: RELOAD
  }
}