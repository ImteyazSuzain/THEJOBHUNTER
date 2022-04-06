import React from "react";
import Navbar from "../../components/Navbar";
import News from "../../components/News";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
const technology = () => {
	const pageSize = 6;
	const apiKey = "2d1d76ede48f4508bc842d9b85190c6c";
	const [progress, setProgress] = useState(0);
	return (
		<>
			<>
				<Navbar />
				<LoadingBar height={3} color="#f11946" progress={progress} />
				<News
					setProgress={setProgress}
					apiKey={apiKey}
					key="technology"
					pageSize={pageSize}
					country="in"
					category="technology"
				/>
			</>
		</>
	);
};

export default technology;
