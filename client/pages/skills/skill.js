import React from "react";
import { useState } from "react";
import SkillForm from "../../components/forms/SkillForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";

const skill = () => {
	const router = useRouter();
	const [skill, setskill] = useState("");
	const [options, setoptions] = useState([
		{ value: "chocolate", label: "Chocolate" },
		{ value: "strawberry", label: "Strawberry" },
		{ value: "vanilla", label: "Vanilla" },
	]);

	const handleChange = async (e) => {
		setskill(e);
	};
	const handleSubmit = async (e) => {
		const { data } = await axios.post("/add-skill", {
			skill,
		});
		if (data.ok) {
			toast.success("skill Added");
		}
		router.push("/profile/profile");
	};
	return (
		<>
			<Nav />
			<div className="container-fluid">
				<div className="container col-md-8 offset-md-2 pt-5">
					<div className="card mb-5">
						<div className="container">
							<div>
								<h1 className="text-center">Education</h1>
							</div>
							<div>
								<SkillForm
									handleChange={handleChange}
									options={options}
									handleSubmit={handleSubmit}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default skill;
