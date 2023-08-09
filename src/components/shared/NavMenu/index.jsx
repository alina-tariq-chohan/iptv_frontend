import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Menu, notification } from "antd"
import Projects from "assets/icons/Projects"
import { ButtonWrapper, MenuWrapper } from "./styles"
import CustomButton from "components/shared/CustomButton/CustomButton"
import PlusIcon from "assets/icons/PlusIcon.png"
import Active from "assets/icons/Active"
import Archive from "assets/icons/Archive"
import { generateId } from "services/CommonMethods"
import axios from "axios"

const NavMenu = ({ collapsed }) => {
	const navigate = useNavigate()
	const location = useLocation()
	const { pathname } = location
	const [currentActive, setCurrentActive] = useState(pathname)

	useEffect(() => {
		setCurrentActive(pathname)
	}, [pathname, currentActive])

	const handleClick = (e) => {
		setCurrentActive(e.key)
	}

	const createProject = () => {
		const projects = JSON.parse(localStorage.getItem("projects"))
		const project = {
			id: generateId(projects),
			name: `Untitled Project ${generateId(projects)}`,
			description: "",
			user_id: localStorage.getItem("token"),
			last_modified_by: localStorage.getItem("token"),
			status: "active",
		}
		projects.push(project)
		localStorage.setItem("projects", JSON.stringify(projects))
		notification["success"]({
			message: "Project created successfully",
			duration: 2,
		})
		navigate(`/project/${project.id}`, { state: { isNewProject: true } })
	}

	// const createProject = async () => {
	// 	try {
	// 		const projectData = {
	// 			name: `Untitled Project`,
	// 			description: "",
	// 			user_id: localStorage.getItem("token"),
	// 			last_modified_by: localStorage.getItem("token"),
	// 			status: "active",
	// 		}

	// 		const response = await axios.post("http://localhost:2001/genres", projectData)
	// 		const newProject = response.data
	// 		console.log("Project created:", newProject)

	// 		notification["success"]({
	// 			message: "Project created successfully",
	// 			duration: 2,
	// 		})

	// 		navigate(`/project/${newProject._id}`, { state: { isNewProject: true } })
	// 	} catch (error) {
	// 		console.error("Error creating project:", error)
	// 	}
	// }

	return (
		<MenuWrapper>
			<Menu mode="inline" theme="light" onClick={handleClick} selectedKeys={[currentActive]}>
				<Menu.Item icon={<Projects width={20} />} onClick={() => navigate("/")} key="/">
					All Genres
				</Menu.Item>
				{/* <Menu.Item
					icon={<Projects width={20} />}
					onClick={() => navigate("/episode")}
					key="/episode"
				>
					All Episodes
				</Menu.Item>
				<Menu.Item
					icon={<Projects width={20} />}
					onClick={() => navigate("/stream")}
					key="/stream"
				>
					All Streams
				</Menu.Item>
				
				<Menu.Item
					icon={<Projects width={20} />}
					onClick={() => navigate("/genreseries")}
					key="/genreseries"
				>
					All Gerne-Series
				</Menu.Item>
				<Menu.Item
					icon={<Projects width={20} />}
					onClick={() => navigate("/season")}
					key="/season"
				>
					All Seasons
				</Menu.Item>
				<Menu.Item
					icon={<Projects width={20} />}
					onClick={() => navigate("/series")}
					key="/series"
				>
					All Series
				</Menu.Item>
				<Menu.Item
					icon={<Projects width={20} />}
					onClick={() => navigate("/file")}
					key="/file"
				>
					All Files
				</Menu.Item> */}

				<Menu.Item
					icon={<Active width={20} />}
					onClick={() => navigate("/active")}
					key="/active"
				>
					Active
				</Menu.Item>

				<Menu.Item
					icon={<Archive width={20} />}
					onClick={() => navigate("/archived")}
					key="/archived"
				>
					Archived
				</Menu.Item>

				<ButtonWrapper>
					<CustomButton
						onClick={() => createProject()}
						image={PlusIcon}
						title={!collapsed ? "New Genre" : ""}
						collapsed={collapsed}
						className={"add-btn"}
						style={
							!collapsed
								? { padding: "15px 25px", marginLeft: "8%" }
								: { padding: "20px 10px 20px 20px" }
						}
						type="submit"
					/>
				</ButtonWrapper>
			</Menu>
		</MenuWrapper>
	)
}

export default NavMenu
