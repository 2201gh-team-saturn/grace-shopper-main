import React from 'react';
import { connect } from 'react-redux';
import { fetchRoom, toggleStatus } from '../store/singleRoom'

//there was a thought that I could use this to practice the useContext react hook,
//and we would pass the context to this like props
//but for now I'm going to build out a standard Component


class Room extends React.Component {
    componentDidMount() {
        this.props.singleRoom(this.props.match.params.id)
    }

    addToCart(){
        //adds something to the cart
    }

    render(){
        const { room } = this.props || [];
        const experiences = room.experiences || [];
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
            <div id="single-room">
                <div id="room-info">
                <img src={room.imageUrl} ALIGN="left"/>
                <h2>{room.name}</h2>
                <p>{room.description}</p>
                <p>Experiences you can only have in this room:
                    <ul>
                         {(experiences.length > 0 && experienceList) || (experiences.length === 0 && <li>Check back soon for new experiences</li>)}
                    </ul>
                </p>
                </div>
                <button type="button" onClick={this.addToCart}>Add to Cart</button>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        room: state.singleRoom
    };
};

const mapDispatch = (dispatch) => {
    return {
        singleRoom: (id) => {
            dispatch(fetchRoom(id))
        }

    };
};

export default connect(mapState, mapDispatch)(Room);
