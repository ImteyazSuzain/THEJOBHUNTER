import React from "react";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { Avatar } from "antd";
import { useRouter } from "next/router";

const Navbar = () => {
	const [current, setCurrent] = useState("");
	const [state, setState] = useContext(UserContext);

	useEffect(() => {
		process.browser && setCurrent(window.location.pathname);
	}, [process.browser && window.location.pathname]);

	const router = useRouter();

	const logout = () => {
		window.localStorage.removeItem("auth");
		setState(null);
		router.push("/login");
	};
	return (
		<nav
			className="nav d-flex justify-content-start "
			style={{ backgroundColor: "blue" }}
		>
			<Link href="/">
				<a
					className={`nav-link text-light logo ${current === "/" && "active"}`}
				>
					<Avatar src="/images/logo.png" /> THEJOBHUNTER
				</a>
			</Link>

			{state !== null ? (
				<>
					<Link href="/Newsletter/general">
						<a
							className={`nav-link text-light ${
								current === "/Newsletter/general" && "active"
							}`}
						>
							General
						</a>
					</Link>
					<Link href="/Newsletter/business">
						<a
							className={`nav-link text-light ${
								current === "/Newsletter/business" && "active"
							}`}
						>
							Business
						</a>
					</Link>
					<Link href="/Newsletter/entertainment">
						<a
							className={`nav-link text-light ${
								current === "/Newsletter/entertainment" && "active"
							}`}
						>
							Entertainment
						</a>
					</Link>
					<Link href="/Newsletter/health">
						<a
							className={`nav-link text-light ${
								current === "/Newsletter/health" && "active"
							}`}
						>
							Health
						</a>
					</Link>
					<Link href="/Newsletter/science">
						<a
							className={`nav-link text-light ${
								current === "/Newsletter/science" && "active"
							}`}
						>
							Science
						</a>
					</Link>
					<Link href="/Newsletter/sports">
						<a
							className={`nav-link text-light ${
								current === "/Newsletter/sports" && "active"
							}`}
						>
							Sports
						</a>
					</Link>
					<Link href="/Newsletter/technology">
						<a
							className={`nav-link text-light ${
								current === "/Newsletter/technology" && "active"
							}`}
						>
							Technology
						</a>
					</Link>

					<div
						className="dropdown justify-content-end "
						style={{
							alignItems: "end",
						}}
					>
						<a
							style={{
								alignItems: "end",
							}}
							className="btn dropdown-toggle text-light"
							role="button"
							id="dropdownMenuLink"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							{state && state.user && state.user.name}
						</a>
						<ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
							<li>
								<Link href="/user/dashboard">
									<a
										className={`nav-link dropdown-item ${
											current === "/user/dashboard" && "active"
										}`}
									>
										Dashboard
									</a>
								</Link>
							</li>

							<li>
								<Link href="/user/profile/update">
									<a
										className={`nav-link dropdown-item ${
											current === "/user/profile/update" && "active"
										}`}
									>
										Profile
									</a>
								</Link>
							</li>

							{state.user.role === "Admin" && (
								<li>
									<Link href="/admin">
										<a
											className={`nav-link dropdown-item ${
												current === "/admin" && "active"
											}`}
										>
											Admin
										</a>
									</Link>
								</li>
							)}

							<li>
								<a onClick={logout} className="nav-link">
									Logout
								</a>
							</li>
						</ul>
					</div>
				</>
			) : (
				<>
					<Link href="/login">
						<a
							className={`nav-link text-light ${
								current === "/login" && "active"
							}`}
						>
							Login
						</a>
					</Link>

					<Link href="/register">
						<a
							className={`nav-link text-light ${
								current === "/register" && "active"
							}`}
						>
							Register
						</a>
					</Link>
				</>
			)}
		</nav>
	);
};

export default Navbar;
