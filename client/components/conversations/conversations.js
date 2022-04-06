import axios from "axios";
import { useEffect, useState } from "react";
import { imageSource } from "../../functions";
import Friends from "../cards/Friends";

export default function Conversation({ conversation, id }) {
	const [user, setUser] = useState();
	let datas = [];

	useEffect(() => {
		const friendId = conversation.members.find((m) => m !== id);

		const getUser = async () => {
			try {
				const { data } = await axios.get("/users?userId=" + friendId);

				setUser(data);
				console.log(user);
				datas.push(data);
			} catch (err) {
				console.log(err);
			}
		};
		getUser();
	}, [id, conversation]);

	return (
		<div className="conversation">
			<Friends datas={user} />
		</div>
	);
}
