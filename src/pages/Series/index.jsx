import "./App.css"
import axios from "axios"
import Pencil from "assets/icons/Pencil"
import Trash from "assets/icons/Trash"
import { TextField, Button as MuiButton, InputLabel, Select, MenuItem } from "@material-ui/core"
// import "antd/dist/antd.css"
import { Table, Popconfirm, Row, Col, Button as AntDButton, Tag } from "antd"
import React, { useState } from "react"
import Logout from "components/shared/Logout"

function Series() {
	const [selectedValue, setSelectedValue] = useState([""])
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [genreId, setGenreId] = useState("")

	const handleChange = (event) => {
		setSelectedValue(event.target.value)
	}

	const [data, setData] = React.useState([])
	const [genres, setGenre] = React.useState([])
	const [editingId, setEditingId] = React.useState(null)

	const headers = {
		headers: {
			Authorization: `bearer ${localStorage.getItem("token")}`,
		},
	}
	const apiUrl = process.env.REACT_APP_API_BASE_URL

	React.useEffect(() => {
		axios
			.get(`${apiUrl}/genre`, headers)
			.then((response) => {
				setGenre(response.data)
			})
			.catch((error) => {})
		axios
			.get(`${apiUrl}/series`, headers)
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
			genres: e.target.genres.value.split(",").filter((i) => i),
		}
		try {
			if (editingId) {
				await axios.patch(`${apiUrl}/series/${editingId}`, payload, headers)
			} else {
				await axios.post(`${apiUrl}/series`, payload, headers).then(async (res) => {
					const seriesList = await axios.get(`${apiUrl}/series`, headers)
					const a = seriesList.data.map((i) => (i.genres = i.genres.name.join(", ")))
					setData(a)
				})
			}
			const series = await axios.get(`${apiUrl}/series`, headers)
			setData(series.data)
			setEditingId(null)
			e.target.name.value = ""
			e.target.description.value = ""
			e.target.genres.value = ""
		} catch (error) {
			console.error(`Error ${editingId ? "updating" : "creating"} series:`, error)
		}
	}

	const deleteSeries = async (id) => {
		axios
			.delete(`${apiUrl}/series/${id}`, headers)
			.then(async (res) => {
				const seriesList = await axios.get(`${apiUrl}/series`, headers)
				setData(seriesList.data)
			})
			.catch((err) => {})
	}

	const editSeries = (id) => {
		const seriesToEdit = data.find((series) => series._id === id)
		if (seriesToEdit) {
			setEditingId(id)
			setName(seriesToEdit.name)
			setDescription(seriesToEdit.description)
			setSelectedValue(seriesToEdit.genres.map((i) => i._id))
		}
	}

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
		},
		{
			title: "Description",
			dataIndex: "description",
		},
		{
			title: "Genres",
			dataIndex: "genres",
			key: "genres",
			render: (_, { genres }) => (
				<>
					{genres?.map((tag) => {
						return (
							<Tag color={"volcano"} key={tag._id}>
								{tag.name}
							</Tag>
						)
					})}
				</>
			),
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<>
					<AntDButton
						color="primary"
						onClick={() => editSeries(record._id)}
						style={{ marginRight: "8px" }}
					>
						<Pencil width={20} />
					</AntDButton>
					<Popconfirm
						title="Permanently delete this series?"
						okText="Delete"
						onConfirm={() => deleteSeries(record._id)}
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
				{/* <input
					// onChange={}
					// accept={}
					// className={}
					id="file-upload"
					type="file"
				/>
				<input
					// onChange={}
					// accept={}
					// className={}
					id="file-upload"
					type="file"
				/> */}

				<Select
					name="genres"
					value={selectedValue}
					onChange={handleChange}
					multiple
					style={{ width: 200 }} // Adjust the width value as needed
				>
					<MenuItem value="" disabled>
						Select Genre
					</MenuItem>
					{genres.map((genre, index) => (
						<MenuItem key={index} value={genre?._id}>
							{genre.name}
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

export default Series
