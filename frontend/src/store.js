// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { serviceListReducer, serviceDetailReducer } from './reducers/servicesReducers';
import { userLoginReducer, userListReducer } from './reducers/userReducers';

// Combine reducers
const reducer = {
  serviceList: serviceListReducer,
  serviceDetail: serviceDetailReducer,
  userLogin: userLoginReducer,
  userList: userListReducer,
};

// Load user from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Initial state
const preloadedState = {
  userLogin: { userInfo: userInfoFromStorage },
};

// Configure store
const store = configureStore({
  reducer,
  preloadedState,
  devTools: true, // DevTools enabled automatically
});

export default store;
