import React from 'react';
import { connect } from 'react-redux';
import { fetchRoom } from '../store/singleRoom'
import { fetchExperiences } from '../store/experiences'
import { Link } from 'react-router-dom';
import { createCartItem } from '../store/shopping_cart'
import { me } from '../store';



//there was a thought that I could use this to practice the useContext react hook,
//and we would pass the context to this like props
//but for now I'm going to build out a standard Component

//QUESTIONS: If someone is logged in this class does not render. why?


class SingleRoom extends React.Component {

    componentDidMount() {
        this.props.loadRoom(this.props.match.params.id)
        this.props.loadExperiences();
        // this.props.isLoggedIn();
    }

    // addToCart(roomId) {
    //     //adds something to the cart
    //     if (this.props.isLoggedIn) {
    //         this.props.addToCart(roomId)
    //     } 
    //     /*
    //     if (localStorage.cart()){
    //         parse as an array
    //         push the new thing into that array
    //         stringify again and send it back to storage
    //     } else if (nothing in local storage){
    //         create a new cart with this room info.
    //     }

    //     context should update everytime i change the state, because i'm 
    //     forcing a rerender.


    //     */
    // }

    render() {
        const room = this.props.room;
        console.log("THIS IS THE ID",room.id)
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
                <br/>
                <Link to={`/rooms/${this.props.match.params.id}/edit`}>Update Room</Link>
                <br/>
                <div className="room-info">
                    <div id="single-room-img">
                        <img src={room.imageUrl} />
                    </div>
                    <div id='room_info'>
                        <h1>{room.name}</h1>
                        <p>{room.description}</p>
                        <div className="room-info__checks">
                            <div className="room-info__check">
                                <span className="room-info__check-title">Check in </span>
                                <span className="room-info__check-time">3 - 5 PM</span>
                            </div>

                            <div className="room-info__check">
                                <span className="room-info__check-title">Check out </span>
                                <span className="room-info__check-time">12 - 2 PM</span>
                            </div>
                        </div>
                        <div>
                            <p>Experiences you can only have in this room:</p>
                            <ul>
                                {(experiences.length > 0 && experienceList) || (experiences.length === 0 && <li>Check back soon for new experiences</li>)}
                            </ul>
                            <button type="button" id='add_to_cart_btn' className='button' onClick={() => {this.props.addToCart(room.id)}}>Add to Cart</button>
                        </div>
                    </div>
                </div>

                <div>
                </div>
            </div >

        )
    }
}

//if your process i normally just add room to cart, then you can do the same thing
//but with local storage.

const mapState = (state) => {
    return {
        room: state.singleRoomReducer,
        user: state.auth,
        experiences: state.experiencesReducer,
        isLoggedIn: !!state.auth.id
    };
};

const mapDispatch = (dispatch) => {
    return {
        loadRoom: (id) => dispatch(fetchRoom(id)),
        loadExperiences: () => dispatch(fetchExperiences()),
        addToCart: (id) => dispatch(createCartItem(id))
        //potentially add a loadExperiences function taht will return experiences based on the id?
    };
};

export default connect(mapState, mapDispatch)(SingleRoom);
