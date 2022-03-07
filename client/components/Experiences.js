import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchExperiences, deleteExperience } from '../store/experiences';

export class Experiences extends React.Component {
  componentDidMount() {
    this.props.loadExperiences();
  }
  render() {
    const experiences = this.props.experiences;
    const user = this.props.user;

    return (
      <>
       <div className='all_experiences_container'></div>
        {user.type === 'employee' ? (
          <Link to={'/experiences/add'}>
            <div className='button_container'>
              <button type='button' className='add_experience_btn'>
                Add An Experience
              </button>
            </div>
          </Link>
        ) : (
          ''
        )}

        <div className='experiences'>
            {experiences.map((experience) => (
              <div className='experience' key={experience.id}>
                <Link to={`/experiences/${experience.id}`}>
                  <h2 className='name'>{experience.name}</h2>
                </Link>
                <img className='exp_img'src={experience.imageUrl} />
                <h3 className='description'>
                  Description: {experience.description}
                </h3>
                {user.type === 'employee' ? (
                  <form>
                    <button
                      type='submit'
                      className='experience_delete_btn'
                      value={experience.id}
                      onClick={(event) =>
                        this.props.deleteExperience(event.target.value)
                      }
                    >
                      Remove Experience
                    </button>
                  </form>
                ) : (
                  ''
                )}
              </div>
            ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  experiences: state.experiencesReducer,
  user: state.auth,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  loadExperiences: () => dispatch(fetchExperiences()),
  deleteExperience: (id) => dispatch(deleteExperience(id, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Experiences);
