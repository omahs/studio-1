/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "editor";
import Modal from "views/modal";
import { Magic } from 'magic-sdk';
const m = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

const EditorView = () => {
	const { projectId } = useParams();
	const navigate = useNavigate();
	const [editor, setEditor] = useState();
	const [principal, setPrincipal] = useState();
	const [eventName, setEventName] = useState();

	const handleEvent =  (event) =>  {
		setEventName(event.type);
		setEditor(event.detail)
	}

	const addEditorListeners = () => {
		document.addEventListener('toggleTemplates', handleEvent);
		document.addEventListener('toggleLaunch', handleEvent);
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
		return () => {
			document.removeEventListener('toggleTemplates', () => {});
			document.removeEventListener('toggleLaunch', () => {});
		}
	},[]);

	const handleClose = () => {
		setEditor();
		setEventName();
	};

	return (
		<>
			{principal && (<Editor projectId={projectId} onClickHome={onClickHome} principal={principal} />)}
			<Modal  open={!!editor} 
					handleClose={handleClose} 
					editor={editor} 
					event={eventName} 
					principal={principal}
					projectId={projectId}
			/>
		</>
	);
};

export default EditorView;
