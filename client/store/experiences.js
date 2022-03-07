import axios from 'axios';

const TOKEN = 'token';

const SET_EXPERIENCES = 'SET_EXPERIENCES';
const ADD_EXPERIENCE = 'ADD_EXPERIENCE';
const DELETE_EXPERIENCE = 'DELETE_EXPERIENCE';
const UPDATE_EXPERIENCE = 'UPDATE_EXPERIENCE';

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

export const _updateExperience = (newExperience) => {
  return { type: UPDATE_EXPERIENCE, updatedExperience: newExperience };
};

export const fetchExperiences = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: experiences } = await axios.get('/api/experiences', {
        headers: {
          authorization: token
        }
      });
      dispatch(setExperiences(experiences));
    } catch (err) {
      console.error('I have zero experience here');
      console.log(err);
    }
  };
};

export const addExperience = (name, description, imageUrl) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: created } = await axios.post(
        '/api/experiences',
        name,
        description,
        imageUrl
        , {
          headers: {
            authorization: token
          }
        });
      dispatch(_addExperience(created));
    } catch (error) {
      console.error('theres something wrong with your add experience thunk');
      console.log(error);
    }
  };
};

export const deleteExperience = (id, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const { data: experience } = await axios.delete(`/api/experiences/${id}`, {
      headers: {
        authorization: token
      }
    });
    dispatch(_deleteExperience(experience));
    history.push('/');
  };
};

export const updateExperience = (id, experienceToUpdate, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const response = await axios.put(
      `/api/experiences/${id}`,
      experienceToUpdate
      , {
        headers: {
          authorization: token
        }
      });
    const updatedExperience = response.data;
    dispatch(_updateExperience(updatedExperience));
    history.push('/');
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EXPERIENCES:
      return action.experiences;
    case ADD_EXPERIENCE:
      return [...state, action.experience];
    case DELETE_EXPERIENCE:
      return state.filter(
        (experience) => experience.id !== action.experience.id
      );
      case UPDATE_EXPERIENCE:
      let newExperiences = [...state];
      newExperiences = newExperiences.map((experience) => {
        if (experience.id === action.updatedExperience.id) {
          return action.updatedExperience;
        }
        return experience;
      });
      return [ ...state, newExperiences];
    default:
      return state;
  }
}
