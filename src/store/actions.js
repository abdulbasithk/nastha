import axios from 'axios';
import { NotificationManager } from 'react-notifications'

const serverUrl = "http://13.229.89.149";

export const setLoading = (payload) => {
    return {
        type: "SET_LOADING",
        payload
    }
}
export const setError = (payload) => {
    return {
        type: "SET_ERROR",
        payload
    }
}

export const setEvent = (payload) => {
    return {
        type: "SET_EVENT",
        payload
    }
}

export const fetchEvents = (payload) => (dispatch) => {
    dispatch(setLoading(true))
    axios({
        method: 'GET',
        url: serverUrl + '/event',
    })
        .then(({ data }) => {
            if(data) dispatch(setEvent(data))
            else dispatch(setError('Event Empty'))
        })
        .catch(err => {
            dispatch(setError(err))
        })
        .finally(() => {
            dispatch(setLoading(false))
        })
}

export const addEvents = (payload) => (dispatch) => {
    dispatch(setLoading(true))
    axios({
        method: 'POST',
        url: serverUrl + '/event',
        data: payload
    })
        .then(({data}) => {
            dispatch({type: "ADD_EVENT", payload})
            NotificationManager.success("Event Added!",payload.title, 1000)
        })
        .catch(err => {
            dispatch(setError(err))
        })
        .finally(() => {
            dispatch(setLoading(false))
        })
}

