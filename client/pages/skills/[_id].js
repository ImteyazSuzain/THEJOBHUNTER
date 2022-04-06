import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import Nav from "../../components/Nav";
const skills = () => {
	const ListItem = styled("li")(({ theme }) => ({
		margin: theme.spacing(0.5),
	}));
	const animatedComponents = makeAnimated();
	const router = useRouter();
	const _id = router.query._id;
	const [skill, setskill] = useState([]);
	const [options, setoptions] = useState([
		{ value: "chocolate", label: "Chocolate" },
		{ value: "strawberry", label: "Strawberry" },
		{ value: "vanilla", label: "Vanilla" },
	]);
	useEffect(() => {
		if (_id) {
			fetchdata();
		}
	}, [_id]);
	let myskill = [];
	const fetchdata = async () => {
		try {
			const { data } = await axios.get(`/user-skill/${_id}`);
			setskill(data.skill);
			myskill = data.skill;
			console.log(myskill);
		} catch (err) {
			console.log(err);
		}
	};
	//  const handleDelete = (chipToDelete) => () => {
	// 		setChipData((chips) =>
	// 			chips.filter((chip) => chip.key !== chipToDelete.key)
	// 		);
	// };
	// const handleChange = (chipToChange) => () => {
	// 	setskill((chips) =>
	// 		chips.push((chip) => chip.label !== chipToChange.label)
	// 	);
	// };

	const handleChange = async (e) => {
		setskill(e);
	};

	const handleSubmit = async (e) => {
		const { data } = await axios.put(`/update-skill/${_id}`, {
			skill,
		});
		if (data) {
			toast.success("skill Updated");
		}
		router.push("/education/dashboard");
	};

	return (
		<>
			<Nav />
			<div className="container-fluid">
				<div className="row py-5 text-light bg-default-image">
					<div className="col text-center">
						<h1>Skills</h1>
					</div>
				</div>
				<div className="container col-md-8 offset-md-2 pt-5">
					<div className="card mb-5">
						<div className="container">
							<div>
								<h1 className="text-center">Education</h1>
							</div>
							<div>
								<Paper
									sx={{
										display: "flex",
										justifyContent: "center",
										flexWrap: "wrap",
										listStyle: "none",
										p: 0.5,
										m: 0,
									}}
									component="ul"
								>
									{skill.map((data) => {
										return (
											<ListItem key={data.label}>
												<Chip label={data.value} />
											</ListItem>
										);
									})}
								</Paper>
								<Select
									closeMenuOnSelect={false}
									isMulti
									options={options}
									onChange={handleChange}
								/>
							</div>
						</div>
						<button
							className="btn btn-primary btn-sm btn-block mt-3"
							onClick={handleSubmit}
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default skills;
