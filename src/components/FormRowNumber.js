//icon import
import { IoPricetag } from 'react-icons/io5'
import { BiCalendarStar } from 'react-icons/bi'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { AiOutlineNumber } from 'react-icons/ai'

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
	//icon array
	const iconMap = {
		userAge: <BiCalendarStar />,
		userBudget: <FaRegMoneyBillAlt />,
		userLocationPrice: <IoPricetag />,
	}

	//icon
	const selectedIcon = iconMap[name] || <AiOutlineNumber />
	return (
		<div className='form-row'>
			<div className='row-container'>
				{selectedIcon}
				<div className='row-content'>
					<label htmlFor={name} className='form-label'>
						{labelText || name}
					</label>
				</div>
			</div>
			<input
				type='number'
				value={value}
				name={name}
				onChange={handleChange}
				className='form-input'
				placeholder={placeholder}
				step={step}
				min={min}
				max={max}
			/>
		</div>
	)
}
export default FormRowNumber
