import styled from "styled-components"

export const Wrapper = styled.div`
	height: 100vh;
	background: #f2f8ff;
	display: flex;
	justify-content: center;
	align-items: center;
	.ant-spin-dot-item {
		background-color: #d91e49 !important;
	}
`
export const Card = styled.div`
	flex-basis: 700px;
	background: #ffffff;
	border-radius: 8px;
`

export const Heading = styled.div`
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

export const ForgotPassword = styled.div`
	margin-top: 12px;
	font-family: DM Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 13px;
	line-height: 112.5%;
	/* identical to box height, or 15px */

	/* Gray 4 */

	color: #bdbdbd;
`

export const ActionLinks = styled.div`
	display: flex;
	flex-basis: 438px;
	justify-content: start;
`