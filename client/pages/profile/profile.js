import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import Link from "next/link";
import UserRoute from "../../components/routes/UserRoute";
import { Modal, Pagination } from "antd";
import Resume from "../Resume/Resume";
import Nav from "../../components/Nav";
const profile = () => {
	const router = useRouter();
	const [state, setState] = useContext(UserContext);
	const [image, setimage] = useState(state.user.image);
	const [name, setname] = useState(state.user.name);
	const [visible, setvisible] = useState(false);
	const [username, setusername] = useState(state.user.username);
	const [about, setabout] = useState(state.user.about);

	useEffect(() => {
		if (state && state.user) {
			setusername(state.user.username);
			setabout(state.user.about);
			setname(state.user.name);

			setimage(state.user.image);
		}
	}, [state && state.user]);

	const handleClick = () => {
		router.push("/user/profile/update");
	};
	const handleVisible = () => {
		setvisible(true);
	};
	return (
		<UserRoute>
			<>
				<Nav />
				<div className="container-fluid home-container">
					<div className="profile-container">
						<div className="profile-parent">
							<div className="profile-details">
								<div className="profile-details-name">
									<span className="primary-text">
										{" "}
										Hello , I'M <span className="highlighted-text">{name}</span>
									</span>
								</div>
								<div className="colz">
									<div className="colz-icons">
										{state && state.user && state.user.following && (
											<Link href={`/user/following`}>
												<a className="h6">
													{state.user.following.length} Following
												</a>
											</Link>
										)}
										{state && state.user && state.user.following && (
											<Link href={`/user/following`}>
												<a className="h6">
													{state.user.followers.length} Followers
												</a>
											</Link>
										)}
									</div>
								</div>
								<div className="profile-details-role">
									<span className="primary-text">
										{""}
										<h1> </h1>
										<span className="profile-role-tagline">{username}</span>
									</span>
								</div>
								<div className="profile-options">
									<button
										onClick={handleClick}
										className="btn primary-btn highlighted-btn"
									>
										{""}
										Edit {""}
									</button>
									<button
										onClick={handleVisible}
										className="btn primary-btn highlighted-btn"
									>
										{""}
										About {""}
									</button>
								</div>
							</div>
							<div className="profile-picture">
								<div className="profile-picture-background">
									{image && image.url && (
										<img src={image.url} alt="" className="about-img" />
									)}
								</div>
							</div>
						</div>
					</div>

					<Modal
						visible={visible}
						onCancel={() => setvisible(false)}
						title="About"
						footer={null}
					>
						{about}
					</Modal>
				</div>
				<Resume />
			</>
		</UserRoute>
	);
};

export default profile;
