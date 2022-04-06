import React from "react";

import "antd/dist/antd.css";
import { Tabs } from "antd";

import Education from "../education/dashboard";
import Project from "../projects/dashboard";
import Skill from "../skills/dashboard";
import Nav from "../../components/Nav";

const { TabPane } = Tabs;

function Resume() {
	return (
		<>
			<Nav />
			<div
				className="tab container-fluid col-md-8 offset-md-2"
				style={{ paddingLeft: "0px", paddingRight: "0px" }}
			>
				<Tabs defaultActiveKey="3">
					<TabPane
						tab={
							<span>
								<i className="fa fa-graduation-cap" aria-hidden="true">
									{"            "}
								</i>
								{"      "}
								Education
							</span>
						}
						key="1"
					>
						<Education />
					</TabPane>
					<TabPane
						tab={
							<span>
								<i className="fa fa-list-alt" aria-hidden="true">
									{"            "}
								</i>
								{"      "}
								Projects
							</span>
						}
						key="2"
					>
						<Project />
					</TabPane>
					<TabPane
						tab={
							<span>
								<i class="fa fa-spinner" aria-hidden="true"></i>
								{"      "}
								Skills
							</span>
						}
						key="3"
					>
						<Skill />
					</TabPane>
				</Tabs>
			</div>
		</>
	);
}

// ReactDOM.render(<TabsCard />, mountNode);
export default Resume;
