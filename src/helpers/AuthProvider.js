import React from 'react'
import { auth } from "services";

export const AuthContext = React.createContext();

export default function AuthContextProvider(props) {

    const [user, setUser] = React.useState(auth.currentUser);

    React.useEffect(() => {
        auth.onAuthStateChanged(u => {
            if (!!u) {
                setUser(u);
            } else {
                setUser();
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={{ user: user, setUser: setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

