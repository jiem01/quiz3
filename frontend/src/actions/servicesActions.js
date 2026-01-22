// src/actions/servicesActions.js
import axios from 'axios';
import {
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
  SERVICE_LIST_FAIL,
  SERVICE_DETAIL_REQUEST,
  SERVICE_DETAIL_SUCCESS,
  SERVICE_DETAIL_FAIL,
} from '../constants/servicesConstants';

// Fetch all services
export const listServices = () => async (dispatch) => {
  try {
    dispatch({ type: SERVICE_LIST_REQUEST });

    const { data } = await axios.get('http://127.0.0.1:8000/api/services/');

    dispatch({
      type: SERVICE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SERVICE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Fetch single service by ID
export const getServiceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SERVICE_DETAIL_REQUEST });

    const { data } = await axios.get(`http://127.0.0.1:8000/api/service/${id}`);

    dispatch({
      type: SERVICE_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SERVICE_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
