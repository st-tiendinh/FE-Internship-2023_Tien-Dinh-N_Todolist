import { TaskInterface } from '../app/core/models/todoItem';
import {
  SET_TASKS,
  SET_COMPLETED_TASK,
  SET_ALL_COMPLETED,
  DELETE_TASK,
  CLEAR_ALL_COMPLETED,
  EDIT_TASK,
} from './type';

export const setTasks = (tasks: TaskInterface) => {
  return { type: SET_TASKS, payload: { tasks } };
};

export const deleteTask = (id: string) => {
  return { type: DELETE_TASK, payload: { id } };
};

export const editTask = (title: string, id: string) => {
  return { type: EDIT_TASK, payload: { title, id } };
};

export const setCompletedTask = (id: string) => {
  return { type: SET_COMPLETED_TASK, payload: { id } };
};

export const setAllCompleted = () => {
  return { type: SET_ALL_COMPLETED };
};

export const clearAllCompleted = () => {
  return { type: CLEAR_ALL_COMPLETED };
};
