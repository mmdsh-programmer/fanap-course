import React from 'react'
import { AuthContext } from "helpers/AuthProvider"
import { Redirect } from "react-router-dom";

const withPrivacy = WrappedComponent => {
    function WithPrivacy(props) {

        const { user } = React.useContext(AuthContext);

        return (
            user ? <WrappedComponent {...props} /> : <Redirect to={"/signin"} />
        )
    }
    return WithPrivacy
}
export default withPrivacy
