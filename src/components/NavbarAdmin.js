import Wrapper from '../assets/wrappers/Navbar'
import { IoCaretDown } from 'react-icons/io5'
import { useAppContext } from '../context/appContext'
import { useState } from 'react'

const NavbarAdmin = () => {
	const [showLogout, setShowLogout] = useState(false)
	const { logoutUser, user } = useAppContext()
	return (
		<Wrapper>
			<div className='nav-center'>
				<div>
					<h3 className='logo-text'>Halo, Admin</h3>
				</div>
				<div className='btn-container'>
					<button
						type='button'
						className='btn'
						onClick={() => setShowLogout(!showLogout)}
					>
						{user && user.name}
						<IoCaretDown />
					</button>
					<div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
						<button type='button' className='dropdown-btn' onClick={logoutUser}>
							Logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	)
}
export default NavbarAdmin
