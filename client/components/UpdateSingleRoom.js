import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRoom, updateRoomThunk } from '../store/singleRoom';;

// JOE CR: It seems to me that this component should only show for admins,
// but it showed for cody locally who is not an admin. Let's discuss front-end permission gating.
class UpdateSingleRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.room.name,
      description: this.props.room.description,
      price: this.props.room.price,
      theme: this.props.room.theme
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.loadRoom(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.room.id !== this.props.room.id) {
      this.setState({
        name: this.props.room.name || '',
        description: this.props.room.description || '',
        price: this.props.room.price || '',
        theme: this.props.room.theme || '',

      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateRoom({ ...this.props.room, ...this.state });
  }

  render() {
    const { handleSubmit, handleChange } = this;
    const room = this.props.room;

    const roomEditForm = () => {
      return (
        <div >
          <span>EDIT ROOM</span>
          <br />
          <form onSubmit={handleSubmit}>
            <label>
              <strong>Room Name:</strong>
            </label>
            <input
              name='name'
              onChange={handleChange}
              value={this.state.name}
            />

            <label >
              <strong>Theme:</strong>
            </label>
            <select
              id='theme'
              name='theme'
              onChange={handleChange}
              value={this.state.theme}
            >
              <option>Nature</option>
              <option>Art</option>
              <option>Space</option>
              <option>Rustic</option>
              <option>Water</option>
              <option>Haunted</option>
              <option>Fantasy</option>
            </select>

            <label>
              <strong>Description:</strong>
            </label>
            <input
              name='description'
              onChange={handleChange}
              value={this.state.description}
            />
            <br /> 
            <label>
              <strong>Price:</strong>
            </label>
            <input
              name='price'
              onChange={handleChange}
              value={this.state.price}
            />
            {/* <input id="the-file-input" type="file" /> */}
            <button type='submit'>Save Changes</button>
          </form>
        </div>
      );
    };

    // if (projects === undefined || projects.length <= 0) {
    //   return robotEditForm();
    // }

    return (
      <div>
        {roomEditForm()}

      </div>
    );
  }
}

const mapState = (state) => {
  return {
    room: state.singleRoomReducer,
    // robotAndProject: state.robotAndProject,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    loadRoom: (id) => dispatch(fetchRoom(id)),
    updateRoom: (id) => dispatch(updateRoomThunk(id, history)),
    // unassignProject: (robotId, projectId) => dispatch(unassignProjectRobotThunk(robotId, projectId)),
    // fetchProjectRobot: (robotId, projectId) => dispatch(fetchProjectRobotThunk(robotId, projectId)),
  };
};

export default connect(mapState, mapDispatch)(UpdateSingleRoom);
