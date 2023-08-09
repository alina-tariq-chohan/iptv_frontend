import { Input, Form, InputNumber } from "antd"
import TextArea from "antd/lib/input/TextArea"
const EditableCell = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode =
		inputType === "textarea" ? (
			<TextArea maxLength={title === "Description" && 1024} rows={2} />
		) : inputType === "number" ? (
			<InputNumber min={0} max={100} />
		) : (
			<Input maxLength={title === "Name" && 128} autoFocus />
		)
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0,
					}}
					rules={[
						{
							required: title === "Description" ? false : true,
							message: inputType === "number" ? "1-100" : `Please Input ${title}!`,
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	)
}

export default EditableCell
