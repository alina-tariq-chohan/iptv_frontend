import React from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import "scss/main.scss"
import { ThemeProvider } from "styled-components"
import Theme from "styles/Theme"
import Global from "styles/Global"
import Layout from "components/layout"
import Login from "pages/Login"
import Register from "pages/Register"
import PageNotFound from "components/pages/NotFound/PageNotFound"
import Genre from "pages/Genre"
import Series from "pages/Series"
import Season from "pages/Season"
import Episode from "pages/Episode"
import Stream from "pages/Stream"

function App() {
	React.useEffect(() => {
		if (!localStorage.getItem("users")) {
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
					<Route path="/" element={layoutWrapper(<Genre />)} />
					<Route path="/genre" element={layoutWrapper(<Genre />)} />
					<Route path="/series" element={layoutWrapper(<Series />)} />
					<Route path="/season" element={layoutWrapper(<Season />)} />
					<Route path="/episode" element={layoutWrapper(<Episode />)} />
					<Route path="/stream" element={layoutWrapper(<Stream />)} />
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
