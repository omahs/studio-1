import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// project imports
import { useContext, useEffect } from "react";
import { useMoralis } from "react-moralis";

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
	const { isAuthenticated } = useMoralis();
	const appState = useSelector((state) => state.app);
	// const { user, isAuthenticated } = useMoralis();
	// const { isLoggedIn } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!appState.appId) {
			navigate("/profile", { replace: true });
		}
	}, [isAuthenticated, navigate]);

	return children;
};

AuthGuard.propTypes = {
	children: PropTypes.node
};

export default AuthGuard;
