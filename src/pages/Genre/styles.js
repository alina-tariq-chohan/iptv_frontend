import styled from "styled-components"
import theme from "styles/Theme"

export const AddProjectIcon = styled.div`
	width: 3.5rem;
	height: 3.5rem;
	padding: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #f4f4f5;
	margin-right: 20px;
	border-radius: 5px;
	text-align: center;
`

export const AddProjectWrapper = styled.div`
	.top-row {
		border-bottom: 1px solid ${theme.colors.border};
		padding-bottom: 10px;
	}

	.ant-input-affix-wrapper {
		border-color: #f4f4f5;
		&:hover,
		&.ant-input-affix-wrapper-focused {
			border-radius: 4px;
			border-color: #014c97 !important;
			box-shadow: none;
		}
	}

	.ant-input {
		border-color: #f4f4f5;
		border-radius: 4px;
		box-shadow: none;
		resize: none;
		margin: 0;
		&:focus {
			border-color: #014c97;
		}
		&:hover {
			border-color: #014c97;
			box-shadow: none;
		}
	}

	.ant-input-show-count-suffix {
		color: #bfbfbf;
	}
	.ant-input-textarea-show-count {
		&::after {
			color: #bfbfbf !important;
		}
	}

	table {
		thead {
			th {
				background-color: #fff;
				border: none;
				font-weight: bold;
				color: #393939;
				&::before {
					display: none;
				}
			}
		}
		tbody {
			tr {
				transition: 0.3s all ease-in-out;
				&:hover {
					background-color: #f4f4f5;
					td {
						background-color: transparent !important;
					}
				}
				td {
					color: #939597;
				}
			}
		}
	}
`

export const InputWrapper = styled.div`
	font-family: Myriad Pro;
	.project-heading {
		font-size: 1.125rem;
		font-weight: 600;
	}
	.project-description {
		font-size: 0.81rem;
		font-weight: 400;
	}
`

export const Title = styled.div`
	font-family: Myriad Pro;
	font-size: 1.125rem;
	font-weight: 600;
	display: flex;
	height: 4rem;
	padding: 10px;
	justify-content: center;
	align-items: center;
	text-align: center;
`

export const TopHeaderWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	width: 98%;
`

export const TopHeaderLeftSide = styled.div`
	display: flex;
`

export const BodyWrapper = styled.div`
	align-items: center;
	justify-content: center;
	min-height: 80vh;
	display: flex;
`
// flex-direction: column;
// margin-top: 200px !important;
