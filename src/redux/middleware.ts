import { Dispatch, MiddlewareAPI } from 'redux';

export const loggerMiddleware = (storeAPI: MiddlewareAPI) => (next: Dispatch) => (action: any) => {
  console.log('Dispatching: ', action);
  console.log('Current state: ', storeAPI.getState());
  next(action);
  console.log('Next State: ', storeAPI.getState());
};
