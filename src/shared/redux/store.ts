import { taskReducer } from './reducer';
import { legacy_createStore as createStore } from 'redux';

export default createStore(taskReducer);
