import styled from "styled-components"

export const MenuWrapper = styled.div`
	.ant-menu-title-content {
		font-size: 1rem;
	}

	.ant-menu-item {
		svg path {
			fill: #bebfc1;
		}

		&.ant-menu-item-selected {
			svg path {
				fill: #ffffff;
			}
		}
	}
`

export const MenuButton = styled.div`
	color: #fff !important;
`

export const ButtonWrapper = styled.div`
	margin-top: 200px;
	width: 200px;
`
