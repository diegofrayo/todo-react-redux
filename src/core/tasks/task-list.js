import { FirebaseUtil } from 'src/core/firebase';
import * as taskActions from './actions';
import { Task } from './task';


export const taskList = new FirebaseUtil({
  onAdd: taskActions.createTaskSuccess,
  onChange: taskActions.updateTaskSuccess,
  onLoad: taskActions.loadTodoListSuccess,
  onRemove: taskActions.deleteTaskSuccess
}, Task);
