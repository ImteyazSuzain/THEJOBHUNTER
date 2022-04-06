import TextField from "@mui/material/TextField";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
const ProjectForm = ({
	name,
	setname,
	description,
	setdescription,
	duration,
	setduration,
	handleSubmit,
	next,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<small>
					<label className="text-muted">Enter Project Name</label>
				</small>
				<input
					value={name}
					onChange={(e) => setname(e.target.value)}
					type="text"
					className="form-control"
					placeholder="Enter your project name"
				/>
			</div>
			<div>
				<small>
					<label className="text-muted">Enter Your Projects Description</label>
				</small>

				<ReactQuill
					theme="snow"
					value={description}
					onChange={(e) => setdescription(e)}
					className="form-control"
					placeholder="Write something..."
				/>
			</div>
			<div>
				<small>
					<label className="text-muted">Enter Duration of Your Projects</label>
				</small>
				<input
					value={duration}
					onChange={(e) => setduration(e.target.value)}
					type="text"
					className="form-control"
					placeholder="Enter your project duration"
				/>
			</div>
			{!next ? (
				<button onClick={(e) => next} className="btn btn-primary col-12">
					Submit
				</button>
			) : (
				<button onClick={(e) => next} className="btn btn-primary col-12">
					Next
				</button>
			)}
		</form>
	);
};

export default ProjectForm;
