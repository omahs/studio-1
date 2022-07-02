import { shallow } from "enzyme";
import ProfileDialog from "common/ProfileDialog";
import { TextField, Button, Dialog } from "@mui/material";

let context;

beforeEach(() => {
	context = {
		isAuthenticated: true,
		user: new Map(),
	};
});

describe("<ProfileDialog />", () => {
	it("Should be created", () => {
		const wrapper = shallow(<ProfileDialog context={context} />);
		expect(wrapper.exists()).toBe(true);
	});

	it("Should display dialog if not authenticated", () => {
		context = {
			isAuthenticated: false,
		};
		const wrapper = shallow(<ProfileDialog context={context} />);
		expect(wrapper.find(Dialog).prop("open")).toEqual(false);
	});

	it("Should display dialog if authenticated and user has no data", () => {
		const user = new Map();
		context = {
			isAuthenticated: true,
			user: user,
		};
		const wrapper = shallow(<ProfileDialog context={context} />);
		expect(wrapper.find(Dialog).prop("open")).toEqual(true);
	});

	it("Should display dialog if authenticated and user is missing contact", () => {
		const user = new Map();
		user.set("nickname", "test");
		context = {
			isAuthenticated: true,
			user: user,
		};
		const wrapper = shallow(<ProfileDialog context={context} />);
		expect(wrapper.find(Dialog).prop("open")).toEqual(true);
	});

	it("Should disable confirm button until both fields have been set", () => {
		const user = new Map();
		context = {
			isAuthenticated: true,
			user: user,
		};
		const wrapper = shallow(<ProfileDialog context={context} />);
		expect(wrapper.find(Dialog).prop("open")).toEqual(true);
		expect(wrapper.find(Button).prop("disabled")).toEqual(true);
		expect(wrapper.find(TextField).length).toEqual(2);

		// Adding data to name
		wrapper
			.find(TextField)
			.at(0)
			.simulate("change", { target: { value: "My Nickname" } });
		expect(wrapper.find(Button).prop("disabled")).toEqual(true);

		// Adding data to social
		wrapper
			.find(TextField)
			.at(1)
			.simulate("change", { target: { value: "My social handler" } });
		expect(wrapper.find(Button).prop("disabled")).toEqual(false);
	});

	it("Should update user and close modal when clicking submit", () => {
		const user = new Map();
		user.save = jest.fn();
		context = {
			isAuthenticated: true,
			user: user,
		};
		const wrapper = shallow(<ProfileDialog context={context} />);
		expect(wrapper.find(Dialog).prop("open")).toEqual(true);
		wrapper
			.find(TextField)
			.at(0)
			.simulate("change", { target: { value: "My Nickname" } });
		wrapper
			.find(TextField)
			.at(1)
			.simulate("change", { target: { value: "My social handler" } });
		wrapper.find(Button).at(0).prop("onClick")();
		expect(user.get("nickname")).toEqual("My Nickname");
		expect(user.get("contact")).toEqual("My social handler");
		expect(user.save).toHaveBeenCalled();
	});
});
