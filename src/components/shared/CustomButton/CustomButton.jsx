import React from "react"

const CustomButton = (props) => {
	const { className, title, image, icon } = props
	return (
		<button {...props} className={className}>
			{image && <img className="plus-icon" alt="add" src={image} />}
			<span>{title}</span>
			<span style={{ marginLeft: 15 }}>{icon && icon}</span>
		</button>
	)
}

export default CustomButton
