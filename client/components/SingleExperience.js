import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleExperience } from '../redux/fetchSingleExperience';
import { Link } from 'react-router-dom';

class SingleExperience extends Component {
	componentDidMount() {
		try {
			this.props.loadSingleExperience(this.props.match.params.experienceId);
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		const experience = this.props.experience;
		const roomsAssignedToExperiences = this.props.experience.rooms;
		return (
			<div id="single-experience" className="column">
				<div id="single-experience-detail" className="row">
					<h1>Experience Name: {experience.name}</h1>
					<p>{experience.imageUrl}</p>
					<p>Price:  {experience.price} </p>
					<p>Description:  {experience.description}</p>
					<div>
						<h3>Project Assignments</h3>
						{
							roomsAssignedToExperience.map((room) => {
								return (
									<div key={room.id}>
										<Link className="single" to={`/rooms/${rooms.id}`}>
											{room.name}
										</Link>
									</div>
								);
							})
						}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		project: state.experience,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadSingleExperience: (id) => dispatch(fetchSingleExperience(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleExperience);