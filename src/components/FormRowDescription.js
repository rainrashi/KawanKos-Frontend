import { TfiWrite } from 'react-icons/tfi'

const FormRowDescription = ({
	type,
	name,
	value,
	handleChange,
	labelText,
	placeholder,
}) => {
	return (
		<div className='form-row'>
			<div className='row-container'>
				<TfiWrite />
				<div className='row-content'>
					<label htmlFor={name} className='form-label'>
						{labelText || name}
					</label>
				</div>
			</div>
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
