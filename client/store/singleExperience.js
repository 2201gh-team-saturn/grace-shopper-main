import axios from 'axios';

const GET_SINGLE_EXPERIENCE = 'GET_SINGLE_EXPERIENCE';

const getSinglePExperience = (experience) => {
	return {
		type: GET_SINGLE_EXPERIENCE,
		experience,
	};
};

export const fetchSingleExperience = (experienceId) => {
	return async (dispatch) => {
		const { data } = await axios.get(`/api/experiences/${experienceId}`);
		dispatch(getSingleExperience(data));
	};
};

const experienceReducer = (state = { robots: [] }, action) => {
	switch (action.type) {
		case GET_SINGLE_EXPERIENCE:
			return action.experience;
		default:
			return state;
	}
};

export default experienceReducer;