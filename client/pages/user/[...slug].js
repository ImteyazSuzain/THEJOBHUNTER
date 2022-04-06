import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Nav from "../../components/Nav";

export default function Emailverify() {
	const router = useRouter();
	const [validUrl, setValidUrl] = useState(true);
	let query = router.query.slug;
	const _id = query?.[0];
	const token = query?.[2];
	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const { data } = await axios.get(`/user/${_id}/verify/${token}`);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [_id, token]);
	const handleclick = () => {
		router.push("/details");
	};
	return (
		<>
			<Nav />
			<div className="container-fluid">
				<div className="row py-5 text-light bg-default-image">
					<div className="col text-center">
						<h1>MERNCAMP</h1>
					</div>
				</div>
				<div className=" col-md-6 offset-md-3 pt-5 ">
					<h1>Email Verified Succesfully</h1>
					<button className="primary text-center" onClick={handleclick}>
						Continue
					</button>
				</div>
			</div>
		</>
	);
}
