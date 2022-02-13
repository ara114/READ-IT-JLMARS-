import {combineReducers} from 'redux';
import stories from './stories';
import authReducer from './auth';
export default combineReducers({
    stories, authReducer
});