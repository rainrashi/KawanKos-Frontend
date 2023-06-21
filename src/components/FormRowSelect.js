//icon import
import { MdOutlineHomeWork, MdShareLocation } from 'react-icons/md'
import { BiMaleFemale } from 'react-icons/bi'
import { BsStars } from 'react-icons/bs'
import { GrSelect } from 'react-icons/gr'
import { RxCaretSort } from 'react-icons/rx'
import { IoMdLocate } from 'react-icons/io'

const FormRowSelect = ({
	labelText,
	name,
	value,
	handleChange,
	list,
	placeholder,
}) => {
	//icon array
	const iconMap = {
		userGender: <BiMaleFemale />,
		userReligion: <BsStars />,
		userStatus: <MdOutlineHomeWork />,
		userLocationArea: <IoMdLocate />,
		searchUserGender: <BiMaleFemale />,
		searchUserReligion: <BsStars />,
		searchUserStatus: <MdOutlineHomeWork />,
		searchUserHasLocation: <MdShareLocation />,
		searchUserLocationArea: <IoMdLocate />,
		sort: <RxCaretSort />,
	}

	//icon
	const selectedIcon = iconMap[name] || <GrSelect />

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
			<select
				name={name}
				value={value}
				onChange={handleChange}
				className='form-select'
			>
				<option value='' disabled defaultValue={placeholder}>
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
