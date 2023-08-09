import styled from "styled-components"

export const HomeWrapper = styled.div`
	.ant-table {
		background: none !important;
		margin-top: 10px;
	}

	.project-name {
		color: ${({ theme }) => theme.colors.darkGray};
		&:hover,
		span {
			&:hover {
				color: ${({ theme }) => theme.colors.primaryDark};
			}
		}
	}

	.ant-table-thead > tr > th {
		background: none !important;
		font-family: Myriad Pro;
		font-style: normal;
		font-weight: 500;
		font-size: 20px;
		color: #393939;
		padding: 5px 10px;
		&::before {
			display: none;
		}
	}

	.ant-table-tbody > tr > td {
		color: #939597;
		padding: 5px 10px !important;
		border: none !important;
	}
`

export const ActionButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	.ant-typography {
		margin: 0 2px;
		padding: 6px 6px 4px 6px;
		border-radius: 4px;
		transition: all 0.3s ease-in-out;
		&:hover {
			background: #393939;
		}
	}
`
export const SearchInput = styled.div`
	margin-right: 10px;
	.ant-input {
		width: 220px;
		margin-bottom: 10px;
		background: #f4f4f5;
		border-radius: 0.3rem;
		border-color: #f4f4f5;
		border-radius: 4px;
		box-shadow: none;
		resize: none;
		&:focus {
			border-color: #014c97;
		}
		&:hover {
			border-color: #014c97;
			box-shadow: none;
		}
	}
`

export const ProjectStatus = styled.span`
	text-transform: capitalize;
`
