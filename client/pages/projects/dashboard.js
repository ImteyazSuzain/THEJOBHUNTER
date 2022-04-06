import React, { useEffect, useState } from "react";
import { UserContext } from "../../context";
import { useContext } from "react";
import axios from "axios";
import Educationlist from "../../components/cards/Educationlist";
import { toast } from "react-toastify";
import { Modal, Pagination } from "antd";
import ProjectForm from "../../components/forms/ProjectForm";
import { Avatar, List } from "antd";
import { useRouter } from "next/router";
import Projectlist from "../../components/cards/Projectlist";
import Nav from "../../components/Nav";

const dashboard = () => {
	const [state, setState] = useContext(UserContext);
	const [projectss, setProjects] = useState("");
	const [visible, setVisible] = useState(false);
	const router = useRouter();
	const [duration, setduration] = useState("");
	const [description, setdescription] = useState("");
	const [name, setname] = useState("");

	useEffect(() => {
		if (state && state.token) {
			projects();
		}
	}, [state && state.token]);
	const handleDelete = async (e) => {
		try {
			const answer = window.confirm("Are you sure?");
			if (!answer) return;
			const { data } = await axios.delete(`/delete-project/${e._id}`);

			projects();
			toast.error("Project Deleted");
		} catch (err) {
			console.log(err);
		}
	};
	const projects = async () => {
		try {
			const { data } = await axios.get(`/getproject`);

			setProjects(data.getproject);
		} catch (err) {
			console.log(err);
		}
	};
	const handleEducation = async () => {
		setVisible(true);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post("/add-project", {
				name,
				description,
				duration,
			});
			if (data.ok) {
				toast.success("Project Added");
			}
			projects();
			setVisible(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Nav />
			<div className="container-fluid">
				<div className="row py-5 text-light bg-default-image">
					<div className="col text-center">
						<h1>Project Dashboard</h1>
					</div>
				</div>
				<Projectlist
					projectss={projectss}
					handleDelete={handleDelete}
					handleEducation={handleEducation}
				/>

				<Modal
					visible={visible}
					onCancel={() => setVisible(false)}
					title="Comment"
					footer={null}
				>
					<ProjectForm
						name={name}
						setname={setname}
						description={description}
						setdescription={setdescription}
						duration={duration}
						setduration={setduration}
						handleSubmit={handleSubmit}
					/>
				</Modal>
			</div>
		</>
	);
};

export default dashboard;
