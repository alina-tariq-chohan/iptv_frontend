import "./App.css"
import axios from "axios"
import React from "react"
import Pencil from "assets/icons/Pencil"
import Trash from "assets/icons/Trash"
import { TextField, Button as MuiButton } from "@material-ui/core"
import { Table, Popconfirm, Row, Col, Button as AntDButton } from "antd"
import Logout from "components/shared/Logout"
// import { TopHeaderLeftSide } from "pages/Add/styles"
// import { HomeWrapper, ActionButtonWrapper, SearchInput, ProjectStatus } from "./styles"git push -u

function Genre() {
	const [data, setData] = React.useState([])
	const [editingId, setEditingId] = React.useState(null)
	const [name, setName] = React.useState("")
	const headers = {
		headers: {
			Authorization: `bearer ${localStorage.getItem("token")}`,
		},
	}

	const apiUrl = process.env.REACT_APP_API_BASE_URL

	React.useEffect(() => {
		axios.get(`${apiUrl}/genre`, headers).then((response) => {
			setData(response.data)
		})
	}, [])

	const onSubmit = async (e) => {
		e.preventDefault()
		const payload = {
			name: e.target.name.value,
		}

		try {
			if (editingId) {
				await axios.patch(`${apiUrl}/genre/${editingId}`, payload, headers)
			} else {
				await axios.post(`${apiUrl}/genre`, payload, headers)
			}

			const genresResponse = await axios.get(`${apiUrl}/genre`, headers)
			setData(genresResponse.data)
			setEditingId(null)
			e.target.name.value = "" // Clear the form
		} catch (error) {
			console.error(`Error ${editingId ? "updating" : "creating"} genre:`, error)
		}
	}

	const deleteGenre = async (id) => {
		axios
			.delete(`${apiUrl}/genre/${id}`, headers)
			.then(async (res) => {
				const genres = await axios.get(`${apiUrl}/genre`, headers)
				setData(genres.data)
			})
			.catch((err) => {})
	}

	const editGenre = (id) => {
		const genreToEdit = data.find((genre) => genre._id === id)
		if (genreToEdit) {
			setEditingId(id)
			setName(genreToEdit.name)
		}
	}

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<>
					<AntDButton
						color="primary"
						onClick={() => editGenre(record._id)}
						style={{ marginRight: "8px" }}
					>
						<Pencil width={20} />
					</AntDButton>
					<Popconfirm
						title="Permanently delete this genre?"
						okText="Delete"
						onConfirm={() => deleteGenre(record._id)}
					>
						<AntDButton color="primary">
							<Trash width={20} />
						</AntDButton>
					</Popconfirm>
				</>
			),
		},
	]

	const customStyle = {
		margin: "5px",
		marginTop: "10px",
		marginBottom: "10px",
		width: "100%",
		height: "50px",
		borderRadius: "5px",
		fontSize: "16px",
	}

	return (
		<div>
			<Row justify="end">
				<Col style={{ marginRight: 30 }}>
					<div>
						<Logout />
					</div>
				</Col>
			</Row>
			<div style={{ marginTop: "30px" }} />
			<Table columns={columns} dataSource={data} />

			<form onSubmit={onSubmit}>
				<TextField
					style={customStyle}
					type="text"
					label="Name"
					variant="outlined"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.name.value)}
					required
				/>
				<MuiButton style={customStyle} variant="contained" color="primary" type="submit">
					{editingId ? "Update" : "Save"}
				</MuiButton>
			</form>
		</div>
	)
}

export default Genre
