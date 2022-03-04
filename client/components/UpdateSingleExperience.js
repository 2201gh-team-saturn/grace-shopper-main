import React, { Component } from 'react';
import { updateAnExperience } from '../store/experiences';
import { connect } from 'react-redux';

class UpdateExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
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
        description: this.props.experience.description || '',
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
    const { name, description } = this.state;
    const { handleSubmit, handleChange } = this;
    console.log(this.state);
    return (
      <div>
        <form id='experience-form' onSubmit={handleSubmit}>
          <label htmlFor='name'>Experience Name:</label>
          <input name='name' value={name} onChange={handleChange} />

          <label htmlFor='description'>Description:</label>
          <input
            name='description'
            onChange={handleChange}
            value={description}
          />

          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ experience }) => ({
  experience,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  updateExperience: (experience) =>
    dispatch(updateAnExperience(experience, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateExperience);
