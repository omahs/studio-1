import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// project imports
import { useEffect } from "react";
import { useMoralis } from "react-moralis";

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const ProfileGuard = ({ children }) => {
	const { isAuthenticated } = useMoralis();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/", { replace: true });
		}
	}, [isAuthenticated, navigate]);

	return children;
};

ProfileGuard.propTypes = {
	children: PropTypes.node
};

export default ProfileGuard;
