import React, { useEffect, useState } from "react";
import { UserContext } from "../../context";
import { useContext } from "react";
import axios from "axios";
import Educationlist from "../../components/cards/Educationlist";
import { toast } from "react-toastify";
import { Modal } from "antd";
import EducationForm from "../../components/forms/EducationForm";
import Nav from "../../components/Nav";

import { useRouter } from "next/router";

const dashboard = () => {
	const [state, setState] = useContext(UserContext);
	const [educationss, setEducation] = useState("");
	const [visible, setVisible] = useState(false);
	const [startdate, setstartdate] = useState("");
	const [enddate, setenddate] = useState("");
	const [education, seteducation] = useState("");
	const [percentage, setpercentage] = useState("");
	const [collegeName, setcollegeName] = useState("");
	const [__id, setId] = useState("");
	const router = useRouter();

	useEffect(() => {
		if (state && state.token) {
			educations();
		}
	}, [state && state.token]);
	const handleDelete = async (e) => {
		try {
			const answer = window.confirm("Are you sure?");
			if (!answer) return;
			const { data } = await axios.delete(`/delete-education/${e._id}`);

			educations();
			toast.error("Education Deleted");
		} catch (err) {
			console.log(err);
		}
	};
	const educations = async () => {
		try {
			const { data } = await axios.get(`/geteducation`);

			setEducation(data.geteducation);
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
			const { data } = await axios.post("/education", {
				startdate,
				enddate,
				education,
				percentage,
				collegeName,
			});
			if (data.error) {
				toast.error(data.error);
			} else {
				educations();

				toast.success("Education Added");
				setVisible(false);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Nav />
			<div
				className="container-fluid"
				style={{ paddingLeft: "0px", paddingRight: "0px" }}
			>
				<div className="row py-5 text-light bg-default-image">
					<div className="col text-center">
						<h1>Education Dashboard</h1>
					</div>
				</div>

				<Educationlist
					educationss={educationss}
					handleDelete={handleDelete}
					handleEducation={handleEducation}
				/>

				<Modal
					visible={visible}
					onCancel={() => setVisible(false)}
					title="Education"
					footer={null}
				>
					<EducationForm
						startdate={startdate}
						enddate={enddate}
						setstartdate={setstartdate}
						setenddate={setenddate}
						education={education}
						seteducation={seteducation}
						percentage={percentage}
						collegeName={collegeName}
						setcollegeName={setcollegeName}
						setpercentage={setpercentage}
						handleSubmit={handleSubmit}
					/>
				</Modal>
			</div>
		</>
	);
};

export default dashboard;
