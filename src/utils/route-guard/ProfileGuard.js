import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// project imports
import { useContext, useEffect } from "react";
import { DappifyContext } from "react-dappify";

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const ProfileGuard = ({ children }) => {
	const { isAuthenticated } = useContext(DappifyContext);
	const appState = useSelector((state) => state.app);
	// const { user, isAuthenticated } = useMoralis();
	// const { isLoggedIn } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/signin", { replace: true });
		}
	}, [isAuthenticated, navigate]);

	return children;
};

ProfileGuard.propTypes = {
	children: PropTypes.node
};

export default ProfileGuard;
