import {
  List,
  Record
} from 'immutable';

import {
  SIGN_OUT_SUCCESS
} from 'src/core/auth';

import {
  CREATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  FILTER_TASKS,
  LOAD_TASKS_SUCCESS,
  UPDATE_ACCOUNT_CONFIG,
  UPDATE_TASK_SUCCESS
} from './action-types';


export const TasksState = new Record({
  deleted: null,
  filter: '',
  is_private: null,
  name: '',
  posts: new List(),
  previous: null,
  public: {
    lists: [],
    selectedList: {}
  }
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

    case UPDATE_ACCOUNT_CONFIG:
      return state.merge(payload);

    case SIGN_OUT_SUCCESS:
      return new TasksState();

    default:
      return state;
  }
}
