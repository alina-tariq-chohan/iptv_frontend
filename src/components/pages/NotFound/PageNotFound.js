import React from "react"
import { Result, Button } from "antd"
import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
	const navigate = useNavigate()

	return (
		<div>
			<Result
				status="404"
				title="404"
				subTitle="Sorry, the page you visited does not exist."
				extra={
					<Button onClick={() => navigate("/")} type="primary">
						Back Projects
					</Button>
				}
			/>
		</div>
	)
}

export default PageNotFound
