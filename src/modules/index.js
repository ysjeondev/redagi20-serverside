import { combineReducers } from 'redux';
import users from './users';
// 여러 리듀서를 하나의 루트 리듀서로 결합
const rootReducer = combineReducers({
    users
});

export default rootReducer;
