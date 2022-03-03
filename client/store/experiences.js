import axios from 'axios';

const SET_EXPERIENCES = 'SET_EXPERIENCES';
const ADD_EXPERIENCE = 'ADD_EXPERIENCE';
const DELETE_EXPERIENCE = 'DELETE_EXPERIENCE';

export const setExperiences = (experiences) => {
  return {
    type: SET_EXPERIENCES,
    experiences,
  };
};

export const _addExperience = (experience) => {
  return {
    type: ADD_EXPERIENCE,
    experience,
  };
};

export const _deleteExperience = (experience) => {
  return {
    type: DELETE_EXPERIENCE,
    experience,
  };
};

export const fetchExperiences = () => {
  return async (dispatch) => {
    try {
      const { data: experiences } = await axios.get('/api/experiences');
      dispatch(setExperiences(experiences));
    } catch (err) {
      console.error('I have zero experience here');
      console.log(err);
    }
  };
};

export const addExperience = (name, price, description, imageUrl) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post(
        '/api/experiences',
        name,
        price,
        description,
        imageUrl
      );
      dispatch(_addExperience(created));
    } catch (error) {
      console.error('theres something wrong with your add experience thunk');
      console.log(error);
    }
  };
};

export const deleteExperience = (id, history) => {
  return async (dispatch) => {
    const { data: experience } = await axios.delete(`/api/experiences/${id}`);
    dispatch(_deleteExperience(experience));
    history.push('/');
  };
};

const initialState = [];

export default function experienceReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EXPERIENCES:
      return action.experiences;
    case ADD_EXPERIENCE:
      return [...state, action.experience];
    case DELETE_EXPERIENCE:
      return state.filter(
        (experience) => experience.id !== action.experience.id
      );
    default:
      return state;
  }
}
