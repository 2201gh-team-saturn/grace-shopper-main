import axios from 'axios';
import history from '../history'

const TOKEN = 'token'

const SET_RESERVATIONS = 'SET_RESERVATIONS';
const ADD_RESERVATION = 'ADD_RESERVATION';


export const setReservations = (reservations) => {
    return {
        type: SET_RESERVATIONS,
        reservations,
    };
};

export const _addReservation = (reservation) => {
    return {
        type: ADD_RESERVATION,
        reservation,
    };
};


//Thunk Creators
export const fetchReservations = () => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem(TOKEN);
            const { data } = await axios.get(`/api/reservations`, {
                headers: {
                    authorization: token
                }
            });
            dispatch(setReservations(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const addReservation = (totalNumOfDays, roomId) => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem(TOKEN);
            const { data: created } = await axios.post(
                '/api/reservations',
                totalNumOfDays,
                roomId,
                {
                    headers: {
                        authorization: token
                    }
                }
            );
            dispatch(_addReservation(created));
        } catch (error) {
            console.error('theres something wrong with your add reservation thunk');
            console.log(error);
        }
    };
};

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_RESERVATIONS:
            return action.reservations;
        case ADD_RESERVATION:
            return [...state, action.reservation];
        default:
            return state;
    }
};