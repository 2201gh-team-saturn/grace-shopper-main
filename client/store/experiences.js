import axios from 'axios';

const SET_EXPERIENCES = 'SET_EXPERIENCES';
//const BOOK_EXPERIENCE = 'BOOK_EXPERIENCE';


export const setExperiences = (experiences) => {
  return {
    type: SET_EXPERIENCES,
    experiences,
  };
};

// const _bookExperience = (experience) => {
//   return {
//     type: BOOK_EXPERIENCE,
//     experience,
//   };
// };

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

//come back here!! Not sure how this will integrate with cart yet
// export const bookExperience = (experience) => {
//   return async (dispatch) => {
//     const { data: created } = await axios.post(
//       '/api/EXPERIENCES',
//     );
//     dispatch(bookExperience(created));
//     history.push('/experiences');
//   };
// };

const initialState = [];

// add to the Redux store with combineReducers
export default function EperiencesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EXPERIENCES:
      return action.experiences;
    // case BOOK_EXPERIENCE:
    //   return [...state, action.expeerience];
    default:
      return state;
  }
}
