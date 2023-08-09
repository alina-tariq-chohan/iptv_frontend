import React from "react"

export default function CalibrationIcon2(props) {
	return (
		<svg viewBox="0 0 142 27" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g filter="url(#filter0_d_1014_47638)">
				<path
					d="M131.425 25C131.425 26.1046 130.529 27 129.425 27L29.0366 27C28.6379 27 28.2482 26.8808 27.9177 26.6577L10.8806 15.1577C9.70591 14.3648 9.70591 12.6353 10.8807 11.8423L27.9177 0.342311C28.2482 0.119213 28.6379 8.98592e-06 29.0366 8.95106e-06L129.425 1.74845e-07C130.529 7.82809e-08 131.425 0.89543 131.425 2L131.425 25Z"
					fill="#A20067"
				/>
			</g>
			<defs>
				<filter
					id="filter0_d_1014_47638"
					x="0"
					y="0"
					width="141.425"
					height="47"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="10" />
					<feGaussianBlur stdDeviation="5" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_1014_47638"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_1014_47638"
						result="shape"
					/>
				</filter>
			</defs>
			<text x="50%" y="50%" textAnchor="middle" fill="#fff" dy=".3em">
				{props.title}
			</text>
		</svg>
	)
}
