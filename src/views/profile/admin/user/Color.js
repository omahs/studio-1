import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

const Color = ({
	profile = {},
	defaultColor,
	user = {},
	saveUser = () => {}
}) => {
	const [displayColorPicker, setDisplayColorPicker] = useState(false);
	const [color, setColor] = useState();

	useEffect(() => {
		setColor(profile[defaultColor]);
	}, [profile, user, defaultColor]);

	const handleClick = () => {
		setDisplayColorPicker(!displayColorPicker);
	};

	const handleClose = () => {
		setDisplayColorPicker(false);
	};

	const handleChange = async (color) => {
		profile[defaultColor] = color.hex;
		const newProfile = {
			...profile
		};
		user.set("profile", newProfile);
		await saveUser(user);
		setColor(profile[defaultColor]);
	};

	return (
		<div>
			<div
				onClick={handleClick}
				style={{
					padding: "5px",
					background: "#fff",
					borderRadius: "1px",
					boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
					display: "inline-block",
					cursor: "pointer"
				}}
			>
				<div
					style={{
						width: "36px",
						height: "14px",
						borderRadius: "2px",
						background: color
					}}
				/>
			</div>
			{displayColorPicker ? (
				<div
					style={{
						position: "absolute",
						zIndex: "2"
					}}
				>
					<div
						onClick={handleClose}
						style={{
							position: "fixed",
							top: "0px",
							right: "0px",
							bottom: "0px",
							left: "0px"
						}}
					/>
					<SketchPicker color={color} onChange={handleChange} />
				</div>
			) : null}
		</div>
	);
};

export default Color;
