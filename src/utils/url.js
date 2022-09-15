import constants from "constant";
const { EDITOR } = constants;

export const getUrl = (subdomain, templateId) => {
	const environmentPrefix =
		process.env.REACT_APP_HOST_ENV === "production"
			? ""
			: `${process.env.REACT_APP_HOST_ENV}.`;
	const subdomainPrefix = subdomain ? `${subdomain}.` : "";
	const templatePrefix = templateId ? `/${templateId}` : "";
	return `https://${subdomainPrefix}${environmentPrefix}dappify.com${templatePrefix}`;
};

export const getEditorUrl = (appState) => {
	// Studio or builder?
	let url = "/studio/templates";
	try {
		// Has templates
		const templates = Object.keys(appState.template);
		if (
			templates.length > 0 &&
			appState.template[templates[0]].editor === EDITOR.BUILDER
		)
			url = `/builder/${appState?.appId}`;
	} catch (e) {
		console.log("Cant resolve editor, defaulting to studio");
	}
	return url;
};
