import React, { useEffect, useState } from "react";
import { UserContext } from "../../context";
import { useContext } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { Modal } from "antd";
import SkillForm from "../../components/forms/SkillForm";
import { List } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";

const dashboard = () => {
	const [state, setState] = useContext(UserContext);
	const [visible, setVisible] = useState(false);
	const [skill, setskill] = useState("");
	const [_id, setId] = useState("");
	const [Data, setData] = useState("");
	const router = useRouter();
	const [options, setoptions] = useState([
		{ value: "chocolate", label: "Chocolate" },
		{ value: "strawberry", label: "Strawberry" },
		{ value: "vanilla", label: "Vanilla" },
	]);

	useEffect(() => {
		if (state && state.token) {
			skills();
		}
	}, [state && state.token]);
	const handleDelete = async (e) => {
		try {
			const answer = window.confirm("Are you sure?");
			if (!answer) return;
			const { data } = await axios.delete(`/delete-skill/${_id}`);
			setData("");
			skills();
			toast.error("Skill Deleted");
		} catch (err) {
			console.log(err);
		}
	};
	const skills = async () => {
		try {
			const { data } = await axios.get(`/get-skill`);

			if (data) {
				setData(data.skill[0].skill);
				console.log(data.skill[0].skill);
				console.log(Data);
				setskill(data.skill[0].skill);
				setId(data.skill[0]._id);
				console.log(skill);
				// if (Data.length > 0) {
				// 	console.log(Data);

				// 	setData(data.skill);
				// } else {
				// 	console.log(Data);
				// 	setData("");
				// }
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handleSkill = async () => {
		setVisible(true);
	};
	const handleSubmit = async (e) => {
		const { data } = await axios.post("/add-skill", {
			skill,
		});
		if (data.ok) {
			setVisible(false);
			toast.success("skill Updated");
		}
		router.push("/skills/dashboard");
	};
	const handleChange = async (e) => {
		setskill(e);
	};
	return (
		<>
			<Nav />
			<div className="container-fluid">
				<div className="row py-5 text-light bg-default-image">
					<div className="col text-center">
						<h1>Skills Dashboard</h1>
					</div>
				</div>
				{!Data ? (
					<button onClick={handleSkill}>AddMore....</button>
				) : (
					<>
						<List
							itemLayout="horizontal"
							dataSource={skill}
							renderItem={(user) => (
								<List.Item>
									<List.Item.Meta
										title={
											<div className="d-flex justify-content-between">
												<span>{user.value}</span>
											</div>
										}
									/>
								</List.Item>
							)}
						/>
						<div className="card-footer d-flex">
							<>
								<EditOutlined
									onClick={() => router.push(`/skills/${_id}`)}
									className="text-danger pt-2 h5 px-2 ms-auto "
								/>
								<DeleteOutlined
									onClick={() => handleDelete()}
									className="text-danger pt-2 h5 px-2"
								/>
							</>
						</div>
					</>
				)}

				<Modal
					visible={visible}
					onCancel={() => setVisible(false)}
					title="Comment"
					footer={null}
				>
					<SkillForm
						handleChange={handleChange}
						options={options}
						handleSubmit={handleSubmit}
					/>
				</Modal>
			</div>
		</>
	);
};

export default dashboard;
