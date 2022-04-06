import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import ProjectForm from "../../components/forms/ProjectForm";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import { toast } from "react-toastify";
import Nav from "../../components/Nav";
const project = ({ next, current, setCurrent }) => {
	const router = useRouter();
	const [duration, setduration] = useState("");
	const [description, setdescription] = useState("");
	const [name, setname] = useState("");
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
				if (next) {
					setCurrent(current + 1);
				} else {
					router.push("/projects/dashboard");
				}
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<UserRoute>
			<Nav />
			<div className="container-fluid">
				<div className="container col-md-10 offset-md-1 pt-5">
					<div className="card mb-5">
						<div className="container">
							<div>
								<h1 className="text-center">Project</h1>
							</div>
							<ProjectForm
								name={name}
								setname={setname}
								description={description}
								setdescription={setdescription}
								duration={duration}
								setduration={setduration}
								handleSubmit={handleSubmit}
								next={next}
							/>
						</div>
					</div>
				</div>
			</div>
		</UserRoute>
	);
};

export default project;
