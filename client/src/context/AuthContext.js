import React from 'react';
import useAuth from '../hooks/useAuth';
import { getStoredUserAuth } from '../helpers';

export const authContext = React.createContext({ 
    auth: {
        id: '',
        email: ''
    }, 
    setAuthStatus: () => { }, 
    setUnauthStatus: () => { },
});

const { Provider } = authContext;

const AuthProvider = ({ children }) => {
    const { auth, setAuthStatus, setUnauthStatus } = useAuth(getStoredUserAuth());

    return (
        <Provider value={{ auth, setAuthStatus, setUnauthStatus }}>
            {children}
        </Provider>
    );
};

export default AuthProvider;