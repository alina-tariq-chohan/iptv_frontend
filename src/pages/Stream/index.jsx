import "./App.css"
import axios from "axios"
import { Button as MuiButton, Select, MenuItem } from "@material-ui/core"
// import "antd/dist/antd.css"
import { Table, Tag, Button as AntDButton } from "antd"
import React, { useState } from "react"

function Stream() {
	const [selectedValue, setSelectedValue] = useState([""])
	const [editingId, setEditingId] = React.useState(null)

	const handleChange = (event) => {
		setSelectedValue(event.target.value)
	}
	const [data, setData] = React.useState([])
	const [episode, setEpisode] = React.useState([])
	const headers = {
		headers: {
			Authorization: `bearer ${localStorage.getItem("token")}`,
		},
	}
	React.useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_BASE_URL + "/episode", headers)
			.then((response) => {
				setEpisode(response.data)
			})
			.catch((error) => {})
		axios
			.get(process.env.REACT_APP_API_BASE_URL + "/stream", headers)
			.then((response) => {
				setData(response.data)
			})
			.catch((error) => {})
	}, [])
	const onSubmit = async (e) => {
		// e.preventDefault prevents page from refreshing when form is submitted (default behavior)
		e.preventDefault()
		// This is body of the request, we can send it as a json object
		const payload = {
			episode_id: e.target.episode.value,
		}
		axios
			.post(process.env.REACT_APP_API_BASE_URL + "/stream", payload, headers)
			.then(async (res) => {
				// Once the book is added, we need to get the list of books
				const streamList = await axios.get(
					process.env.REACT_APP_API_BASE_URL + "/stream",
					headers
				)
				setData(streamList.data)
			})
			.catch((err) => {})
			.finally(() => {
				// This is to clear the form after submitting.
				e.target.episode.value = ""
			})
	}
	const deleteById = async (id) => {
		// This is to delete the book from the list.
		axios
			.delete(`${process.env.REACT_APP_API_BASE_URL}/stream/${id}`, headers)
			.then(async (res) => {
				// Once the book is deleted, we need to get the list of books
				const streamList = await axios.get(
					process.env.REACT_APP_API_BASE_URL + "/stream",
					headers
				)
				// And render the list of books in the UI. I am reassigning the state with the new list of books
				setData(streamList.data)
			})
			.catch((err) => {})
	}

	const editStream = (id) => {
		const streamToEdit = data.find((stream) => stream._id === id)
		if (streamToEdit) {
			setEditingId(id)
			setSelectedValue(streamToEdit.episode_id)
		}
	}

	const columns = [
		{
			title: "Episodes",
			dataIndex: "episode",
			key: "episode_id",
			render: (_, stream) => {
				const episodeObject = episode.find((s) => s._id === stream.episode_id)
				const tagColor = episodeObject ? "volcano" : "defaultColor"
				return <Tag color={tagColor}>{episodeObject ? episodeObject.name : "N/A"}</Tag>
			},
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<>
					<AntDButton
						color="primary"
						onClick={() => editStream(record._id)}
						style={{ marginRight: "8px" }}
					>
						Edit
					</AntDButton>
					<AntDButton color="primary" onClick={() => deleteById(record._id)}>
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
			<div style={{ marginTop: "30px" }} />
			<Table columns={columns} dataSource={data} />
			<form onSubmit={onSubmit}>
				<Select
					name="episode"
					value={selectedValue}
					onChange={handleChange}
					style={{ width: 200 }} // Adjust the width value as needed
				>
					<MenuItem value="" disabled>
						Select Episode
					</MenuItem>
					{episode.map((episode, index) => (
						<MenuItem key={index} value={episode._id}>
							{episode.name}
						</MenuItem>
					))}
				</Select>
				<MuiButton style={customStyle} variant="contained" color="primary" type="submit">
					{editingId ? "Update" : "Save"}
				</MuiButton>
			</form>
		</div>
	)
}

export default Stream
