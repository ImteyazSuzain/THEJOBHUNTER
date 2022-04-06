import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Card } from "antd";

const Educationlist = ({ educationss, handleDelete, handleEducation }) => {
	const router = useRouter();

	return (
		<>
			<div className="container-fluid">
				<Card title="Education">
					{educationss &&
						educationss.map((e) => (
							<div key={e._id} className="">
								<Card
									className="card"
									type="inner"
									title={e.education}
									extra={<p>{e.startdate}</p>}
								>
									<div className="education">
										<div className="card-left">{e.collegeName}</div>
										<div className="card-right">{e.percentage}</div>
									</div>
								</Card>

								<div className="card-footer d-flex">
									<span>{e.enddate}</span>
									<>
										<EditOutlined
											onClick={() => router.push(`/education/${e._id}`)}
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
				</Card>
			</div>
		</>
	);
};
export default Educationlist;
