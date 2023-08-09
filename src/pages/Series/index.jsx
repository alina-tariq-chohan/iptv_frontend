import "./App.css"
import axios from "axios"
import React from "react"
import { Typography, AppBar, Toolbar, TextField, Button as MuiButton } from "@material-ui/core"
// import "antd/dist/antd.css"
import { Table, Button as AntDButton } from "antd"

function Series() {
	const [books, setBooks] = React.useState([])
	React.useEffect(() => {
		// This is to get the list of books from the backend.
		axios
			.get(process.env.REACT_APP_API_BASE_URL + "/genre")
			.then((response) => {
				// Once we get the list of books, we need to set the state of the component with the list of books.
				setBooks(response.data)
			})
			.catch((error) => {})
	}, [])

	const onSubmit = async (e) => {
		// e.preventDefault prevents page from refreshing when form is submitted (default behavior)
		e.preventDefault()
		// This is body of the request, we can send it as a json object
		const book = {
			name: e.target.name.value,
		}
		axios
			.post(process.env.REACT_APP_API_BASE_URL + "/genre", book)
			.then(async (res) => {
				// Once the book is added, we need to get the list of books
				const bookList = await axios.get(process.env.REACT_APP_API_BASE_URL + "/genre")
				// And render the list of books in the UI. I am reassigning the state with the new list of books
				setBooks(bookList.data)
			})
			.catch((err) => {})
			.finally(() => {
				// This is to clear the form after submitting.
				e.target.name.value = ""
			})
	}

	const deleteBook = async (id) => {
		// This is to delete the book from the list.
		axios
			.delete(`${process.env.REACT_APP_API_BASE_URL}/genre/${id}`)
			.then(async (res) => {
				// Once the book is deleted, we need to get the list of books
				const bookList = await axios.get(process.env.REACT_APP_API_BASE_URL + "/genre")
				// And render the list of books in the UI. I am reassigning the state with the new list of books
				setBooks(bookList.data)
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
			<Table columns={columns} dataSource={books} />

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

export default Series
