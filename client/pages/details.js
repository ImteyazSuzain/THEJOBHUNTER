import React from "react";
import { Steps, Button, message } from "antd";
import Education from "./education/education";
import Skill from "./skills/skill";
import Project from "./projects/project";
import { useState } from "react";
import ProfileUpdate from "../pages/user/profile/update";
import { useRouter } from "next/router";
import Nav from "../components/Nav";
const details = () => {
	const router = useRouter();
	const { Step } = Steps;
	const [state, setstate] = useState("");

	const next = () => {
		setCurrent(current + 1);
	};
	const [current, setCurrent] = React.useState(0);

	const steps = [
		{
			title: "Profile Update",
			content: (
				<ProfileUpdate next={next} setCurrent={setCurrent} current={current} />
			),
		},
		{
			title: "Education",
			content: (
				<Education next={next} setCurrent={setCurrent} current={current} />
			),
		},
		{
			title: "Project",
			content: (
				<Project next={next} setCurrent={setCurrent} current={current} />
			),
		},
		{
			title: "Skill",
			content: <Skill />,
		},
	];

	const handleClick = () => {
		if (steps[current].title === "Skill") {
			router.push("/profile/profile");
		} else {
			next();
		}
	};
	return (
		<>
			<Nav />
			<div className="container-fluid">
				<div className="row py-5 text-light bg-default-image">
					<div className="col text-center">
						<h1>Profile</h1>
					</div>
				</div>
				<div className="container col-md-8 offset-md-2 pt-5 ">
					<div className="card mb-5 t">
						<div className="container">
							<div className=" col-md-6 offset-md-3 pt-5 ">
								<Steps current={current}>
									{steps.map((item) => (
										<Step key={item.title} title={item.title} />
									))}
								</Steps>
							</div>

							<div className="steps-content">{steps[current].content}</div>
							<div className="col text-center py-2">
								<button
									style={{ alignItems: "center" }}
									className="btn btn-primary text-center center"
									onClick={handleClick}
								>
									Skip
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default details;
