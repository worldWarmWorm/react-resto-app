import React from 'react';
import RestoServiceContext from '../resto-service-context';

const WithRestoService = () => (Wrapped) => {
    return (props) => {
        return (
            <RestoServiceContext.Consumer>
                {(RestoService) => (<Wrapped {...props} RestoService={RestoService} />)}
            </RestoServiceContext.Consumer>
        );
    };
};

export default WithRestoService;