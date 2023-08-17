import "./App.css"
import axios from "axios"
import Pencil from "assets/icons/Pencil"
import Trash from "assets/icons/Trash"
import { Button as MuiButton, Select, MenuItem } from "@material-ui/core"
// import "antd/dist/antd.css"
import { Table, Tag, Popconfirm, Row, Col, Button as AntDButton } from "antd"
import React, { useState } from "react"
import Logout from "components/shared/Logout"

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
	const apiUrl = process.env.REACT_APP_API_BASE_URL

	React.useEffect(() => {
		axios
			.get(`${apiUrl}/episode`, headers)
			.then((response) => {
				setEpisode(response.data)
			})
			.catch((error) => {})
		axios
			.get(`${apiUrl}/stream`, headers)
			.then((response) => {
				setData(response.data)
			})
			.catch((error) => {})
	}, [])
	const onSubmit = async (e) => {
		e.preventDefault()
		const payload = {
			episode_id: e.target.episode.value,
		}
		try {
			if (editingId) {
				await axios.patch(`${apiUrl}/stream/${editingId}`, payload, headers)
			} else {
				await axios.post(`${apiUrl}/stream`, payload, headers)
			}
			const episodes = await axios.get(`${apiUrl}/stream`, headers)
			setData(episodes.data)
			setEditingId(null)
			// Clear the form
			e.target.episode.value = ""
		} catch (error) {
			console.error(`Error ${editingId ? "updating" : "creating"} stream:`, error)
		}
	}
	const deleteById = async (id) => {
		axios
			.delete(`${apiUrl}/stream/${id}`, headers)
			.then(async (res) => {
				const streamList = await axios.get(`${apiUrl}/stream`, headers)
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
						<Pencil width={20} />
					</AntDButton>
					<Popconfirm
						title="Permanently delete this genre?"
						okText="Delete"
						onConfirm={() => deleteById(record._id)}
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
