import "./App.css"
import axios from "axios"
import { TextField, Button as MuiButton, InputLabel, Select, MenuItem } from "@material-ui/core"
// import "antd/dist/antd.css"
import { Table, Button as AntDButton, Tag } from "antd"
import React, { useState } from "react"

function Series() {
	const [selectedValue, setSelectedValue] = useState([""])

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

	React.useEffect(() => {
		// This is to get the list of s from the backend.
		axios
			.get(process.env.REACT_APP_API_BASE_URL + "/genre", headers)
			.then((response) => {
				setGenre(response.data)
			})
			.catch((error) => {})
		axios
			.get(process.env.REACT_APP_API_BASE_URL + "/series", headers)
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
			genres: e.target.genres.value.split(",").filter((i) => i),
		}
		if (editingId) {
			try {
				await axios.patch(
					`${process.env.REACT_APP_API_BASE_URL}/series/${editingId}`,
					payload,
					headers
				)
				const series = await axios.get(
					process.env.REACT_APP_API_BASE_URL + "/series",
					headers
				)
				setData(series.data)
				setEditingId(null)
				e.target.name.value = "" // Clear the form
				e.target.description.value = ""
				e.target.genres.value = ""
			} catch (error) {
				console.error("Error updating series:", error)
			}
		} else {
			try {
				await axios
					.post(process.env.REACT_APP_API_BASE_URL + "/series", payload, headers)
					.then(async (res) => {
						// Once the series is added, we need to get the list of series
						const seriesList = await axios.get(
							process.env.REACT_APP_API_BASE_URL + "/series",
							headers
						)
						// And render the list of series in the UI. I am reassigning the state with the new list of series
						const a = seriesList.data.map((i) => (i.genres = i.genres.name.join(", ")))
						setData(a)
					})
					.catch((err) => {})
					.finally(() => {
						// This is to clear the form after submitting.
						e.target.name.value = ""
						e.target.description.value = ""
						e.target.genres.value = ""
					})
			} catch (error) {
				console.error("Error creating genre:", error)
			}
		}
	}

	const deleteSeries = async (id) => {
		// This is to delete the series from the list.
		axios
			.delete(`${process.env.REACT_APP_API_BASE_URL}/series/${id}`, headers)
			.then(async (res) => {
				// Once the series is deleted, we need to get the list of series
				const seriesList = await axios.get(
					process.env.REACT_APP_API_BASE_URL + "/series",
					headers
				)
				// And render the list of series in the UI. I am reassigning the state with the new list of series
				setData(seriesList.data)
			})
			.catch((err) => {})
	}

	const editSeries = (id) => {
		const seriesToEdit = data.find((series) => series._id === id)
		if (seriesToEdit) {
			setEditingId(id)
			document.getElementsByName("name")[0].value = seriesToEdit.name
			document.getElementsByName("description")[0].value = seriesToEdit.description
			document.getElementsByName("genres")[0].value = seriesToEdit.genres
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
						Edit
					</AntDButton>
					<AntDButton color="primary" onClick={() => deleteSeries(record._id)}>
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
					required
				/>
				<TextField
					style={customStyle}
					type="text"
					label="Description"
					variant="outlined"
					name="description"
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
