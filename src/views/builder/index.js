import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "editor";

const EditorView = () => {
	const { projectId } = useParams();
	const navigate = useNavigate();

	const onClickHome = () => {
		navigate("/profile/projects", { replace: true });
	};

	return <Editor projectId={projectId} onClickHome={onClickHome} />;
};

export default EditorView;
