import React from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import { fetchExperiences } from '../store/experiences';

export class Experiences extends React.Component {
  componentDidMount() {
    this.props.loadExperiences();
  }
  render() {
    const experiences = this.props.experiences;
    return (
      <div id='all-experiences-container'>
        <h1 className='experiences'>Experience Your Reverie</h1>
        <ul className='container'>
          {experiences.map((experience) => (
            <div className='experience' key={experience.id}>
              {/* <Link to={`/experiences/${experience.id}`}>
                <h2 className='name'>{experience.name}</h2>
              </Link> */}
               <h2 className='name'>{experience.name}</h2>
              <img src={experience.imageUrl} />
               <h3 className='price'>Price: {experience.price}</h3>
               <h3 className='description'>Description: {experience.description}</h3>
              {/* <button
                type='button'
                className='book'
                onClick={() => this.props.bookExperience(experience.id)}
              >
                Book Now!
              </button>*/}
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  experiences: state.experiences,
});

const mapDispatchToProps = (dispatch) => ({
  loadExperiences: () => dispatch(fetchExperiences()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Experiences);
