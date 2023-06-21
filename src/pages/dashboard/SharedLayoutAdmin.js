import { Outlet } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { NavbarAdmin } from '../../components'

const SharedLayoutAdmin = () => {
	return (
		<Wrapper>
			<main className='dashboard'>
				<div>
					<NavbarAdmin />
					<div className='dashboard-page'>
						<Outlet />
					</div>
				</div>
			</main>
		</Wrapper>
	)
}
export default SharedLayoutAdmin
