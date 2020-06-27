import React, { Component } from 'react';
import { ModalComponent } from '../../components/components';
import ChildrenContainer from '../';

/**
 * Error handler component
 * 
 * @param {*} WrappedComponent 
 * @param {*} axios 
 */
const ErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {
        state = {
            error: null
        }

        componentWillMount = () => {
            this.reqInterceptor = axios.interceptors.request.use((request) => {
                this.setState({error: null});
                return request;
            });

            this.resInterceptor = axios.interceptors.response.use((response) => response, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount = () => {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render = () => (
            <ChildrenContainer>
                <ModalComponent
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                </ModalComponent>
                <WrappedComponent {...this.props} />
            </ChildrenContainer>
        )
    }
};

export default ErrorHandler;