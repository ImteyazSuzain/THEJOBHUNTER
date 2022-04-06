import { useEffect, useState } from "react";

import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import EducationForm from "../../components/forms/EducationForm";
import Nav from "../../components/Nav";

const educationid = () => {
	const router = useRouter();
	const _id = router.query._id;
	const [startdate, setstartdate] = useState("");
	const [enddate, setenddate] = useState("");
	const [education, seteducation] = useState("");
	const [percentage, setpercentage] = useState("");
	const [data, setData] = useState("");
	const [collegeName, setcollegeName] = useState("");
	useEffect(() => {
		if (_id) fetchdata();
	}, [_id]);
	const fetchdata = async () => {
		try {
			const { data } = await axios.get(`/user-education/${_id}`);
			setData(data);
			setstartdate(data.startdate);
			setenddate(data.enddate);
			seteducation(data.education);
			setpercentage(data.percentage);
			setcollegeName(data.collegeName);
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.put(`/update-education/${_id}`, {
				startdate,
				enddate,
				education,
				percentage,
				collegeName,
			});
			if (data.error) {
				toast.error(data.error);
			} else {
				toast.success("Education is Updated");
				router.push("/education/dashboard");
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
					<EducationForm
						startdate={startdate}
						enddate={enddate}
						setstartdate={setstartdate}
						setenddate={setenddate}
						education={education}
						seteducation={seteducation}
						percentage={percentage}
						setpercentage={setpercentage}
						collegeName={collegeName}
						setcollegeName={setcollegeName}
						handleSubmit={handleSubmit}
						next={next}
					/>
				</div>
			)}
		</>
	);
};
export default educationid;
