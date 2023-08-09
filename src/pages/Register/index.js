import React from "react"
import { Form, Input, Button, Space, Spin } from "antd"
import {
	Card,
	Wrapper,
	Heading,
	FormWrapper,
	FlexCenter,
	ForgotPassword,
	ActionLinks,
} from "./styles"
import { useNavigate, Link } from "react-router-dom"
import LogoPrimary from "assets/logos/LogoPrimary"
import { notification } from "antd"

const Register = () => {
	const navigate = useNavigate()
	const [dataLoading, setLoading] = React.useState(false)
	const [form] = Form.useForm()

	const onFinish = async (values) => {
		setLoading(true)
		try {
			const response = await fetch("http://localhost:2001/user/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			})

			if (response.ok) {
				notification["success"]({
					message: "Registered Successfully",
					duration: 2,
				})
				setLoading(false)
				navigate("/login")
			} else {
				const errorData = await response.json()
				notification["error"]({
					message: errorData.message || "Registration Failed",
					duration: 2,
				})
				setLoading(false)
			}
		} catch (error) {
			notification["error"]({
				message: "Error occurred while registering",
				duration: 2,
			})
			setLoading(false)
		}
	}

	React.useEffect(() => {
		form.setFieldsValue({
			first_name: "",
			last_name: "",
			email: "",
			password: "",
		})
	}, [form])

	return (
		<Wrapper>
			<Card>
				<Heading>
					<LogoPrimary width={400} />
				</Heading>
				<FormWrapper>
					<Form form={form} layout="vertical" className="FormWrapper" onFinish={onFinish}>
						<Form.Item
							label="First Name"
							name="first_name"
							rules={[{ required: true, message: "Please input your First Name!" }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Last Name"
							name="last_name"
							rules={[{ required: true, message: "Please input your Last Name!" }]}
						>
							<Input />
						</Form.Item>

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
								<Link to="/login">Already have an account.</Link>
							</ForgotPassword>
							{/* <ForgotPassword>Forgot Password</ForgotPassword> */}
						</ActionLinks>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type="primary" htmlType="submit">
								Register
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
			</Card>
		</Wrapper>
	)
}

export default Register
