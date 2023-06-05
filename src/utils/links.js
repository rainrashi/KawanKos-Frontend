import { MdBarChart, MdQueryStats } from 'react-icons/md'
import { FaHome, FaWpforms } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import { ImProfile } from 'react-icons/im'
import { RiUserSearchFill } from 'react-icons/ri'

const links = [
	// { id: 1, text: 'stats', path: '/', icon: <MdBarChart /> },
	// { id: 2, text: 'all jobs', path: 'all-jobs', icon: <MdQueryStats /> },
	// { id: 3, text: 'add job', path: 'add-job', icon: <FaWpforms /> },
	// { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
	{ id: 1, text: 'Home', path: '/', icon: <FaHome /> },
	{
		id: 2,
		text: 'Cari Kawankos',
		path: 'cari-kawankos',
		icon: <RiUserSearchFill />,
	},
	{ id: 3, text: 'Edit Profil', path: 'profile', icon: <ImProfile /> },
	{ id: 4, text: 'Inbox', path: 'inbox', icon: <FiMail /> },
	// { id: 5, text: 'AllJobs', path: 'all-jobs', icon: <FaWpforms /> },
]

export default links
