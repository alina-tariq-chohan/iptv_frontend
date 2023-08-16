import "./App.css"
import axios from "axios"
import React from "react"
import { TextField, Button as MuiButton } from "@material-ui/core"
import { Table, Row, Col, Button as AntDButton } from "antd"
import Logout from "components/shared/Logout"
// import { TopHeaderLeftSide } from "pages/Add/styles"
// import { HomeWrapper, ActionButtonWrapper, SearchInput, ProjectStatus } from "./styles"git push -u

function Genre() {
	const [data, setData] = React.useState([])
	const [editingId, setEditingId] = React.useState(null)
	const [name, setName] = React.useState('')
	const headers = {
		headers: {
			Authorization: `bearer ${localStorage.getItem("token")}`,
		},
	}

	React.useEffect(() => {
		axios.get(process.env.REACT_APP_API_BASE_URL + "/genre", headers).then((response) => {
			setData(response.data)
		})
	}, [])

	const onSubmit = async (e) => {
		e.preventDefault()
		const payload = {
			name: e.target.name.value,
		}

		if (editingId) {
			try {
				await axios.patch(
					`${process.env.REACT_APP_API_BASE_URL}/genre/${editingId}`,
					payload,
					headers
				)
				const genres = await axios.get(
					process.env.REACT_APP_API_BASE_URL + "/genre",
					headers
				)
				setData(genres.data)
				setEditingId(null)
				e.target.name.value = "" // Clear the form
			} catch (error) {
				console.error("Error updating genre:", error)
			}
		} else {
			try {
				await axios.post(process.env.REACT_APP_API_BASE_URL + "/genre", payload, headers)
				const genres = await axios.get(
					process.env.REACT_APP_API_BASE_URL + "/genre",
					headers
				)
				setData(genres.data)
				e.target.name.value = "" // Clear the form
			} catch (error) {
				console.error("Error creating genre:", error)
			}
		}
	}

	const deleteGenre = async (id) => {
		axios
			.delete(`${process.env.REACT_APP_API_BASE_URL}/genre/${id}`, headers)
			.then(async (res) => {
				const genres = await axios.get(
					process.env.REACT_APP_API_BASE_URL + "/genre",
					headers
				)
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
						Edit
					</AntDButton>
					<AntDButton color="primary" onClick={() => deleteGenre(record._id)}>
						Delete
					</AntDButton>
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
					{/* <TopHeaderLeftSide> */}
					<div>
						<Logout />
					</div>
					{/* </TopHeaderLeftSide> */}
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
