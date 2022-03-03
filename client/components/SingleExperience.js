import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleExperience } from '../store/SingleExperience';
import { Link } from 'react-router-dom';
import { fetchRooms } from '../store/rooms'

class SingleExperience extends Component {
	componentDidMount() {
		try {
			this.props.loadRooms()
			this.props.loadSingleExperience(this.props.match.params.id);
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		const experience = this.props.experience;
		const room = this.props.experience.room;
		return (
			<div id="single-experience" className="column">
				<div id="single-experience-detail" className="row">
					<h1>Experience Name: {experience.name}</h1>
					<img src={experience.imageUrl}/>
					<p>Price:  {experience.price} </p>
					<p>Description:  {experience.description}</p>
					<div>
						<h3></h3>
						{ room ? 
									(
									<div>
										<Link className="single" to={`/rooms/${room.id}`}>
											{room.name}
										</Link>
									</div>
								)
							 : ''
						} 
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		experience: state.singleExperienceReducer,
		rooms: state.singleRoomReducer,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadRooms: () => dispatch(fetchRooms()),
		loadSingleExperience: (id) => dispatch(fetchSingleExperience(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleExperience);