import { Menu, Dropdown, Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

const Logout = () => {
	const navigate = useNavigate()

	let menu = (
		<Menu>
			<Menu.Item
				key="0"
				onClick={() => {
					localStorage.removeItem("token")
					navigate("/login")
				}}
			>
				Logout
			</Menu.Item>
		</Menu>
	)
	return (
		<div style={{ marginRight: 20 }}>
			<Dropdown overlay={menu} trigger={["hover"]}>
				<Avatar size={32} icon={<UserOutlined />} />
			</Dropdown>
		</div>
	)
}

export default Logout
