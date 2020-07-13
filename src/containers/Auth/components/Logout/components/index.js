import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../../../actions';
import { BURGER_BUILDER_ROUTE } from '../../../../routes';

/**
 * Logout component
 */
class Logout extends Component {

    /**
     * @inheritdoc
     */
    componentDidMount = () => this.props.onLogout();

    /**
     * @inheritdoc
     */
    render = () => (
        <Redirect to={BURGER_BUILDER_ROUTE} />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);