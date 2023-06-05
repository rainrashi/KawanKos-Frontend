const FormRowYesNo = ({
	type,
	name,
	value,
	handleChange,
	labelText,
	placeholder,
}) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>
			<input
				type="checkbox"
				value={value}
				name={name}
				onChange={handleChange}
				className="form-input"
				checked={value}
			/>
		</div>
	)
}
export default FormRowYesNo
