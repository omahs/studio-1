// import { useContext } from 'react';
import { useParams } from "react-router-dom";
import { Editor } from "dappify-builder/dist";
// import { useEffect } from "react";
// import { DappifyContext } from 'react-dappify';

const EditorView = () => {
	const { projectId } = useParams();
	// const { Provider } = useContext(DappifyContext);

	// const verifyProject = () => {

	// };

	// useEffect(() => verifyProject(), []);

	return <Editor projectId={projectId} />;
};

export default EditorView;
