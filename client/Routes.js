import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Account from './components/Account';
import { me } from './store'
import AllRooms from './components/AllRooms';
import HomePage from './components/HomePage';
import SingleRoom from './components/SingleRoom';
import UpdateSingleRoom from './components/UpdateSingleRoom';
import Experiences from './components/Experiences';
import SingleExperience from './components/SingleExperience';
import AddRoom from './components/AddRoom';
import EmployeeDashboard from './components/EmployeeDashboard';
import Cart from './components/Cart'
import BookingConfirmation from './components/BookingConfirmation';
import AddExperience from './components/AddExperience';
import GuestCart from './components/GuestCart';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props;
    const {isAdmin} = this.props;

    return (
      <div>
          <Switch>
            {isLoggedIn && <Route exact path="/account" component={Account} />}
            <Route exact path="/booking-confirmation" component={BookingConfirmation} />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/rooms" component={AllRooms} />
            <Route exact path="/experiences" component={Experiences} />
           {isAdmin && <Route exact path="/experiences/add" component={AddExperience} />}
            <Route exact path="/experiences/:id" component={SingleExperience} />
            {isAdmin && <Route exact path="/room/add" component={AddRoom} />}
            {isAdmin && <Route exact path="/experience/add" component={AddExperience} />}
            <Route exact path="/rooms/:id" component={SingleRoom} />
            {isAdmin && <Route exact path="/rooms/:id/edit" component={UpdateSingleRoom} />}
            {isAdmin && <Route exact path="/employee-dashboard" component={EmployeeDashboard} />}
            { isLoggedIn && <Route exact path="/cart" component={Cart} />}
            {!isLoggedIn && <Route exact path="/cart" component={GuestCart} />}
            {!isLoggedIn && <Route path="/login" component={Login} />}
            {!isLoggedIn && <Route path="/signup" component={Signup} />}
            <Redirect to="/" />
          {/* </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/account" component={Account} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/rooms" component={AllRooms} />
            <Route exact path="/rooms/:id" component={SingleRoom} />
            <Route exact path="/experiences" component={Experiences} />
            <Route exact path="/experiences/:id" component={SingleExperience} />
            <Route exact path="/booking-confirmation" component={BookingConfirmation} />
           */}
           </Switch>
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
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.type === 'employee'
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
