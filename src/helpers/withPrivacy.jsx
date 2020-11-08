import React from 'react'
import { AuthContext } from "helpers/AuthProvider"
import LoginDanger from "../components/LoginDanger/LoginDanger"

const withPrivacy = WrappedComponent => {
    class WithPrivacy extends React.Component {
        static contextType = AuthContext;
        render() {
            const { isSignedIn } = this.context;
            return (
                isSignedIn ? <WrappedComponent {...this.props} /> : <LoginDanger />
            )
        }
    }
    return WithPrivacy
}
export default withPrivacy
