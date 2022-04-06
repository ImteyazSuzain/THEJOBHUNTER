import { SyncOutlined } from "@ant-design/icons";

const AuthForm = ({
	handleSubmit,
	name,
	setName,
	email,
	setEmail,
	password,
	setPassword,
	loading,
	page,
	username,
	setUsername,
	about,
	setAbout,
	profileUpdate,
	next,
}) => (
	<form onSubmit={handleSubmit}>
		{profileUpdate && (
			<div className="form-group p-2">
				<small>
					<label className="text-muted">Username</label>
				</small>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					className="form-control"
					placeholder="Enter Your Username"
				/>
			</div>
		)}

		{profileUpdate && (
			<div className="form-group p-2">
				<small>
					<label className="text-muted">About</label>
				</small>
				<input
					value={about}
					onChange={(e) => setAbout(e.target.value)}
					type="text"
					className="form-control"
					placeholder="Write about yourself.."
				/>
			</div>
		)}

		{page !== "login" && (
			<div className="form-group p-2">
				<small>
					<label className="text-muted">Your name</label>
				</small>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					className="form-control"
					placeholder="Enter Your Name"
				/>
			</div>
		)}

		{!profileUpdate && (
			<div className="form-group p-2">
				<small>
					<label className="text-muted">Email address</label>
				</small>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					className="form-control"
					placeholder="Enter Your Email"
					disabled={profileUpdate}
				/>
			</div>
		)}

		{!profileUpdate && (
			<div className="form-group p-2">
				<small>
					<label className="text-muted">Password</label>
				</small>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					className="form-control"
					placeholder="Enter Your Password"
				/>
			</div>
		)}
		{!next ? (
			<div className="form-group p-2">
				<button
					disabled={
						profileUpdate
							? loading
							: page === "login"
							? !email || !password || loading
							: !name || !email || !password || loading
					}
					className="btn btn-primary col-12"
				>
					{loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
				</button>
			</div>
		) : (
			<div className="form-group p-2">
				<button
					disabled={
						profileUpdate
							? loading
							: page === "login"
							? !email || !password || loading
							: !name || !email || !password || loading
					}
					className="btn btn-primary col-12"
				>
					{loading ? <SyncOutlined spin className="py-1" /> : "Next"}
				</button>
			</div>
		)}
	</form>
);

export default AuthForm;
