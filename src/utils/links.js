import { FaHome } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import { ImProfile } from 'react-icons/im'
import { RiUserSearchFill } from 'react-icons/ri'

const links = [
	{ id: 1, text: 'Home', path: '/', icon: <FaHome /> },
	{
		id: 2,
		text: 'Cari Kawankos',
		path: 'cari-kawankos',
		icon: <RiUserSearchFill />,
	},
	{ id: 3, text: 'Edit Profil', path: 'profile', icon: <ImProfile /> },
	{ id: 4, text: 'Inbox', path: 'inbox', icon: <FiMail /> },
]

export default links
