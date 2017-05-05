import {
  isAuthenticated
} from 'src/core/auth';
import App from './app';
import SignIn from './pages/sign-in';
import Tasks from './pages/tasks';
import Public from './pages/public';
import PublicTodoList from './pages/public-todo-list';


export const paths = {
  PUBLIC: '/public',
  PUBLIC_TODO_LIST: (id = ':id') => `/public/${id}`,
  ROOT: '/',
  SIGN_IN: '/sign-in',
  TASKS: '/tasks'
};


const requireAuth = getState => {
  return (nextState, replace) => {
    if (!isAuthenticated(getState())) {
      replace(paths.SIGN_IN);
    }
  };
};

const requireUnauth = getState => {
  return (nextState, replace) => {
    if (isAuthenticated(getState())) {
      replace(paths.ROOT);
    }
  };
};

const onEnterRoot = getState => {
  return (nextState, replace) => {
    if (isAuthenticated(getState())) {
      replace(paths.TASKS);
    } else {
      replace(paths.PUBLIC);
    }
  };
};


export const getRoutes = getState => {
  return {
    path: paths.ROOT,
    component: App,
    childRoutes: [{
      indexRoute: {
        onEnter: onEnterRoot(getState)
      }
    }, {
      path: paths.SIGN_IN,
      component: SignIn,
      onEnter: requireUnauth(getState)
    }, {
      path: paths.PUBLIC,
      component: Public
    }, {
      path: paths.PUBLIC_TODO_LIST(),
      component: PublicTodoList
    }, {
      path: paths.TASKS,
      component: Tasks,
      onEnter: requireAuth(getState)
    }]
  };
};
