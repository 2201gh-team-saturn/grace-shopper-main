import React from 'react';
import { connect } from 'react-redux';
import { fetchRoom } from '../store/singleRoom'
import { fetchExperiences } from '../store/experiences'
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";


//there was a thought that I could use this to practice the useContext react hook,
//and we would pass the context to this like props
//but for now I'm going to build out a standard Component

//QUESTIONS: If someone is logged in this class does not render. why?


class SingleRoom extends React.Component {

    componentDidMount() {
        this.props.loadRoom(this.props.match.params.id)
        this.props.loadExperiences();
    }

    // addToCart(){
    //     //adds something to the cart
    // }

    render() {
        const room = this.props.room;
        const experiences = this.props.experiences.filter(experience => experience.roomId === room.id);
        const experienceList = experiences.map((experience) => {
            let id = experience.id;
            return (
                <div key={id}>
                    <Link to={`/experiences/${id}`}>
                        <li>{experience.name}</li>
                    </Link>
                </div>
            )
        })
        return (
            <div className="single-room">
                <Link to='/rooms'>Go Back</Link>
                <div className="room-info">
                    <div id="single-room-img">
                        <img src={room.imageUrl} />
                    </div>
                    <div>
                        <h1>{room.name}</h1>
                        <p>{room.description}</p>
                        <div>
                            <p>Experiences you can only have in this room:</p>
                            <ul>
                                {(experiences.length > 0 && experienceList) || (experiences.length === 0 && <li>Check back soon for new experiences</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <button type="button" onClick={this.addToCart}>Add to Cart</button> */}
                <div>
                </div>
            </div >

        )
    }
}

const mapState = (state) => {
    return {
        room: state.singleRoomReducer,
        user: state.auth,
        experiences: state.experiencesReducer,
    };
};

const mapDispatch = (dispatch) => {
    return {
        loadRoom: (id) => dispatch(fetchRoom(id)),
        loadExperiences: () => dispatch(fetchExperiences()),
        //potentially add a loadExperiences function taht will return experiences based on the id?
    };
};

export default connect(mapState, mapDispatch)(SingleRoom);
