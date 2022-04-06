import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ProjectForm from "../../components/forms/ProjectForm";
import { toast } from "react-toastify";
import Nav from "../../components/Nav";

const educationid = () => {
	const router = useRouter();
	const _id = router.query._id;
	const [duration, setduration] = useState("");
	const [description, setdescription] = useState("");
	const [name, setname] = useState("");
	const [data, setData] = useState("");
	useEffect(() => {
		if (_id) fetchdata();
	}, [_id]);
	const fetchdata = async () => {
		try {
			const { data } = await axios.get(`/user-project/${_id}`);
			setData(data);
			setdescription(data.description);
			setduration(data.duration);
			setname(data.name);
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.put(`/update-project/${_id}`, {
				name,
				duration,
				description,
			});
			if (data.error) {
				toast.error(data.error);
			} else {
				toast.success("Project is Updated");
				router.push("/projects/dashboard");
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<Nav />
			{data && (
				<div className="col-md-8 offset-md-2 py-5">
					<ProjectForm
						name={name}
						setname={setname}
						description={description}
						setdescription={setdescription}
						duration={duration}
						setduration={setduration}
						handleSubmit={handleSubmit}
					/>
				</div>
			)}
		</>
	);
};
export default educationid;
