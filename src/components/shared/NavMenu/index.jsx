import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Menu } from "antd"
import Projects from "assets/icons/Projects"
import { MenuWrapper } from "./styles"

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
				<Menu.Item
					icon={<Projects width={20} />}
					onClick={() => navigate("/genre")}
					key="/"
				>
					All Genres
				</Menu.Item>

				<Menu.Item
					icon={<Projects width={20} />}
					onClick={() => navigate("/series")}
					key="/series"
				>
					All Series
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
					onClick={() => navigate("/file")}
					key="/file"
				>
					All Files
				</Menu.Item> */}
			</Menu>
		</MenuWrapper>
	)
}

export default NavMenu
