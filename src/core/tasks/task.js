import { Record } from 'immutable';


export const Task = new Record({
  is_private: false,
  completed: false,
  key: null,
  title: null
});
