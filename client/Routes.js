import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Account from './components/Account';
import {me} from './store'
import AllRooms from './components/AllRooms';
import HomePage from './components/HomePage';
import SingleRoom from './components/SingleRoom';
import Experiences from './components/Experiences';
import SingleExperience from './components/SingleExperience';
import AddRoom from './components/AddRoom';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/account" component={Account} />
            {/* <Redirect to="/home" /> */}
            <Route exact path="/" component={HomePage} />
            <Route exact path="/rooms" component={AllRooms} />
            <Route exact path="/experiences" component={Experiences} />
            <Route exact path="/experiences/:id" component={SingleExperience} />
            <Route exact path="/room/add" component={AddRoom} />
            <Route exact path="/rooms/:id" component={SingleRoom}/>
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/account" component={Account} />
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/rooms" component={AllRooms} />
            <Route exact path="/rooms/:id" component={SingleRoom}/>
            <Route exact path="/experiences" component={Experiences} />
            <Route exact path="/experiences/:id" component={SingleExperience} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
