import "./App.css"
import axios from "axios"
import React from "react"
import { TextField, Button as MuiButton } from "@material-ui/core"
import { Table, Button as AntDButton } from "antd"

function Genre() {
	const [data, setData] = React.useState([])

	React.useEffect(() => {
		axios.get(process.env.REACT_APP_API_BASE_URL + "/genre").then((response) => {
			setData(response.data)
		})
	}, [])

	const onSubmit = async (event) => {
		// e.preventDefault prevents page from refreshing when form is submitted (default behavior)
		event.preventDefault()
		// This is body of the request, we can send it as a json object
		const payload = {
			name: event.target.name.value,
		}
		axios
			.post(process.env.REACT_APP_API_BASE_URL + "/genre", payload)
			.then(async (res) => {
				const genres = await axios.get(process.env.REACT_APP_API_BASE_URL + "/genre")
				setData(genres.data)
			})
			.catch((err) => {})
			.finally(() => {
				// This is to clear the form after submitting.
				event.target.name.value = ""
			})
	}

	const deleteBook = async (id) => {
		axios
			.delete(`${process.env.REACT_APP_API_BASE_URL}/genre/${id}`)
			.then(async (res) => {
				const genres = await axios.get(process.env.REACT_APP_API_BASE_URL + "/genre")
				setData(genres.data)
			})
			.catch((err) => {})
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
				<AntDButton color="primary" onClick={() => deleteBook(record._id)}>
					Delete
				</AntDButton>
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
			<div style={{ marginTop: "30px" }} />
			<Table columns={columns} dataSource={data} />

			<form onSubmit={onSubmit}>
				<TextField
					style={customStyle}
					type="text"
					label="Name"
					variant="outlined"
					name="name"
					required
				/>
				<MuiButton style={customStyle} variant="contained" color="primary" type="submit">
					save
				</MuiButton>
			</form>
		</div>
	)
}

export default Genre
