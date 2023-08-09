import React, { useState, useEffect } from "react"
import { Table, Popconfirm, Form, Typography, Tooltip, Row, Col, Input } from "antd"
import EditableCell from "components/utility/EditableCell"
import Pencil from "assets/icons/Pencil"
import { HomeWrapper, ActionButtonWrapper, SearchInput, ProjectStatus } from "./styles"
import { Link, useLocation } from "react-router-dom"
import Trash from "assets/icons/Trash"
import Archive from "assets/icons/Archive"
import moment from "moment"
import Logout from "components/shared/Logout"
import { TopHeaderLeftSide } from "pages/Genre/styles"
import Duplicate from "assets/icons/Duplicate"
import { notification } from "antd"
import { generateId } from "services/CommonMethods"

const EditableTable = () => {
	const [tableData, setTableData] = React.useState([])
	const [dataLoading, setLoading] = React.useState(false)
	const [search, setSearch] = useState("")
	const [form] = Form.useForm()
	const [editingKey, setEditingKey] = useState("")
	const [filteredProjects, setFilteredProjects] = useState([])
	const isEditing = (record) => record.id === editingKey
	const [isCopiedSuccess, setIsCopiedSuccess] = useState(false)
	const [pagination, setPagination] = useState({
		current: 1,
	})

	const { pathname } = useLocation()

	useEffect(() => {
		GetAllProjects()
	}, [])

	useEffect(() => {
		if (search === "") GetAllProjects()
	}, [search])

	useEffect(() => {
		if (tableData?.length > 0) {
			if (search) {
				let result = tableData?.filter(
					(project) =>
						project?.name?.toUpperCase().includes(search.toUpperCase()) ||
						project?.description?.toUpperCase().includes(search.toUpperCase())
				)
				setFilteredProjects(result)
			}
		}
	}, [search, tableData])

	useEffect(() => {
		if (tableData.length > 0 && isCopiedSuccess) {
			const latestProject = tableData.at(-1)
			edit(latestProject)
		}
	}, [tableData])

	function GetAllProjects() {
		setLoading(true)
		const projects = JSON.parse(localStorage.getItem("projects"))
		setTableData(projects)
		setLoading(false)
	}

	const edit = (record) => {
		form.setFieldsValue({
			name: "",
			description: "",
			...record,
		})
		setEditingKey(record.id)
	}

	const cancel = () => {
		setEditingKey("")
		setIsCopiedSuccess(false)
	}

	const deleteProject = (id) => {
		setLoading(true)
		const projects = JSON.parse(localStorage.getItem("projects"))
		const filteredProject = projects.filter((i) => i.id !== id)
		localStorage.setItem("projects", JSON.stringify(filteredProject))
		GetAllProjects()
		notification["success"]({
			message: "Project deleted successfully",
			duration: 2,
		})
	}

	const save = async (id) => {
		setIsCopiedSuccess(false)
		try {
			const data = await form.validateFields()
			editAProject(id, data)
			setEditingKey("")
		} catch (errInfo) {
			console.log("Validate Failed:", errInfo)
		}
	}

	const editAProject = (id, data) => {
		setLoading(true)
		const projects = JSON.parse(localStorage.getItem("projects"))
		const project = projects.find((i) => i.id === id)

		if (!project) {
			notification["error"]({
				message: "Project Not Found",
				duration: 2,
			})
			setLoading(false)
		} else {
			const index = projects.findIndex((i) => i.id === id)
			projects[index] = { ...project, ...data }
			localStorage.setItem("projects", JSON.stringify(projects))
			notification["success"]({
				message: "Project edited successfully",
				duration: 2,
			})
			GetAllProjects()
		}
	}

	function CopyProject(projectID, setPagination, setIsCopiedSuccess) {
		setLoading(true)
		const projects = JSON.parse(localStorage.getItem("projects"))
		const project = projects.find((i) => i.id === projectID)
		projects.push({
			...project,
			id: generateId(projects),
			name: `${project.name} Copy`,
		})
		localStorage.setItem("projects", JSON.stringify(projects))
		GetAllProjects()
		setPagination({ current: 1 })
		setIsCopiedSuccess(true)
		notification["success"]({
			message: "Project copied successfully",
			duration: 2,
		})
	}

	// Show full text in tooltip
	const handleShowFullText = (text) => {
		if (text?.length > 70) {
			return (
				<Tooltip placement="topLeft" title={text}>
					{text}
				</Tooltip>
			)
		} else {
			return text
		}
	}

	const handlePagination = (page) => {
		setPagination({
			current: page,
		})
	}

	const handleCopyProject = (projectID) => {
		setIsCopiedSuccess(false)
		CopyProject(projectID, setPagination, setIsCopiedSuccess)
	}

	const columns = [
		{
			title: "Project",
			dataIndex: "name",
			width: "20%",
			editable: true,
			sorter: (a, b) => a.name?.localeCompare(b.name),
			ellipsis: {
				showTitle: false,
			},
			render: (_, project) => (
				<Link to={`/project/${project?.id}`} className="project-name">
					{handleShowFullText(project?.name)}
				</Link>
			),
		},
		{
			title: "Description",
			dataIndex: "description",
			width: "40%",
			editable: true,
			sorter: (a, b) => a.description?.localeCompare(b.description),
			ellipsis: {
				showTitle: false,
			},
			render: (description) => handleShowFullText(description),
		},
		{
			title: "Status",
			dataIndex: "status",
			width: "10%",
			editable: false,
			sorter: (a, b) => a.status?.localeCompare(b.status),
			render: (status) => <ProjectStatus>{status}</ProjectStatus>,
		},
		{
			title: "Last modified",
			dataIndex: "last_modified_date",
			width: "15%",
			editable: false,
			sorter: (a, b) => a.last_modified_date?.localeCompare(b.last_modified_date),
			defaultSortOrder: "descend",
			render: (_, project) => (
				<span>{moment(project?.last_modified_date).format("MM/DD/YYYY HH:mm")}</span>
			),
		},
		{
			title: "",
			width: "15%",
			dataIndex: "operation",
			render: (_, project) => {
				const editable = isEditing(project)
				return editable ? (
					<span>
						<Typography.Link onClick={() => save(project.id)}>Save</Typography.Link>
						<span className="edit-cancel-btn" onClick={cancel}>
							Cancel
						</span>
					</span>
				) : (
					<ActionButtonWrapper>
						<Typography.Link disabled={editingKey !== ""} onClick={() => edit(project)}>
							<Tooltip placement="bottom" title="Edit">
								<Pencil width={20} />
							</Tooltip>
						</Typography.Link>

						<Popconfirm
							title="Permanently delete this project?"
							okText="Delete"
							onConfirm={() => deleteProject(project.id)}
						>
							<Typography.Link disabled={editingKey !== ""}>
								<Tooltip placement="bottom" title="Delete">
									<Trash width={20} />
								</Tooltip>
							</Typography.Link>
						</Popconfirm>

						<Typography.Link
							onClick={() =>
								editAProject(project.id, {
									status:
										project?.status?.toLowerCase() === "active"
											? "Archived"
											: "Active",
								})
							}
						>
							<Tooltip
								placement="bottom"
								title={
									project?.status?.toLowerCase() === "active"
										? "Archive"
										: "Activate"
								}
							>
								<Archive width={20} />
							</Tooltip>
						</Typography.Link>

						<Typography.Link onClick={() => handleCopyProject(project?.id)}>
							<Tooltip placement="bottom" title="Copy">
								<Duplicate width={20} />
							</Tooltip>
						</Typography.Link>
					</ActionButtonWrapper>
				)
			},
		},
	]

	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col
		}

		return {
			...col,
			onCell: (record) => ({
				record,
				inputType: col.dataIndex === "description" ? "textarea" : "text",
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		}
	})

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			setLoading(true)
			let projects = JSON.parse(localStorage.getItem("projects"))
			const filteredProject = projects.filter(
				(i) =>
					i.name.toLowerCase().includes(search.toLowerCase()) ||
					i.description.toLowerCase().includes(search.toLowerCase())
			)
			setLoading(false)
			setTableData(filteredProject)
		}
	}

	return (
		<HomeWrapper>
			<Row justify="end">
				<Col style={{ marginRight: 30 }}>
					<TopHeaderLeftSide>
						<SearchInput>
							<Input
								onChange={(e) => {
									console.log(e.target.value)
									setSearch(e.target.value)
								}}
								onKeyPress={handleKeyPress}
								type="text"
								placeholder="Search projects"
								id="header-search"
							/>
						</SearchInput>
						<div>
							<Logout />
						</div>
					</TopHeaderLeftSide>
				</Col>
			</Row>
			<Form form={form} component={false}>
				<Table
					rowKey={"id"}
					loading={dataLoading}
					components={{
						body: {
							cell: EditableCell,
						},
					}}
					dataSource={
						filteredProjects?.length > 0 && search !== ""
							? filteredProjects
							: pathname.slice(1) === "active"
							? tableData.filter(
									(project) => project?.status?.toLowerCase() === "active"
							  )
							: pathname.slice(1) === "archived"
							? tableData.filter(
									(project) => project?.status?.toLowerCase() === "archived"
							  )
							: tableData
					}
					columns={mergedColumns}
					pagination={{
						onChange: () => {
							cancel()
							handlePagination()
						},
						defaultPageSize: 15,
						current: pagination.current,
					}}
				/>
			</Form>
		</HomeWrapper>
	)
}
export default EditableTable
