import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
} from '../constants/userConstants';

import { jwtDecode } from 'jwt-decode';

// LOGIN ACTION
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };

    // 1️⃣ Login and get JWT tokens
    const { data } = await axios.post(
      'http://127.0.0.1:8000/api/users/login/',
      { username, password },
      config
    );

    // 2️⃣ Fetch full user profile including is_superuser
    const profileResponse = await axios.get(
      'http://127.0.0.1:8000/api/users/profile/',
      {
        headers: {
          Authorization: `Bearer ${data.access}`,
        },
      }
    );

    // 3️⃣ Merge JWT tokens + full user info
    const userInfo = { ...data, ...profileResponse.data };

    // 4️⃣ Dispatch success
    dispatch({ type: USER_LOGIN_SUCCESS, payload: userInfo });

    // 5️⃣ Persist in localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


// LOGOUT ACTION
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

// LIST USERS ACTION
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('http://127.0.0.1:8000/api/users/', config);

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
