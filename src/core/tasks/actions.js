import {
  getDeletedTask
} from './selectors';
import {
  taskList
} from './task-list';
import {
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  DELETE_TASK_SUCCESS,
  FILTER_TASKS,
  GET_LIST_BY_ID_SUCCESS,
  GET_PUBLIC_LIST_ERROR,
  GET_PUBLIC_LIST_SUCCESS,
  LOAD_TASKS_SUCCESS,
  UNDELETE_TASK_ERROR,
  UNLOAD_TASKS_SUCCESS,
  UPDATE_ACCOUNT_CONFIG,
  UPDATE_ACCOUNT_ERROR,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_SELECTED_LIST,
  UPDATE_TASK_ERROR,
  UPDATE_TASK_SUCCESS
} from './action-types';
import {
  taskList as firebaseHelper
} from 'src/core/tasks/task-list';


export function createTask(title) {
  return dispatch => {
    taskList.push({
        completed: false,
        title
      })
      .catch(error => dispatch(createTaskError(error)));
  };
}

export function createTaskError(error) {
  return {
    type: CREATE_TASK_ERROR,
    payload: error
  };
}

export function createTaskSuccess(task) {
  return {
    type: CREATE_TASK_SUCCESS,
    payload: task
  };
}

export function deleteTask(task) {
  return dispatch => {
    taskList.remove(task.key)
      .catch(error => dispatch(deleteTaskError(error)));
  };
}

export function deleteTaskError(error) {
  return {
    type: DELETE_TASK_ERROR,
    payload: error
  };
}

export function deleteTaskSuccess(task) {
  return {
    type: DELETE_TASK_SUCCESS,
    payload: task
  };
}

export function undeleteTask() {
  return (dispatch, getState) => {
    const task = getDeletedTask(getState());
    if (task) {
      taskList.set(task.key, {
          completed: task.completed,
          title: task.title
        })
        .catch(error => dispatch(undeleteTaskError(error)));
    }
  };
}

export function undeleteTaskError(error) {
  return {
    type: UNDELETE_TASK_ERROR,
    payload: error
  };
}

export function updateTaskError(error) {
  return {
    type: UPDATE_TASK_ERROR,
    payload: error
  };
}

export function updateTask(task, changes) {
  return dispatch => {
    taskList.update(task.key, changes)
      .catch(error => dispatch(updateTaskError(error)));
  };
}

export function updateTaskSuccess(task) {
  return {
    type: UPDATE_TASK_SUCCESS,
    payload: task
  };
}

export function loadTodoListSuccess(todoList) {
  return {
    type: LOAD_TASKS_SUCCESS,
    payload: todoList
  };
}

export function filterTasks(filterType) {
  return {
    type: FILTER_TASKS,
    payload: {
      filterType
    }
  };
}

export function loadTasks() {
  return (dispatch, getState) => {
    const {
      auth
    } = getState();
    taskList.path = `tasks/${auth.id}/`;
    taskList.subscribe(dispatch);
  };
}

export function unloadTasks() {
  taskList.unsubscribe();
  return {
    type: UNLOAD_TASKS_SUCCESS
  };
}

export function updateAccountConfig(authId, data) {
  return dispatch => {
    firebaseHelper.updateAccountConfig(authId, data)
      .then(result => dispatch(updateAccountConfigSuccess(data)))
      .catch(error => dispatch(updateAccountConfigError(error)));
  };
}

export function updateAccountConfigSuccess(obj) {
  return {
    type: UPDATE_ACCOUNT_SUCCESS,
    payload: obj
  };
}

export function updateAccountConfigError(err) {
  return {
    type: UPDATE_ACCOUNT_ERROR,
    payload: err
  };
}

export function getPublicListSuccess(publicList) {
  return {
    type: GET_PUBLIC_LIST_SUCCESS,
    payload: publicList
  };
}

export function getPublicListError(err) {
  return {
    type: GET_PUBLIC_LIST_ERROR,
    payload: err
  };
}

export function getPublicLists() {
  return dispatch => {
    firebaseHelper.getPublicLists()
      .then(result => dispatch(getPublicListSuccess(result)))
      .catch(error => dispatch(getPublicListError(error)));
  };
}

export function getListById(id) {
  return dispatch => {
    firebaseHelper.getListById(id)
      .then(list => dispatch(updateSelectedList(list)))
  };
}

export function updateSelectedList(selectedList) {
  return {
    type: UPDATE_SELECTED_LIST,
    payload: selectedList
  };
}
