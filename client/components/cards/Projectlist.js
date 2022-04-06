import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import renderHTML from "react-render-html";

const Projectlist = ({ projectss, handleDelete, handleEducation }) => {
	const router = useRouter();

	return (
		<>
			{projectss &&
				projectss.map((e) => (
					<div key={e._id} className="">
						<div className="card-header d-flex ">{e.name}</div>

						<div className="card-body d-flex">
							<div className="d-flex">{renderHTML(e.description)}</div>
						</div>

						<div className="card-footer d-flex">
							<span>{e.duration}</span>
							<>
								<EditOutlined
									onClick={() => router.push(`/projects/${e._id}`)}
									className="text-danger pt-2 h5 px-2 ms-auto "
								/>
								<DeleteOutlined
									onClick={() => handleDelete(e)}
									className="text-danger pt-2 h5 px-2"
								/>
							</>
						</div>
						<br />
					</div>
				))}
			<div className="text-center">
				<button
					className="btn btn-primary text-center"
					onClick={handleEducation}
				>
					AddMore....
				</button>
			</div>
		</>
	);
};
export default Projectlist;
