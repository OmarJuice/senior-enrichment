import React, { Component } from 'react';
import { connect } from 'react-redux'
import CampusCard from './CampusCard';
import { getCampuses } from '../actions';
class Campuses extends Component {
    componentDidMount() {
        this.props.getCampuses()
    }

    render() {
        const { campuses } = this.props
        return (
            <div className="columns is-multiline">
                {campuses.data.map((campus, i) => {
                    return <CampusCard key={campus.id || i + 1} {...campus} />
                })}
                {campuses.offset ?
                    <div className="column is-one-third-desktop is-half-tablet fetch-more">
                        <button onClick={() => this.props.getCampuses(campuses.offset)} className="button is-primary">
                            See More
                        </button>
                    </div>
                    : ''}
                <style jsx>{`
                    .fetch-more{
                        display: flex;
                        height: 70vh;
                        justify-content: center;
                        align-items: center
                    }
                    `}</style>
            </div>
        );
    }
}
const mapStateToProps = ({ campuses }) => ({ campuses })
export default connect(mapStateToProps, { getCampuses })(Campuses);
