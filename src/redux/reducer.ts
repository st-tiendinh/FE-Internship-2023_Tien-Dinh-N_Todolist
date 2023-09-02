import { StatusEnum, StorageKey, TaskInterface } from '../app/core/models/todoItem';
import { getFromLocalStorage } from '../shared/utils/local-storage';

import {
  SET_TASKS,
  SET_ALL_COMPLETED,
  DELETE_TASK,
  SET_COMPLETED_TASK,
  CLEAR_ALL_COMPLETED,
  EDIT_TASK,
} from './type';

export interface StateInterface {
  tasks: TaskInterface[];
}

const initialState: StateInterface = {
  tasks: getFromLocalStorage(StorageKey.TASK, []),
};

export const taskReducer = (state = initialState, action: any) => {
  const objReducer: Record<string, () => StateInterface> = {
    [SET_TASKS]: () => ({
      ...state,
      tasks: [action.payload.tasks, ...state.tasks],
    }),

    [DELETE_TASK]: () => ({
      ...state,
      tasks: state.tasks.filter((task) => task.id !== action.payload.id),
    }),

    [EDIT_TASK]: () => ({
      ...state,
      tasks: state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, title: action.payload.title } : task
      ),
    }),

    [SET_COMPLETED_TASK]: () => ({
      ...state,
      tasks: state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, status: +!task.status } : task
      ),
    }),

    [SET_ALL_COMPLETED]: () => {
      const isAllCompleted = state.tasks.every((task) => task.status === StatusEnum.COMPLETED);
      return {
        ...state,
        tasks: state.tasks.map((task) => ({ ...task, status: +!isAllCompleted })),
      };
    },

    [CLEAR_ALL_COMPLETED]: () => ({
      ...state,
      tasks: state.tasks.filter((task) => task.status !== StatusEnum.COMPLETED),
    }),
  };

  return typeof objReducer[action.type] === 'function' ? objReducer[action.type]() : state;
};
