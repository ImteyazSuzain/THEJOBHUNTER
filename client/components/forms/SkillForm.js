import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
const SkillForm = ({ options, handleChange, handleSubmit }) => (
	<>
		<Select
			closeMenuOnSelect={false}
			components={animatedComponents}
			isMulti
			options={options}
			onChange={handleChange}
		/>
		<button className="btn btn-primary col-12" onClick={handleSubmit}>
			Submit
		</button>
	</>
);

export default SkillForm;
