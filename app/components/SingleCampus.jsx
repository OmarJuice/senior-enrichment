import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleCampus } from '../actions/index';
import StudentCard from './StudentCard';
import EditCampus from './EditCampus';

class SingleCampus extends Component {
    componentDidMount() {
        this.props.getSingleCampus(this.props.match.params.id)
    }
    render() {
        const { selectedCampus: { id, name, address, description, imageUrl, students }, loading } = this.props
        if (!id) {
            return null
        }
        return <div className="columns is-multiline is-mobile is-centered">
            <div className="column is-5-desktop is-8-tablet is-11-mobile has-text-centered">
                {loading ? <i className="fas fa-circle-notch fa-spin fa-5x"></i> :
                    <div className="card has-background-white-bis">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src={imageUrl} alt="Placeholder image" />
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="media">

                                <div className="media-content">
                                    <p className="title is-4">{name}</p>
                                    <p className="subtitle is-6">{address}</p>
                                </div>
                            </div>

                            <div className="content">
                                {description}
                            </div>
                        </div>
                    </div>
                }
            </div>
            <EditCampus id={id} initialValues={{ name, address, description, imageUrl }} />
            <div className="column is-full has-text-centered">{students ? <h1 className="title is-4">Students</h1> : null}</div>
            {
                students && students.length ? students.map(student => {
                    return <StudentCard disableDelete={true} key={student.id} {...student} />
                }) : <div className="column has-text-centered">This campus has no students yet.</div>
            }
        </div>

    }
}
const mapStateToProps = ({ campuses: { selectedCampus }, loading }) => ({ selectedCampus, loading })
export default connect(mapStateToProps, { getSingleCampus })(SingleCampus);
