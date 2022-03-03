import axios from 'axios';

const GET_SINGLE_EXPERIENCE = 'GET_SINGLE_EXPERIENCE';
const UPDATE_EXPERIENCE = 'UPDATE_EXPERIENCE';

const getSingleExperience = (experience) => {
  return {
    type: GET_SINGLE_EXPERIENCE,
    experience,
  };
};

const _updateExperience = (newExperience) => {
  return { type: UPDATE_EXPERIENCE, updatedExperience: newExperience };
};

export const fetchSingleExperience = (experienceId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/experiences/${experienceId}`);
    dispatch(getSingleExperience(data));
  };
};

export const updateExperience = (id, experienceToUpdate, history) => {
  return async (dispatch) => {
    const response = await axios.put(
      `/api/experiences/${id}`,
      experienceToUpdate
    );
    const updatedExperience = response.data;
    dispatch(_updateExperience(updatedExperience));
    history.push('/');
  };
};

const initialState = {};

const singleExperienceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_EXPERIENCE:
      return action.experience;
    case UPDATE_EXPERIENCE:
      let newExperiences = [...state];
      newExperiences = newExperiences.map((experience) => {
        if (experience.id === action.updatedExperience.id) {
          return action.updatedExperience;
        }
        return experience;
      });
      return { ...state, newExperiences };
    default:
      return state;
  }
};

export default singleExperienceReducer;
