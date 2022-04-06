import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Avatar } from "antd";

import AuthForm from "../../../components/forms/AuthForm";
import { UserContext } from "../../../context";
import { useRouter } from "next/router";
import { LoadingOutlined, CameraOutlined } from "@ant-design/icons";
import Nav from "../../../components/Nav";

const ProfileUpdate = ({ next, setCurrent, current }) => {
	const [username, setUsername] = useState("");
	const [about, setAbout] = useState("");
	const [name, setName] = useState("");
	const [ok, setOk] = useState(false);
	const [loading, setLoading] = useState(false);
	// profile image
	const [image, setImage] = useState({});
	const [uploading, setUploading] = useState(false);

	const [state, setState] = useContext(UserContext);
	const router = useRouter();

	useEffect(() => {
		if (state && state.user) {
			//   console.log("user from state => ", state.user);
			setUsername(state.user.username);
			setAbout(state.user.about);
			setName(state.user.name);
			setImage(state.user.image);
		}
	}, [state && state.user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// console.log(name, email, password, secret);
			setLoading(true);
			const { data } = await axios.put(`/profile-update`, {
				username,
				about,
				name,
				image,
			});
			console.log("update response => ", data);
			if (data.error) {
				toast.error(data.error);
				setLoading(false);
			} else {
				// update local storage, update user, keep token
				let auth = JSON.parse(localStorage.getItem("auth"));
				auth.user = data;
				localStorage.setItem("auth", JSON.stringify(auth));
				// update context
				setState({ ...state, user: data });
				setOk(true);
				setLoading(false);
				toast.success("Profile Updated");
				if (next) {
					setCurrent(current + 1);
				}
			}
		} catch (err) {
			toast.error(err.response.data);
			setLoading(false);
		}
	};

	const handleImage = async (e) => {
		const file = e.target.files[0];
		let formData = new FormData();
		formData.append("image", file);
		// console.log([...formData]);
		setUploading(true);
		try {
			const { data } = await axios.post("/upload-image", formData);
			// console.log("uploaded image => ", data);
			setImage({
				url: data.url,
				public_id: data.public_id,
			});
			setUploading(false);
		} catch (err) {
			console.log(err);
			setUploading(false);
		}
	};

	return (
		<>
			<Nav />
			<div className="container-fluid">
				{!next && (
					<div className="row py-5 text-light bg-default-image">
						<div className="col text-center">
							<h1>Profile</h1>
						</div>
					</div>
				)}

				<div className="row py-5">
					<div className="col-md-6 offset-md-3">
						{/* upload image */}
						<label className="d-flex justify-content-center h5">
							{image && image.url ? (
								<Avatar size={30} src={image.url} className="mt-1" />
							) : uploading ? (
								<LoadingOutlined className="mt-2" />
							) : (
								<CameraOutlined className="mt-2" />
							)}
							<input
								onChange={handleImage}
								type="file"
								accept="images/*"
								hidden
							/>
						</label>

						<AuthForm
							profileUpdate={true}
							username={username}
							setUsername={setUsername}
							about={about}
							setAbout={setAbout}
							handleSubmit={handleSubmit}
							name={name}
							setName={setName}
							loading={loading}
							next={next}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileUpdate;
