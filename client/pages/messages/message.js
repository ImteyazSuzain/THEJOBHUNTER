import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import UserRoute from "../../components/routes/UserRoute";

import Nav from "../../components/Nav";
import axios from "axios";
import io from "socket.io-client";
import Conversation from "../../components/conversations/conversations";
import Message from "../../components/Message/Message";
const Messanger = () => {
	const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
		reconnection: true,
	});
	const router = useRouter();
	const [state, setState] = useContext(UserContext);
	const [id, setId] = useState(state.user._id);
	const [conversations, setconversations] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const scrollRef = useRef();

	useEffect(() => {
		if (state && state.user) {
			setId(state.user._id);
			console.log(state.user._id);
		}
	}, [state && state.user]);

	useEffect(() => {
		if (id) {
			const getConversations = async () => {
				try {
					const { data } = await axios.get(`/conversations/${id}`);
					setconversations(data);
				} catch (err) {
					console.log(err);
				}
			};
			getConversations();
		}
	}, [id]);
	useEffect(() => {
		if (currentChat) {
			const getMessages = async () => {
				try {
					const res = await axios.get("/messages/" + currentChat?._id);
					setMessages(res.data);
				} catch (err) {
					console.log(err);
				}
			};
			getMessages();
		}
	}, [currentChat]);
	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const message = {
			sender: id,
			text: newMessage,
			conversationId: currentChat._id,
		};
		try {
			const res = await axios.post("/messages", message);
			setMessages([...messages, res.data]);
			setNewMessage("");
		} catch (err) {
			console.log(err);
		}
	};
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
				<div className="messenger">
					<div className="chatMenu">
						<div className="chatMenuWrapper">
							<input
								placeholder="Search for friends"
								className="chatMenuInput"
							/>
							{conversations.map((c) => (
								<div onClick={() => setCurrentChat(c)}>
									<Conversation conversation={c} id={id} />
								</div>
							))}
						</div>
					</div>
					<div className="chatBox">
						<div className="chatBoxWrapper">
							{currentChat ? (
								<>
									<div className="chatBoxTop">
										{messages.map((m) => (
											<div ref={scrollRef}>
												<Message message={m} own={m.sender === id} />
											</div>
										))}
									</div>
									<div className="chatBoxBottom">
										<textarea
											className="chatMessageInput"
											placeholder="write something..."
											onChange={(e) => setNewMessage(e.target.value)}
											value={newMessage}
										></textarea>
										<button className="chatSubmitButton" onClick={handleSubmit}>
											Send
										</button>
									</div>
								</>
							) : (
								<span className="noConversationText">
									Open a conversation to start a chat.
								</span>
							)}
						</div>
					</div>
				</div>
			</>
		</UserRoute>
	);
};

export default Messanger;
