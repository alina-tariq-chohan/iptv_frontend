import "./App.css"
import axios from "axios"
import Pencil from "assets/icons/Pencil"
import Trash from "assets/icons/Trash"
import { TextField, Button as MuiButton, Select, MenuItem } from "@material-ui/core"
// import "antd/dist/antd.css"
import { Table, Tag, Popconfirm, Row, Col, Button as AntDButton } from "antd"
import React, { useState } from "react"
import Logout from "components/shared/Logout"

function Season() {
	const [selectedValue, setSelectedValue] = useState([""])
	const [editingId, setEditingId] = React.useState(null)
	const [name, setName] = React.useState("")
	const [description, setDescription] = React.useState("")
	const [seriesId, setSeriesId] = React.useState("")

	const headers = {
		headers: {
			Authorization: `bearer ${localStorage.getItem("token")}`,
		},
	}
	const handleChange = (event) => {
		setSelectedValue(event.target.value)
	}
	const [data, setData] = React.useState([])
	const [series, setSeries] = React.useState([])
	React.useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_BASE_URL + "/series", headers)
			.then((response) => {
				setSeries(response.data)
			})
			.catch((error) => {})
		axios
			.get(process.env.REACT_APP_API_BASE_URL + "/season", headers)
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
			name: e.target.name.value,
			description: e.target.description.value,
			series_id: e.target.series.value,
		}
		if (editingId) {
			try {
				await axios.patch(
					`${process.env.REACT_APP_API_BASE_URL}/season/${editingId}`,
					payload,
					headers
				)
				const seasons = await axios.get(
					process.env.REACT_APP_API_BASE_URL + "/season",
					headers
				)
				setData(seasons.data)
				setEditingId(null)
				e.target.name.value = "" // Clear the form
				e.target.description.value = ""
				setSelectedValue([""])
			} catch (error) {
				console.error("Error updating seasons:", error)
			}
		} else {
			try {
				await axios
					.post(process.env.REACT_APP_API_BASE_URL + "/season", payload, headers)
					.then(async (res) => {
						const seasonList = await axios.get(
							process.env.REACT_APP_API_BASE_URL + "/season",
							headers
						)
						setData(seasonList.data)
					})
					.catch((err) => {})
					.finally(() => {
						// This is to clear the form after submitting.
						e.target.name.value = ""
						e.target.description.value = ""
						e.target.series.value = ""
					})
			} catch (error) {
				console.error("Error creating season:", error)
			}
		}
	}
	const deleteById = async (id) => {
		axios
			.delete(`${process.env.REACT_APP_API_BASE_URL}/season/${id}`, headers)
			.then(async (res) => {
				const seasonList = await axios.get(
					process.env.REACT_APP_API_BASE_URL + "/season",
					headers
				)
				setData(seasonList.data)
			})
			.catch((err) => {})
	}

	const editSeason = (id) => {
		const seasonToEdit = data.find((season) => season._id === id)
		if (seasonToEdit) {
			setEditingId(id)
			setName(seasonToEdit.name)
			setDescription(seasonToEdit.description)
			setSelectedValue(seasonToEdit.series_id)
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
			title: "Series",
			dataIndex: "series",
			key: "series_id",
			render: (_, season) => {
				const seriesObject = series.find((s) => s._id === season.series_id)
				const tagColor = seriesObject ? "volcano" : "defaultColor"
				return <Tag color={tagColor}>{seriesObject ? seriesObject.name : "N/A"}</Tag>
			},
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<>
					<AntDButton
						color="primary"
						onClick={() => editSeason(record._id)}
						style={{ marginRight: "8px" }}
					>
						<Pencil width={20} />
					</AntDButton>
					<Popconfirm
						title="Permanently delete this season?"
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
					name="series"
					value={selectedValue}
					onChange={handleChange}
					style={{ width: 200 }} // Adjust the width value as needed
				>
					<MenuItem value="" disabled>
						Select Series
					</MenuItem>
					{series.map((series, index) => (
						<MenuItem key={index} value={series._id}>
							{series.name}
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

export default Season
