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
	React.useEffect(() => {
		// This is to get the list of books from the backend.
		axios
			.get(process.env.REACT_APP_API_BASE_URL + "/genre")
			.then((response) => {
				// Once we get the list of books, we need to set the state of the component with the list of books.
				setGenre(response.data)
			})
			.catch((error) => {})
		axios
			.get(process.env.REACT_APP_API_BASE_URL + "/series")
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
			genres: e.target.genres.value.split(",").filter((i) => i),
		}
		axios
			.post(process.env.REACT_APP_API_BASE_URL + "/series", payload)
			.then(async (res) => {
				// Once the book is added, we need to get the list of books
				const bookList = await axios.get(process.env.REACT_APP_API_BASE_URL + "/series")
				// And render the list of books in the UI. I am reassigning the state with the new list of books
				const a = bookList.data.map((i) => (i.genres = i.genres.name.join(", ")))
				setData(a)
			})
			.catch((err) => {})
			.finally(() => {
				// This is to clear the form after submitting.
				e.target.name.value = ""
				e.target.description.value = ""
				e.target.genres.value = ""
			})
	}

	const deleteById = async (id) => {
		// This is to delete the book from the list.
		axios
			.delete(`${process.env.REACT_APP_API_BASE_URL}/genre/${id}`)
			.then(async (res) => {
				// Once the book is deleted, we need to get the list of books
				const bookList = await axios.get(process.env.REACT_APP_API_BASE_URL + "/genre")
				// And render the list of books in the UI. I am reassigning the state with the new list of books
				setData(bookList.data)
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
				<InputLabel>Select Genre</InputLabel>
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
					save
				</MuiButton>
			</form>
		</div>
	)
}

export default Series
