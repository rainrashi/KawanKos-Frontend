import { useState } from 'react'

const FormRowBudget = ({
	name,
	value,
	handleChange,
	labelText,
	placeholder,
}) => {
	const [budget, setBudget] = useState(0)

	const handleIncrement = () => {
		setBudget((prevBudget) => prevBudget + 500000)
		value = budget
	}

	const handleDecrement = () => {
		if (budget >= 500000) {
			setBudget((prevBudget) => prevBudget - 500000)
			value = budget
		}
	}

	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>
			<input
				type="text"
				value={budget.toLocaleString()}
				name={name}
				onChange={handleChange}
				className="form-input"
				placeholder={placeholder}
			/>
			<button onClick={handleIncrement}>+</button>
			<button onClick={handleDecrement}>-</button>
		</div>
	)
}
export default FormRowBudget
