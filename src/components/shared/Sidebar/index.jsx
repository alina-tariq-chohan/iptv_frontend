import React, { useState } from "react"
import { Layout } from "antd"
import { useNavigate } from "react-router-dom"
import NavMenu from "../NavMenu"
import { LogoWrapper } from "./styles"
import theme from "styles/Theme"
import LogoSecondary from "assets/logos/LogoSecondary"
import LogoPrimary from "assets/logos/LogoPrimary"

const { Sider } = Layout

const Sidebar = () => {
	const [collapsed, setCollapsed] = useState(false)
	const navigate = useNavigate()

	return (
		<Sider
			collapsible
			width={220}
			collapsedWidth={80}
			collapsed={collapsed}
			onCollapse={(c) => setCollapsed(c)}
			theme="light"
			style={{
				paddingLeft: 10,
				paddingRight: 10,
				borderRight: `1px solid ${theme.colors.border}`,
			}}
		>
			<LogoWrapper onClick={() => navigate("/")}>
				{collapsed ? <LogoSecondary width={55} /> : <LogoPrimary width={190} />}
			</LogoWrapper>

			<NavMenu collapsed={collapsed} />
		</Sider>
	)
}

export default Sidebar
