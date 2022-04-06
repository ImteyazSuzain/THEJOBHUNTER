import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UserRoute from "../../components/routes/UserRoute";

import axios from "axios";
import { toast } from "react-toastify";
import EducationForm from "../../components/forms/EducationForm";
import Nav from "../../components/Nav";
const education = ({ next, current, setCurrent }) => {
	const router = useRouter();
	const [startdate, setstartdate] = useState("");
	const [enddate, setenddate] = useState("");
	const [education, seteducation] = useState("");
	const [percentage, setpercentage] = useState("");
	const [collegeName, setcollegeName] = useState("");

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
				toast.success("Education Added");
				if (next) {
					setCurrent(current + 1);
				} else {
					router.push("/education/dashboard");
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
								<h1 className="text-center" style={{ color: "blue" }}>
									Education
								</h1>
							</div>
							<EducationForm
								startdate={startdate}
								enddate={enddate}
								setstartdate={setstartdate}
								setenddate={setenddate}
								education={education}
								seteducation={seteducation}
								percentage={percentage}
								setpercentage={setpercentage}
								handleSubmit={handleSubmit}
								collegeName={collegeName}
								setcollegeName={setcollegeName}
								next={next}
							/>
						</div>
					</div>
				</div>
			</div>
		</UserRoute>
	);
};
export default education;
