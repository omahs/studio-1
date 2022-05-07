import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMoralis } from 'react-moralis';

// project imports
import useAuth from 'hooks/useAuth';
import { useContext, useEffect } from 'react';
import { DappifyContext } from 'react-dappify';


// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
    const { isAuthenticated } = useContext(DappifyContext);
    const appState = useSelector((state) => state.app);
    // const { user, isAuthenticated } = useMoralis();
    // const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!appState.appId) {
            navigate('/projects', { replace: true });
        }
        console.log(appState);
        // console.log(user);
    }, [isAuthenticated, navigate]);

    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};

export default AuthGuard;
