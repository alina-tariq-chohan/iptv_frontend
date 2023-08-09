import React, { useEffect, useState, useRef } from "react"
import { Input, Row, Spin, Space, notification } from "antd"
import {
	AddProjectIcon,
	AddProjectWrapper,
	InputWrapper,
	TopHeaderWrapper,
	TopHeaderLeftSide,
	BodyWrapper,
	Title,
} from "./styles"
// import TextArea from "antd/lib/input/TextArea"
import NewProject from "assets/icons/NewProject"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import ArrowLeft from "assets/icons/ArrowLeft"
import Logout from "components/shared/Logout"
import { generateId } from "services/CommonMethods"

const AddProduct = (props) => {
	const [dataLoading, setLoading] = React.useState(false)
	const [values, setValues] = useState({
		name: "",
		// description: "",
	})

	const { id } = useParams()

	const location = useLocation()
	const navigate = useNavigate()
	const headingRef = useRef()

	useEffect(() => {
		GetProductDetails(id)
	}, [id])

	const onFinish = () => {
		if (!values.name) {
			notification["error"]({
				message: "Name is required...!",
				duration: 2,
			})
			return
		}
		editAProduct(id, values)
	}

	function GetProductDetails(id) {
		setLoading(true)
		const products = JSON.parse(localStorage.getItem("projects"))
		const product = products.find((i) => i.id === id)

		if (product) {
			setValues(product)
		} else {
			notification["error"]({
				message: "Product Not Found, now it will ",
				duration: 2,
			})
		}
		setLoading(false)
	}

	const editAProduct = (id, data) => {
		if (id) {
			const projects = JSON.parse(localStorage.getItem("projects"))
			const project = projects.find((i) => i.id === id)

			if (!project) {
				createProject(data)
			} else {
				setLoading(true)
				const index = projects.findIndex((i) => i.id === id)
				projects[index] = { ...project, ...data }
				localStorage.setItem("projects", JSON.stringify(projects))
				notification["success"]({
					message: "Project edited successfully",
					duration: 2,
				})
				setLoading(false)
			}
		} else {
			createProject(data)
		}
	}

	const createProject = (data) => {
		setLoading(true)
		const projects = JSON.parse(localStorage.getItem("projects"))
		const project = {
			id: generateId(projects),
			user_id: localStorage.getItem("token"),
			last_modified_by: localStorage.getItem("token"),
			status: "active",
			...values,
		}
		projects.push(project)
		localStorage.setItem("projects", JSON.stringify(projects))
		notification["success"]({
			message: "Project created successfully",
			duration: 2,
		})
		navigate(`/project/${project.id}`, { state: { isNewProject: true } })
	}

	return (
		<>
			<AddProjectWrapper>
				<Row align="center" className="top-row">
					<TopHeaderWrapper>
						<TopHeaderLeftSide>
							<span className="back-arrow" onClick={() => navigate("/")}>
								<ArrowLeft width={60} />
							</span>

							<AddProjectIcon>
								<NewProject width={35} />
							</AddProjectIcon>
							<Title>Add/Edit Project</Title>
						</TopHeaderLeftSide>
						<div>
							<Logout />
						</div>
					</TopHeaderWrapper>
				</Row>

				<BodyWrapper>
					<InputWrapper>
						<Input
							autoFocus={location.state?.isNewProject ? true : false}
							placeholder="Project name"
							className="project-heading"
							ref={headingRef}
							maxLength={128}
							value={values.name}
							showCount={false}
							onChange={(e) => {
								setValues({ ...values, name: e.target.value })
							}}
							onBlur={onFinish}
						/>

						{/* <TextArea
							cols={30}
							value={values.description}
							rows={4}
							className="project-description"
							placeholder="Project description"
							maxLength={1024}
							showCount={false}
							onBlur={onFinish}
							onChange={(e) => {
								setValues({ ...values, description: e.target.value })
							}}
						/> */}
					</InputWrapper>

					{dataLoading && (
						<Space size="medium">
							<Spin size="medium" />
						</Space>
					)}
				</BodyWrapper>
			</AddProjectWrapper>
		</>
	)
}

export default AddProduct
