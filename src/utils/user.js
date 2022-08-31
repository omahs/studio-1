import debounce from "lodash/debounce";

export const saveUser = debounce(async (user, setterFn) => {
	try {
		await user.save();
	} catch (e) {
		// console.log(e.message);
		setterFn(e.message);
	}
}, 300);
