const FormRowSelect = ({
	labelText,
	name,
	value,
	handleChange,
	list,
	placeholder,
}) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>
			<select
				name={name}
				value={value}
				onChange={handleChange}
				className="form-select"
			>
				<option value="" disabled defaultValue={placeholder}>
					{placeholder}
				</option>
				{list.map((itemValue, index) => {
					return (
						<option key={index} value={itemValue}>
							{itemValue}
						</option>
					)
				})}
			</select>
		</div>
	)
}
export default FormRowSelect
