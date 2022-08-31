import { useEffect, useState, useContext } from "react";
import { DappifyContext } from "react-dappify";

// assets
import Identicon from "react-identicons";
import isEmpty from "lodash/isEmpty";

const Image = ({ width = 100 }) => {
	const { user } = useContext(DappifyContext);
	const [profile, setProfile] = useState({});

	useEffect(() => {
		const existingProfile = user?.get("profile");
		const initProfile = !isEmpty(existingProfile) ? existingProfile : {};
		setProfile(initProfile);
	}, [user]);

	return profile?.image ? (
		<img src={profile?.image} alt="" width={width} height="auto" />
	) : (
		<Identicon string={user.get("username")} size={width} />
	);
};

export default Image;
