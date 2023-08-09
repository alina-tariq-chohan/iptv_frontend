import styled from "styled-components"

export const LayoutWrapper = styled.div`
	height: 100%;
	background: #ffffff;
	// overflow-y: hidden;

	.ant-menu-inline {
		border-right: none;
	}

	.ant-menu-title-content {
		color: #b3b5b6;
	}

	.ant-menu-item > .anticon {
		font-size: 1.25rem !important;
		margin-right: 0.625rem;
	}

	.ant-menu.ant-menu-inline-collapsed > .ant-menu-item {
		margin: 0;
		padding: 0.55rem 0 0 1.25rem !important;
		border-radius: 0 !important;
		& > .anticon {
			transform: translateY(0.375rem) translateX(-0.125rem);
		}
	}

	.ant-menu-item {
		width: auto !important;
		height: 3rem !important;
		border-radius: 0.25rem !important;
		padding-left: 0.875rem !important;
	}

	.ant-menu-item-selected .ant-menu-title-content {
		font-size: 1rem;
		color: #ffffff;
		.ant-btn {
			background-color: #d91e49 !important;
			border-color: #d91e49 !important;
		}
	}

	.ant-menu-item-selected {
		background: #a62b4e !important;
		width: auto !important;
		color: white !important;
		height: 3rem !important;
		border-radius: 0.25rem !important;
		transition: none;
		svg {
			path {
				fill: white;
			}
		}
	}

	.ant-menu-item::after {
		border-right: none !important;
	}

	.ant-menu-vertical {
		border-right: none;
	}

	.ant-layout-sider-light .ant-layout-sider-trigger {
		left: 0;
		border-right: 1px solid #f0f0f0;
	}
`

export const SearchInput = styled.div`
	.ant-input {
		width: 220px;
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
