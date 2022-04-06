import TextField from "@mui/material/TextField";

const EducationForm = ({
	startdate,
	setstartdate,
	enddate,
	setenddate,
	education,
	seteducation,
	percentage,
	setpercentage,
	handleSubmit,
	collegeName,
	setcollegeName,
	next,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className="py-3">
				<div>
					<small>
						<label className="text-muted center">Start Date</label>
					</small>
					<br />
					<TextField
						id="date"
						type="date"
						onChange={(e) => setstartdate(e.target.value)}
						value={startdate}
					/>
				</div>

				<div>
					<small>
						<label className="text-muted center">End Date</label>
					</small>
					<br />
					<TextField
						id="date"
						type="date"
						onChange={(e) => setenddate(e.target.value)}
						value={enddate}
					/>
				</div>
			</div>
			<div className="form-group p-2">
				<small>
					<label className="text-muted">Pick Education Level</label>
				</small>
				<select
					value={education}
					onChange={(e) => seteducation(e.target.value)}
					className="form-control"
				>
					<option value="">Education Level</option>
					<option value="Xth">Class Xth</option>
					<option value="Xth">Class Xth</option>
					<option value="Udergraduate">Undergraduate</option>
					<option value="PostGraduate">PostGraduate</option>
				</select>
			</div>
			<div className="form-group p-2">
				<small>
					<label className="text-muted">College Name</label>
				</small>
				<input
					value={collegeName}
					onChange={(e) => setcollegeName(e.target.value)}
					type="text"
					className="form-control"
					placeholder="Enter your College Name"
				/>
			</div>
			<div className="form-group p-2">
				<small>
					<label className="text-muted">Percentage</label>
				</small>
				<input
					value={percentage}
					onChange={(e) => setpercentage(e.target.value)}
					type="number"
					className="form-control"
					placeholder="Enter your equivalent percentage"
				/>
			</div>

			{!next ? (
				<button onClick={(e) => next} className="btn btn-primary col-12">
					Submit
				</button>
			) : (
				<button onClick={(e) => next} className="btn btn-primary col-12">
					Next
				</button>
			)}
		</form>
	);
};

export default EducationForm;
