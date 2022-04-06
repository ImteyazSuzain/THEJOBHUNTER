import { useContext } from "react";
import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import { imageSources } from "../../functions";
import Link from "next/link";

const Friends = ({ datas }) => {
	const [state] = useContext(UserContext);

	const router = useRouter();

	return (
		<>
			{datas && datas.image && (
				<div className="conversation">
					<Avatar className="conversationImg" src={imageSources(datas)} />

					<span className="conversationName">{datas?.username}</span>
				</div>
			)}
		</>
	);
};

export default Friends;
