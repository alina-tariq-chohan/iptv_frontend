import React from "react"
import { Form, Input, Button, Space, Spin, notification } from "antd"
import { LoginCard, LoginWrapper, LoginHeading, FormWrapper, FlexCenter } from "./styles"
import { ForgotPassword, ActionLinks } from "pages/Register/styles"
import { useNavigate, Link } from "react-router-dom"
import LogoPrimary from "assets/logos/LogoPrimary"

const Login = () => {
	const navigate = useNavigate()
	const [dataLoading, setLoading] = React.useState(false)
	const [form] = Form.useForm()

	const onFinish = async (values) => {
		setLoading(true)
		try {
			const response = await fetch("http://localhost:2001/user/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			})

			if (response.ok) {
				const data = await response.json()
				localStorage.setItem("token", data.data.token)
				notification["success"]({
					message: "Logged in",
					duration: 2,
				})
				setLoading(false)
				navigate("/")
			} else {
				const errorData = await response.json()
				notification["error"]({
					message: errorData.message || "Login Failed",
					duration: 2,
				})
				setLoading(false)
			}
		} catch (error) {
			notification["error"]({
				message: "Error occurred while logging in",
				duration: 2,
			})
			setLoading(false)
		}
	}

	React.useEffect(() => {
		form.setFieldsValue({
			email: "",
			password: "",
		})
	}, [form])

	return (
		<LoginWrapper>
			<LoginCard>
				<LoginHeading>
					<LogoPrimary width={400} />
				</LoginHeading>
				<FormWrapper>
					<Form form={form} layout="vertical" className="FormWrapper" onFinish={onFinish}>
						<Form.Item
							label="Name / Email ID"
							name="email"
							rules={[{ required: true, message: "Please input your Email!" }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[{ required: true, message: "Please input your password!" }]}
						>
							<Input.Password />
						</Form.Item>

						<ActionLinks>
							<ForgotPassword>
								<Link to="/register">Create a new account</Link>
							</ForgotPassword>
						</ActionLinks>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type="primary" htmlType="submit">
								Login
							</Button>
						</Form.Item>
					</Form>
				</FormWrapper>
				{dataLoading && (
					<FlexCenter>
						<Space size="medium">
							<Spin size="medium" />
						</Space>
					</FlexCenter>
				)}
			</LoginCard>
		</LoginWrapper>
	)
}

export default Login
