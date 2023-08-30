import { SET_TASKS, SET_COMPLETED_TASK, SET_ALL_COMPLETED, DELETE_TASK, CLEAR_ALL_COMPLETED, EDIT_TASK } from './type';

export const setTasks = (payload: any) => {
  return { type: SET_TASKS, payload: payload };
};

export const deleteTask = (id: string) => {
  return { type: DELETE_TASK, id };
};

export const editTask = (title: string, id: string) => {
  return { type: EDIT_TASK, title, id };
};

export const setCompletedTask = (id: string) => {
  return { type: SET_COMPLETED_TASK, id };
};

export const setAllCompleted = () => {
  return { type: SET_ALL_COMPLETED };
};

export const clearAllCompleted = () => {
  return { type: CLEAR_ALL_COMPLETED };
};
