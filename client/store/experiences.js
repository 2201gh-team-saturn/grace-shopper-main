import axios from 'axios';

const SET_EXPERIENCES = 'SET_EXPERIENCES';

export const setExperiences = (experiences) => {
  return {
    type: SET_EXPERIENCES,
    experiences,
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

const initialState = [];

export default function experienceReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EXPERIENCES:
      return action.experiences;
    default:
      return state;
  }
}
