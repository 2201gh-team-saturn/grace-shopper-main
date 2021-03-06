import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addRoomThunk } from '../store/rooms';

class AddRoom extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      price: '',
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
    this.props.addRoom({ ...this.state });
    this.props.history.push('/rooms')
   }

  render() {
    const { handleSubmit, handleChange } = this;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className='add_room'>
            <h2>Add New Room Here</h2>
            <label>Name</label>
            <input type='text' name='name' placeholder='Room Name' onChange={handleChange} value={this.state.name}/>

            <label>Description</label>
            <input name='description' placeholder='Room description' onChange={handleChange} value={this.state.description} />

            <label>Price</label>
            <input name='price' placeholder='Room price' onChange={handleChange} value={this.state.price} />

            <label>Theme</label>
            <select name='category' onChange={handleChange} value={this.state.category}>
              <option>Fantasy</option>
              <option>Haunted</option>
              <option>Nature</option>
              <option>Rustic</option>
              <option>Space</option>
              <option>Water</option>
              <option>Art</option>
            </select>
            <button>+ Theme</button>

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
    addRoom: (room) => dispatch(addRoomThunk(room)),
  };
};

export default connect(null, mapDispatch)(AddRoom);
