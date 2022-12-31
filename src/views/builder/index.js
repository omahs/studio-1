import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "editor";
import TemplateModal from "views/templates";
import { Magic } from 'magic-sdk';
const m = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

const EditorView = () => {
	const { projectId } = useParams();
	const navigate = useNavigate();
	const [editor, setEditor] = useState();
	const [principal, setPrincipal] = useState();

	const addEditorListeners = () => {
		document.addEventListener('toggleTemplates', (event) => {
			setEditor(event.detail);
		});
	};

	const loadPrincipal = async () => {
		const idToken = await m.user.getIdToken();
		setPrincipal(idToken);
	};
	const onClickHome = () => {
		navigate("/profile/projects", { replace: true });
	};

	useEffect(() => {
		addEditorListeners();
		loadPrincipal();
		return () => document.removeEventListener('toggleTemplates', () => {});
	},[]);

	const handleClose = () => {
		setEditor();
	};

	return (
		<>
			{principal && (<Editor projectId={projectId} onClickHome={onClickHome} principal={principal} />)}
			<TemplateModal open={!!editor} handleClose={handleClose} editor={editor} />
		</>
	);
};

export default EditorView;
