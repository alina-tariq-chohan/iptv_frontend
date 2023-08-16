import "./App.css"
import axios from "axios"
import { TextField, Button as MuiButton, Select, MenuItem } from "@material-ui/core"
// import "antd/dist/antd.css"
import { Table, Tag, Button as AntDButton } from "antd"
import React, { useState } from "react"

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
	const [data, setData] = React.useState([])
	const [season, setSeason] = React.useState([])
	React.useEffect(() => {
		// This is to get the list of books from the backend.
		axios
			.get(process.env.REACT_APP_API_BASE_URL + "/season", headers)
			.then((response) => {
				// Once we get the list of books, we need to set the state of the component with the list of books.
				setSeason(response.data)
			})
			.catch((error) => {})
		axios
			.get(process.env.REACT_APP_API_BASE_URL + "/episode", headers)
			.then((response) => {
				// Once we get the list of books, we need to set the state of the component with the list of books.
				setData(response.data)
			})
			.catch((error) => {})
	}, [])
	const onSubmit = async (e) => {
		// e.preventDefault prevents page from refreshing when form is submitted (default behavior)
		e.preventDefault()
		// This is body of the request, we can send it as a json object
		const payload = {
			name: e.target.name.value,
			description: e.target.description.value,
			season_id: e.target.season.value,
		}

		if (editingId) {
			try {
				await axios.patch(
					`${process.env.REACT_APP_API_BASE_URL}/episode/${editingId}`,
					payload,
					headers
				)
				const episodes = await axios.get(
					process.env.REACT_APP_API_BASE_URL + "/episode",
					headers
				)
				setData(episodes.data)
				setEditingId(null)
				e.target.name.value = "" // Clear the form
				e.target.description.value = ""
				e.target.season.value = ""
			} catch (error) {
				console.error("Error updating episode:", error)
			}
		} else {
			try {
				await axios
					.post(process.env.REACT_APP_API_BASE_URL + "/episode", payload, headers)
					.then(async (res) => {
						// Once the book is added, we need to get the list of books
						const episodeList = await axios.get(
							process.env.REACT_APP_API_BASE_URL + "/episode",
							headers
						)
						setData(episodeList.data)
					})
					.catch((err) => {})
					.finally(() => {
						// This is to clear the form after submitting.
						e.target.name.value = ""
						e.target.description.value = ""
						e.target.season.value = ""
					})
			} catch (error) {
				console.error("Error creating episode:", error)
			}
		}
	}
	const deleteById = async (id) => {
		// This is to delete the book from the list.
		axios
			.delete(`${process.env.REACT_APP_API_BASE_URL}/episode/${id}`, headers)
			.then(async (res) => {
				// Once the book is deleted, we need to get the list of books
				const episodeList = await axios.get(
					process.env.REACT_APP_API_BASE_URL + "/episode",
					headers
				)
				// And render the list of books in the UI. I am reassigning the state with the new list of books
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
			setSelectedValue(episodeToEdit.episode_id)
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
					onChange={(e) => setDescription(e.target.description.value)}
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
