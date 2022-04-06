import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import ParallaxBG from "../components/cards/ParallaxBG";
import axios from "axios";
import PostPublic from "../components/cards/PostPublic";
import Head from "next/head";
import Link from "next/link";
import io from "socket.io-client";
import Nav from "../components/Nav";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
	reconnection: true,
});

const Home = ({ posts }) => {
	const [state, setState] = useContext(UserContext);

	const [newsFeed, setNewsFeed] = useState([]);

	// useEffect(() => {
	//   // console.log("SOCKETIO ON JOIN", socket);
	//   socket.on("receive-message", (newMessage) => {
	//     alert(newMessage);
	//   });
	// }, []);

	useEffect(() => {
		socket.on("new-post", (newPost) => {
			setNewsFeed([newPost, ...posts]);
		});
	}, []);

	const head = () => (
		<Head>
			<title>THEJOBHUNTER - Job Website for creative folks</title>
			<meta
				name="description"
				content="A job website for creative folks based on their interest"
			/>
			<meta
				property="og:description"
				content="A job website for creative folks based on their interest"
			/>
			<meta property="og:type" content="website" />
			<meta property="og:site_name" content="THEJOBHUNTER" />
			<meta property="og:url" content="http://merncamp.com" />
			<meta
				property="og:image:secure_url"
				content="http://merncamp.com/images/default.jpg"
			/>
		</Head>
	);

	const collection = newsFeed.length > 0 ? newsFeed : posts;

	return (
		<>
			<Nav />
			<>
				{head()}
				<ParallaxBG url="/images/default.jpg" />

				<div className="container">
					{/* <button
          onClick={() => {
            socket.emit("send-message", "This is ryan!!!");
          }}
        >
          Send message
        </button> */}
					<div className="row pt-5">
						{collection.map((post) => (
							<div key={post._id} className="col-md-4">
								<Link href={`/post/view/${post._id}`}>
									<a>
										<PostPublic key={post._id} post={post} />
									</a>
								</Link>
							</div>
						))}
					</div>
				</div>
			</>
		</>
	);
};

export async function getServerSideProps() {
	const { data } = await axios.get(`${process.env.API}/posts`);
	// console.log(data);
	return {
		props: {
			posts: data,
		},
	};
}

export default Home;
