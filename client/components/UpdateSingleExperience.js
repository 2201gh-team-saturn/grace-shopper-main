import React, { Component } from 'react';
import { updateAnExperience } from '../store/experiences';
import { connect } from 'react-redux';

class UpdateExperience extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			price: 0.00,
            description: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillUnmount() {
		this.props.clearExperience();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.experience.id !== this.props.experience.id) {
			this.setState({
				name: this.props.experience.name || '',
				price: this.props.experience.price || 0.00,
                description: this.props.experience.description || ''
			});
		}
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}

	handleSubmit(evt) {
		evt.preventDefault();
		this.props.updateExperience({ ...this.props.experience, ...this.state });
	}

	render() {
		const { price, name } = this.state;
		const { handleSubmit, handleChange } = this;
		console.log(this.state)
		return (
			<div>
				<form id="experience-form" onSubmit={handleSubmit}>
					<label htmlFor="name">Experience Name:</label>
					<input name="name" value={name}  onChange={handleChange}/>

					<label htmlFor="price">Price:</label>
					<input name='price' onChange={handleChange} value={price} />

					<label htmlFor="description">Description:</label>
					<input name='description' onChange={handleChange} value={description}/>

					{/* <select name="fuelType" onChange={handleChange} value={fuelType}>
						<option>electric</option>
						<option>gas</option>
						<option>diesel</option>
					</select> */}

					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = ({ experience }) => ({
	experience,
});

const mapDispatchToProps = (dispatch, { history }) => ({
	updateExperience: (experience) => dispatch(updateAnExperience(experience, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateExperience);
