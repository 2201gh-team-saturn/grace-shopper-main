import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addExperience } from '../store/experiences';

class AddExperience extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addExperience({ ...this.state });
    this.props.history.push('/experiences')
   }

  render() {
    const { handleSubmit, handleChange } = this;
    console.log(this.state)
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className='add_room'>
            <h2>Add New Experience Here</h2>
            <label>Name</label>
            <input type='text' name='name' placeholder='Experience Name' onChange={handleChange} value={this.state.name}/>

            <label>Description</label>
            <input name='description' placeholder='Experience description' onChange={handleChange} value={this.state.description} />

            <label>Photo Image </label>
            <input name='imageUrl' placeholder='image url' onChange={handleChange} value={this.state.imageUrl} />
            <button type='submit'>Submit</button>
          </div>


        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addExperience: (experience) => dispatch(addExperience(experience)),
  };
};

export default connect(null, mapDispatch)(AddExperience);
