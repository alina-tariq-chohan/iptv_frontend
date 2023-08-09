import React from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import "scss/main.scss"
import { ThemeProvider } from "styled-components"
import Home from "pages/Home"
import Theme from "styles/Theme"
import Global from "styles/Global"
import Layout from "components/layout"
import AddProject from "pages/Genre"
import Login from "pages/Login"
import Register from "pages/Register"
import PageNotFound from "components/pages/NotFound/PageNotFound"

function App() {
	React.useEffect(() => {
		if (!localStorage.getItem("kusers")) {
			localStorage.setItem("users", JSON.stringify([]))
		}

		if (!localStorage.getItem("projects")) {
			localStorage.setItem("projects", JSON.stringify([]))
		}
	}, [])
	const layoutWrapper = (component) => (
		<PrivateRoute>
			<Layout>{component}</Layout>
		</PrivateRoute>
	)
	return (
		<ThemeProvider theme={Theme}>
			<Global />
			<BrowserRouter>
				<Routes>
					<Route
						path="/login"
						element={
							<LoginRedirect>
								<Login />
							</LoginRedirect>
						}
					/>
					<Route
						path="/register"
						element={
							<LoginRedirect>
								<Register />
							</LoginRedirect>
						}
					/>
					k
					<Route path="/" element={layoutWrapper(<Home />)}>
						<Route path="active" element={layoutWrapper(<Home />)} />
						<Route path="archived" element={layoutWrapper(<Home />)} />
					</Route>
					<Route path="/add" element={layoutWrapper(<AddProject />)} />
					<Route path="/genre" element={layoutWrapper(<AddProject />)} />
					<Route path="/project/:id" element={layoutWrapper(<AddProject />)} />
					<Route path="*" element={layoutWrapper(<PageNotFound />)} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}
const PrivateRoute = ({ children }) => {
	const isAuthenticated = localStorage.getItem("token")
	return isAuthenticated ? children : <Navigate to="/login" />
}

const LoginRedirect = ({ children }) => {
	const isAuthenticated = localStorage.getItem("token")
	return isAuthenticated ? <Navigate to="/" /> : children
}
export default App
