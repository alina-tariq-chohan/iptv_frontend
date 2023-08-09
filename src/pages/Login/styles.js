import styled from "styled-components"

export const LoginWrapper = styled.div`
	height: 100vh;
	background: #f2f8ff;
	display: flex;
	justify-content: center;
	align-items: center;
	.ant-spin-dot-item {
		background-color: #d91e49 !important;
	}
`
export const LoginCard = styled.div`
	flex-basis: 700px;
	background: #ffffff;
	border-radius: 8px;
`

export const LoginHeading = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 36px;
	margin-bottom: 50px;
`
export const FormWrapper = styled.div`
	display: flex;
	justify-content: center;
	.ant-form {
		width: 50%;
	}
	.ant-input {
		/* Neutral/Astellas Gray */

		border: 1px solid #939597;
		box-sizing: border-box;
		border-radius: 4px;
		height: 44px;
		background: none;
	}
	.ant-btn {
		/* Primary/Astellas Red */

		background: #d91e49;
		border-radius: 2px;
		margin-top: 40px;
		width: 128px;
		border: none;
		height: 43px;
	}

	.ant-input-affix-wrapper > input.ant-input {
		height: 33px;
	}
	.ant-input-affix-wrapper {
		height: 44px;
		border-radius: 4px;
	}
`

export const FlexCenter = styled.div`
	display: flex;
	justify-content: center;
`
