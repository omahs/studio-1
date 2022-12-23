import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "editor";
// import { Container } from "@mui/material";
import TemplateModal from "views/templates";

const EditorView = () => {
	const { projectId } = useParams();
	const navigate = useNavigate();
	// const [modalOpen, setModalOpen] = useState(false);
	const [editor, setEditor] = useState();

	const onClickHome = () => {
		navigate("/profile/projects", { replace: true });
	};

	useEffect(() => {
		document.addEventListener('toggleTemplates', (event) => {
			// console.log(editor);
			// toggleModal(editor);
			setEditor(event.detail);
		  });
		  return () => {
			document.removeEventListener('toggleTemplates', () => {
			  console.log("Removing listener");
			});
		  }
	},[]);

	const handleClose = () => {
		// setModalOpen(!modalOpen);
		setEditor();
	};

	return (
		<>
			<Editor projectId={projectId} onClickHome={onClickHome} />
			<TemplateModal open={!!editor} handleClose={handleClose} editor={editor} />
		</>
	);
};

export default EditorView;
