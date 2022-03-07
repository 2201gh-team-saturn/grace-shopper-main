import axios from 'axios';

const TOKEN = 'token';

const GET_SINGLE_EXPERIENCE = 'GET_SINGLE_EXPERIENCE';

const getSingleExperience = (experience) => {
  return {
    type: GET_SINGLE_EXPERIENCE,
    experience,
  };
};

export const fetchSingleExperience = (experienceId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.get(`/api/experiences/${experienceId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(getSingleExperience(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const singleExperienceReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_EXPERIENCE:
      return action.experience;
    default:
      return state;
  }
};

export default singleExperienceReducer;
