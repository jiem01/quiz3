// src/reducers/servicesReducers.js
import {
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
  SERVICE_LIST_FAIL,
  SERVICE_DETAIL_REQUEST,
  SERVICE_DETAIL_SUCCESS,
  SERVICE_DETAIL_FAIL,
} from '../constants/servicesConstants';

const initialListState = {
  services: [],
  loading: false,
  error: null,
};

export const serviceListReducer = (state = initialListState, action) => {
  switch (action.type) {
    case SERVICE_LIST_REQUEST:
      return { ...state, loading: true };
    case SERVICE_LIST_SUCCESS:
      return { loading: false, services: action.payload, error: null };
    case SERVICE_LIST_FAIL:
      return { loading: false, services: [], error: action.payload };
    default:
      return state;
  }
};

const initialDetailState = {
  service: {},
  loading: false,
  error: null,
};

export const serviceDetailReducer = (state = initialDetailState, action) => {
  switch (action.type) {
    case SERVICE_DETAIL_REQUEST:
      return { ...state, loading: true };
    case SERVICE_DETAIL_SUCCESS:
      return { loading: false, service: action.payload, error: null };
    case SERVICE_DETAIL_FAIL:
      return { loading: false, service: {}, error: action.payload };
    default:
      return state;
  }
};
