import "./App.css"
import axios from "axios"
import { TextField, Button as MuiButton, Select, MenuItem } from "@material-ui/core"
// import "antd/dist/antd.css"
import { Table, Button as AntDButton } from "antd"
import React, { useState } from "react"

function Season() {
	const [selectedValue, setSelectedValue] = useState([""])
	const handleChange = (event) => {
		setSelectedValue(event.target.value)
	}
	const [data, setData] = React.useState([])
	const [series, setSeries] = React.useState([])
	React.useEffect(() => {
		// This is to get the list of books from the backend.
		axios
			.get(process.env.REACT_APP_API_BASE_URL + "/series")
			.then((response) => {
				// Once we get the list of books, we need to set the state of the component with the list of books.
				setSeries(response.data)
			})
			.catch((error) => {})
		axios
			.get(process.env.REACT_APP_API_BASE_URL + "/season")
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
			series_id: e.target.series.value,
		}
		axios
			.post(process.env.REACT_APP_API_BASE_URL + "/season", payload)
			.then(async (res) => {
				// Once the book is added, we need to get the list of books
				const seasonList = await axios.get(process.env.REACT_APP_API_BASE_URL + "/season")
				setData(seasonList.data)
			})
			.catch((err) => {})
			.finally(() => {
				// This is to clear the form after submitting.
				e.target.name.value = ""
				e.target.description.value = ""
				e.target.series.value = ""
			})
	}
	const deleteById = async (id) => {
		// This is to delete the book from the list.
		axios
			.delete(`${process.env.REACT_APP_API_BASE_URL}/season/${id}`)
			.then(async (res) => {
				// Once the book is deleted, we need to get the list of books
				const seasonList = await axios.get(process.env.REACT_APP_API_BASE_URL + "/season")
				// And render the list of books in the UI. I am reassigning the state with the new list of books
				setData(seasonList.data)
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
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Series",
			dataIndex: "series",
			key: "series_id",
			// render: (_, season) => <>{season.series_id && season.series_id.name}</>,
			render: (_, season) => {
				const seriesObject = series.find((s) => s._id === season.series_id)
				return seriesObject ? seriesObject.name : "N/A"
			},
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<AntDButton color="primary" onClick={() => deleteById(record._id)}>
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
				<TextField
					style={customStyle}
					type="text"
					label="Description"
					variant="outlined"
					name="description"
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
					save
				</MuiButton>
			</form>
		</div>
	)
}

export default Season