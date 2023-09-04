import { loggerMiddleware } from './middleware';
import { taskReducer } from './reducer';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';

export default createStore(taskReducer, applyMiddleware(loggerMiddleware));
