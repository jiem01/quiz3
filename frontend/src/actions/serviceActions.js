import axios from 'axios'
import {
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
  SERVICE_LIST_FAIL,
  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_SUCCESS,
  SERVICE_DETAILS_FAIL,
} from '../constants/serviceConstants'

// LIST SERVICES (PUBLIC)
export const listServices = () => async (dispatch) => {
  try {
    dispatch({ type: SERVICE_LIST_REQUEST })

    const { data } = await axios.get(
      'http://127.0.0.1:8000/api/services/'
    )

    dispatch({
      type: SERVICE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SERVICE_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

// SERVICE DETAILS (AUTH REQUIRED)
export const getServiceDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SERVICE_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.access}`,
      },
    }

    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/service/${id}/`,
      config
    )

    dispatch({
      type: SERVICE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SERVICE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}
