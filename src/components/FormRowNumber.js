const FormRowNumber = ({
	name,
	value,
	handleChange,
	labelText,
	placeholder,
	step,
	min,
	max,
}) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>
			<input
				type="number"
				value={value}
				name={name}
				onChange={handleChange}
				className="form-input"
				placeholder={placeholder}
				step={step}
				min={min}
				max={max}
			/>
		</div>
	)
}
export default FormRowNumber
