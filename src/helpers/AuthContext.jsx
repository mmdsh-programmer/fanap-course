import React from 'react'

export const AuthContext = React.createContext();

export default function AuthContextProvider(props) {

    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        
    }, []);

    return (
        <AuthContext.Provider value={{ user: user, setUser: setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}