import { createSelector } from 'reselect';


export function getTasks(state) {
  return state.tasks;
}

export function getUsername(state) {
  return state.tasks.get('name');
}

export function getTaskList(state) {
  return getTasks(state).posts;
}

export function getPublicLists(state) {
  return getTasks(state).public.lists;
}

export function getSelectedPublicList(state) {
  return getTasks(state).public.selectedList;
}

export function getTaskFilter(state) {
  return getTasks(state).filter;
}

export function getDeletedTask(state) {
  return getTasks(state).deleted;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleTasks = createSelector(
  getTaskList,
  getTaskFilter,
  (posts, filter) => {
    switch (filter) {
      case 'active':
        return posts.filter(task => !task.completed);

      case 'completed':
        return posts.filter(task => task.completed);

      default:
        return posts;
    }
  }
);
