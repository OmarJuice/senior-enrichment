import React, { Component } from 'react';
import CampusForm from './CampusForm';
import { connect } from 'react-redux';
import { addCampus } from '../actions/index';

class AddCampus extends Component {
    onSubmit(formValues) {
        this.props.addCampus(formValues, function (path) {
            this.props.history.push(path)
        }.bind(this))
    }
    render() {
        return (
            <div className="columns is-centered is-mobile">
                <div className="column is-two-fifths-desktop is-two-thirds-tablet is-11-mobile">
                    <CampusForm onSubmit={this.onSubmit.bind(this)} />
                </div>
            </div>
        );
    }
}

export default connect(null, { addCampus })(AddCampus);
