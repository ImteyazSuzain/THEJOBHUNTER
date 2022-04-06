import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import Token from "../models/token";
import { emailverify } from "../helpers/email";
import crypto from "crypto";

export const register = async (req, res) => {
	//  console.log("REGISTER ENDPOINT => ", req.body);
	const { name, email, password } = req.body;
	// validation
	if (!name) {
		return res.json({
			error: "Name is required",
		});
	}
	if (!password || password.length < 6) {
		return res.json({
			error: "Password is required and should be 6 characters long",
		});
	}

	const exist = await User.findOne({ email });
	if (exist) {
		return res.json({
			error: "Email is taken",
		});
	}
	// hash password
	const hashedPassword = await hashPassword(password);

	const user = new User({
		name,
		email,
		password: hashedPassword,

		username: nanoid(6),
	});

	try {
		await user.save();
		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		});
		await token.save();
		console.log(user._id);
		const url = `${process.env.CLIENT_URL}/user/${user._id}/verify/${token.token}`;
		await emailverify(user.email, "Verify Email", url);
		res.json({
			ok: true,
		});
	} catch (err) {
		console.log("REGISTER FAILED => ", err);
		return res.status(400).send("Error. Try again.");
	}
};

export const login = async (req, res) => {
	// console.log(req.body);
	try {
		const { email, password } = req.body;
		// check if our db has user with that email
		const user = await User.findOne({ email });
		if (!user) {
			return res.json({
				error: "no user found",
			});
		}
		// check password
		const match = await comparePassword(password, user.password);
		if (!match) {
			return res.json({
				error: "Wrong password",
			});
		}
		// create signed token
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});
		user.password = undefined;
		user.secret = undefined;
		res.json({
			token,
			user,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).send("Error. Try again.");
	}
};

export const currentUser = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		// res.json(user);
		res.json({ ok: true });
	} catch (err) {
		console.log(err);
		res.sendStatus(400);
	}
};

export const forgotPassword = async (req, res) => {
	// console.log(req.body);
	const { email, newPassword, secret } = req.body;
	// validation

	if (!email) {
		return res.json({
			error: "Email is required",
		});
	}
	const user = await User.findOne({ email });
	if (!user) {
		return res.json({
			error: "No user register with a given email",
		});
	}

	try {
		let token = await Token.findOne({ userId: user._id });
		if (!token) {
			token = await new Token({
				userId: user._id,
				token: crypto.randomBytes(32).toString("hex"),
			}).save();
		}

		const url = `${process.env.CLIENT_URL}/password-reset/${user._id}/${token.token}`;
		await emailverify(user.email, "Password Reset", url);
		return res.json({
			success: "Password Reset link sent to your registered email",
		});
	} catch (err) {
		return res.json({
			error: "Something wrong, Try Again",
		});
	}
};

export const profileUpdate = async (req, res) => {
	try {
		// console.log("profile update req.body", req.body);
		const data = {};

		if (req.body.username) {
			data.username = req.body.username;
		}
		if (req.body.about) {
			data.about = req.body.about;
		}
		if (req.body.name) {
			data.name = req.body.name;
		}

		if (req.body.image) {
			data.image = req.body.image;
		}
		let user = await User.findByIdAndUpdate(req.user._id, data, { new: true });
		// console.log('udpated user', user)
		user.password = undefined;

		res.json(user);
	} catch (err) {
		if (err.code == 11000) {
			return res.json({ error: "Duplicate username" });
		}
		console.log(err);
	}
};

export const findPeople = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		// user.following
		console.log(user);
		let following = user.following;
		following.push(user._id);
		const people = await User.find({ _id: { $nin: following } })
			.select("-password")
			.limit(10);
		res.json(people);
	} catch (err) {
		console.log(err);
	}
};

// middleware
export const addFollower = async (req, res, next) => {
	try {
		const user = await User.findByIdAndUpdate(req.body._id, {
			$addToSet: { followers: req.user._id },
		});
		next();
	} catch (err) {
		console.log(err);
	}
};

export const userFollow = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.user._id,
			{
				$addToSet: { following: req.body._id },
			},
			{ new: true }
		).select("-password ");
		res.json(user);
	} catch (err) {
		console.log(err);
	}
};

export const userFollowing = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		const following = await User.find({ _id: user.following }).limit(100);
		res.json(following);
	} catch (err) {
		console.log(err);
	}
};

/// middleware
export const removeFollower = async (req, res, next) => {
	try {
		const user = await User.findByIdAndUpdate(req.body._id, {
			$pull: { followers: req.user._id },
		});
		next();
	} catch (err) {
		console.log(err);
	}
};

export const userUnfollow = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.user._id,
			{
				$pull: { following: req.body._id },
			},
			{ new: true }
		);
		res.json(user);
	} catch (err) {
		console.log(err);
	}
};

export const searchUser = async (req, res) => {
	const { query } = req.params;
	if (!query) return;
	try {
		// $regex is special method from mongodb
		// The i modifier is used to perform case-insensitive matching
		const user = await User.find({
			$or: [
				{ name: { $regex: query, $options: "i" } },
				{ username: { $regex: query, $options: "i" } },
			],
		}).select("-password ");
		res.json(user);
	} catch (err) {
		console.log(err);
	}
};

export const getUser = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username }).select(
			"-password "
		);
		res.json(user);
	} catch (err) {
		console.log(err);
	}
};

export const verifyUser = async (req, res) => {
	try {
		const user = await User.findById({ _id: req.params._id });
		if (!user) return res.status(400).send({ message: "Invalid user" });
		let token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });
		await User.findByIdAndUpdate(user._id, { verified: true });
		token = undefined;
		res.json({
			ok: true,
		});
	} catch (err) {
		console.log(err);
	}
};
export const resetPassword = async (req, res) => {
	try {
		const user = await User.findById(req.params._id);
		if (!user) return res.status(400).send({ message: "Invalid user" });
		let token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		res.json({
			ok: true,
		});
	} catch (err) {
		console.log(err);
	}
};

export const confirmPassword = async (req, res) => {
	const { newPassword } = req.body;
	// validation
	if (!newPassword || newPassword.length < 6) {
		return res.json({
			error: "Password is required and should be 6 characters long",
		});
	}
	const hashed = await hashPassword(newPassword);
	const user = await User.findById(req.params._id);
	if (!user) return res.status(400).send({ message: "Invalid link" });

	try {
		await User.findByIdAndUpdate(user._id, { password: hashed });
		return res.json({
			success: "Congrats, Now you can login with your new password",
		});
	} catch (err) {
		console.log(err);
		return res.json({
			error: "Something wrong. Try again.",
		});
	}
};

export const members = async (req, res) => {
	const userId = req.query.userId;
	const username = req.query.username;
	try {
		const user = userId
			? await User.findById(userId)
			: await User.findOne({ username: username });
		const { password, updatedAt, ...other } = user._doc;
		res.status(200).json(other);
	} catch (err) {
		res.status(500).json(err);
	}
};
