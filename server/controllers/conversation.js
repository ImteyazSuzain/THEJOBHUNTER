import Conversation from "../models/conversation";

export const conversation = async (req, res) => {
	console.log(req.body);
	const newConversation = new Conversation({
		members: [req.body.senderId, req.body.receiverId],
	});

	try {
		const savedConversation = await newConversation.save();
		res.status(200).json(savedConversation);
	} catch (err) {
		res.status(500).json(err);
	}
};

export const getuserconversation = async (req, res) => {
	try {
		const conversation = await Conversation.find({
			members: { $in: [req.params._id] },
		});
		res.status(200).json(conversation);
	} catch (err) {
		res.status(500).json(err);
	}
};
export const getconversations = async (req, res) => {
	try {
		const conversation = await Conversation.find({
			members: { $in: [req.params.userId] },
		});
		res.status(200).json(conversation);
	} catch (err) {
		res.status(500).json(err);
	}
};
