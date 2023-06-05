import { useState } from 'react'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'

const FormRowDate = ({
	labelText,
	name,
	value,
	handleChange,
	selectedBirthdate,
}) => {
	// const [selectedDate, setSelectedDate] = useState(null)

	// const changeFunct = (date) => {
	// 	setSelectedDate(date)
	// 	value = selectedDate
	// 	handleChange(selectedDate)
	// }

	const newDate = new Date()
	// const today = newDate.getDate()

	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>
			<DatePicker
				selected={selectedBirthdate}
				onChange={handleChange}
				locale="id-ID"
				maxDate={newDate}
				value={value}
			/>
		</div>
	)
}
export default FormRowDate
