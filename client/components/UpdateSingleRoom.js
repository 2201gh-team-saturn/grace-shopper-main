import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRoom, updateRoomThunk } from '../store/singleRoom';;


class UpdateSingleRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
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

            {/* <label htmlFor='fuelType'>
              <strong>Fuel Type:</strong>
            </label>
            <select
              id='fuelType'
              name='fuelType'
              onChange={handleChange}
              value={this.state.fuelType}
            >
              <option>Electric</option>
              <option>Diesel</option>
              <option>Gas</option>
            </select>

            <label htmlFor='fuelLevel'>
              <strong>Fuel Level:</strong>
            </label>
            <input
              name='fuelLevel'
              onChange={handleChange}
              value={this.state.fuelLevel}
            />
            <br /> */}
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
