import React from 'react';
import {NavLink} from 'react-router-dom';

import Aux from "../../hoc/_Aux";
import '../../assets/scss/style.scss';
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";

class OfflineUI extends React.Component {
    render() {
        return (
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper offline">
                    <div className="text-center">
                        <h1 className="mb-4">OFFLINE</h1>
                        <h5 className="text-muted mb-4">Oops! Website Is Temporarily Offline</h5>
                        <NavLink to="/" className="btn btn-primary mb-4"><i className="feather icon-home"/>Back to Home</NavLink>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default OfflineUI;