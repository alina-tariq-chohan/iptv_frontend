import { Button, Modal } from "antd"
import React from "react"
import theme from "styles/Theme"

const CustomModal = ({ title, visible, onCancel, onOk, button1, button2, children, loading }) => {
	return (
		<Modal
			title={title}
			open={visible}
			// onOk={onOk}
			footer={[
				<Button
					key="submit"
					type="primary"
					loading={loading ? loading : false}
					onClick={() => onOk()}
					style={{
						backgroundColor: theme.colors.black,
						borderColor: theme.colors.black,
					}}
				>
					{button1 ? button1 : "Ok"}
				</Button>,
				<Button key="back" type="ghost" onClick={() => onCancel()}>
					{button2 ? button2 : "Cancel"}
				</Button>,
			]}
			onCancel={onCancel}
		>
			{children}
		</Modal>
	)
}

export default CustomModal
