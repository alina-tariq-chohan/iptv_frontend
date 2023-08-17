import "./App.css"
import axios from "axios"
import Pencil from "assets/icons/Pencil"
import Trash from "assets/icons/Trash"
import { TextField, Button as MuiButton, Select, MenuItem } from "@material-ui/core"
// import "antd/dist/antd.css"
import { Table, Tag, Popconfirm, Row, Col, Button as AntDButton } from "antd"
import React, { useState } from "react"
import Logout from "components/shared/Logout"

function Episode() {
	const [selectedValue, setSelectedValue] = useState([""])
	const [editingId, setEditingId] = React.useState(null)
	const [name, setName] = React.useState("")
	const [description, setDescription] = React.useState("")
	const [seasonId, setSeasonId] = React.useState("")

	const handleChange = (event) => {
		setSelectedValue(event.target.value)
	}
	const headers = {
		headers: {
			Authorization: `bearer ${localStorage.getItem("token")}`,
		},
	}
	const apiUrl = process.env.REACT_APP_API_BASE_URL

	const [data, setData] = React.useState([])
	const [season, setSeason] = React.useState([])
	React.useEffect(() => {
		// This is to get the list of books from the backend.
		axios
			.get(`${apiUrl}/season`, headers)
			.then((response) => {
				setSeason(response.data)
			})
			.catch((error) => {})
		axios
			.get(`${apiUrl}/episode`, headers)
			.then((response) => {
				setData(response.data)
			})
			.catch((error) => {})
	}, [])
	const onSubmit = async (e) => {
		e.preventDefault()
		const payload = {
			name: e.target.name.value,
			description: e.target.description.value,
			season_id: e.target.season.value,
		}
		try {
			if (editingId) {
				await axios.patch(`${apiUrl}/episode/${editingId}`, payload, headers)
			} else {
				await axios.post(`${apiUrl}/episode`, payload, headers)
			}
			const episodes = await axios.get(`${apiUrl}/episode`, headers)
			setData(episodes.data)
			setEditingId(null)
			e.target.name.value = ""
			e.target.description.value = ""
			e.target.season.value = ""
		} catch (error) {
			console.error(`Error ${editingId ? "updating" : "creating"} episode:`, error)
		}
	}
	const deleteById = async (id) => {
		axios
			.delete(`${apiUrl}/episode/${id}`, headers)
			.then(async (res) => {
				const episodeList = await axios.get(`${apiUrl}/episode`, headers)
				setData(episodeList.data)
			})
			.catch((err) => {})
	}

	const editEpisode = (id) => {
		const episodeToEdit = data.find((episode) => episode._id === id)
		if (episodeToEdit) {
			setEditingId(id)
			setName(episodeToEdit.name)
			setDescription(episodeToEdit.description)
			setSelectedValue(episodeToEdit.season_id)
		}
	}

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Seasons",
			dataIndex: "season",
			key: "season_id",
			render: (_, episode) => {
				const seasonObject = season.find((s) => s._id === episode.season_id)
				const tagColor = seasonObject ? "volcano" : "defaultColor"
				return <Tag color={tagColor}>{seasonObject ? seasonObject.name : "N/A"}</Tag>
			},
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<>
					<AntDButton
						color="primary"
						onClick={() => editEpisode(record._id)}
						style={{ marginRight: "8px" }}
					>
						<Pencil width={20} />
					</AntDButton>
					<Popconfirm
						title="Permanently delete this episode?"
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
				<TextField
					style={customStyle}
					type="text"
					label="Description"
					variant="outlined"
					name="description"
					value={description}
					onChange={(e) => setDescription(e.target.description)}
					required
				/>
				<Select
					name="season"
					value={selectedValue}
					onChange={handleChange}
					style={{ width: 200 }} // Adjust the width value as needed
				>
					<MenuItem value="" disabled>
						Select Season
					</MenuItem>
					{season.map((season, index) => (
						<MenuItem key={index} value={season._id}>
							{season.name}
						</MenuItem>
					))}
				</Select>
				<MuiButton style={customStyle} variant="contained" color="primary" type="submit">
					save
				</MuiButton>
			</form>
		</div>
	)
}

export default Episode
