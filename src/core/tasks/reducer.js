import {
  List,
  Record,
  Map
} from 'immutable';

import {
  SIGN_OUT_SUCCESS
} from 'src/core/auth';

import {
  CREATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  FILTER_TASKS,
  GET_LIST_BY_ID_SUCCESS,
  GET_PUBLIC_LIST_ERROR,
  GET_PUBLIC_LIST_SUCCESS,
  LOAD_TASKS_SUCCESS,
  UPDATE_ACCOUNT_CONFIG,
  UPDATE_ACCOUNT_ERROR,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_SELECTED_LIST,
  UPDATE_TASK_SUCCESS
} from './action-types';

export const TasksState = new Record({
  deleted: null,
  filter: '',
  is_private: null,
  name: '',
  posts: new List(),
  previous: null,
  public: new List(),
  selectedList: new Map({})
});


export function tasksReducer(state = new TasksState(), {
  payload,
  type
}) {
  switch (type) {

    case CREATE_TASK_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        posts: state.deleted && state.deleted.key === payload.key ?
          state.previous : state.posts.unshift(payload)
      });

    case GET_PUBLIC_LIST_ERROR:
      return state;

    case GET_PUBLIC_LIST_SUCCESS:
      return state.set('public', [].concat(payload));

    case GET_PUBLIC_LIST_ERROR:
      return state;

    case UPDATE_SELECTED_LIST:
      return state.set('selectedList', payload);

    case DELETE_TASK_SUCCESS:
      return state.merge({
        deleted: payload,
        previous: state.posts,
        posts: state.posts.filter(task => task.key !== payload.key)
      });

    case FILTER_TASKS:
      return state.set('filter', payload.filterType || '');

    case LOAD_TASKS_SUCCESS:
      return state.merge({
        is_private: payload.is_private,
        name: payload.name,
        posts: new List(payload.posts.reverse())
      });

    case UPDATE_TASK_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        posts: state.posts.map(task => {
          return task.key === payload.key ? payload : task;
        })
      });

    case UPDATE_ACCOUNT_SUCCESS:
      return state.merge(payload);

    case SIGN_OUT_SUCCESS:
      return new TasksState();

    default:
      return state;
  }
}
