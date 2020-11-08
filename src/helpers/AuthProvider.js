import React, { createContext } from 'react'

export const AuthContext = React.createContext();

class AuthContextProvider extends React.Component {
    state = {
        user: undefined,
        isSignedIn: false
    }
    changeStatus = (boolean , userData) => {
        this.setState({isSignedIn : boolean , user : userData})
    }
    render() {
        return (
            <AuthContext.Provider value={{ ...this.state , changeStatus:this.changeStatus }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default AuthContextProvider

