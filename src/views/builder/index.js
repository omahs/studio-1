import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "dappify-builder/dist";

const EditorView = () => {
	const { projectId } = useParams();
	const navigate = useNavigate();

	const onClickHome = () => {
		navigate("/profile/admin", { replace: true });
	};

	return <Editor projectId={projectId} onClickHome={onClickHome} />;
};

export default EditorView;
