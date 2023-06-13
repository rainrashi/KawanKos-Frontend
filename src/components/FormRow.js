//icons import
import {
	MdPermIdentity,
	MdShareLocation,
	MdAlternateEmail,
	MdPassword,
	MdDriveFileRenameOutline,
} from 'react-icons/md'
import { SiHomeadvisor } from 'react-icons/si'
import { HiOfficeBuilding } from 'react-icons/hi'
import { TfiWrite } from 'react-icons/tfi'
import { IoSchool } from 'react-icons/io5'
import { BiRename } from 'react-icons/bi'

const FormRow = ({
	type,
	name,
	value,
	handleChange,
	labelText,
	placeholder,
}) => {
	//icon array
	const iconMap = {
		name: <MdPermIdentity />,
		email: <MdAlternateEmail />,
		password: <MdPassword />,
		userHomeTown: <SiHomeadvisor />,
		userMajor: <IoSchool />,
		userJob: <HiOfficeBuilding />,
		userLocation: <MdShareLocation />,
		search: <BiRename />,
		searchUserHomeTown: <SiHomeadvisor />,
		searchUserMajor: <IoSchool />,
		searchUserJob: <HiOfficeBuilding />,
		searchUserLocation: <MdShareLocation />,
	}

	//icon
	const selectedIcon = iconMap[name] || <MdDriveFileRenameOutline />

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
				type={type}
				value={value}
				name={name}
				onChange={handleChange}
				className='form-input'
				placeholder={placeholder}
			/>
		</div>
	)
}
export default FormRow
