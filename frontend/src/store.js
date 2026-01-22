import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { servicesListReducer } from './reducers/servicesReducers';
import { userLoginReducer } from './reducers/userReducers';

const reducer = combineReducers({
  servicesList: servicesListReducer, // <-- add this
  userLogin: userLoginReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
});

export default store;
