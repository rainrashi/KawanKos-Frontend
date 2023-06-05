const FormRowDescription = ({
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
			<textarea
				value={value}
				name={name}
				onChange={handleChange}
				placeholder={placeholder}
				maxLength={500}
			/>
		</div>
	)
}
export default FormRowDescription
