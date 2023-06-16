import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { BiCalendarStar, BiMaleFemale } from 'react-icons/bi'
import { SiHomeadvisor } from 'react-icons/si'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ProfilSingkat'
import ProfileSingkatInfo from './ProfileSingkatInfo'
import defaultAvatar from '../assets/images/defaultAvatar_rekmld.jpg'

const ProfileSingkat = ({
	_id,
	name,
	userAvatar,
	userGender,
	userAge,
	userStatus,
	userHomeTown,
	userBudget,
	userReligion,
	userJob,
	userMajor,
	userHasLocation,
}) => {
	const { setProfileDetail } = useAppContext()

	return (
		<Wrapper>
			<header>
				<img
					src={userAvatar === 'defaultAvatar' ? defaultAvatar : userAvatar}
					alt='avatar'
					className='main-icon'
				/>
				<div className='info'>
					<h5>{name}</h5>
					<p>{userStatus}</p>
					{userHasLocation && (
						<>
							<br />
							<button type='button' className='btn edit-btn'>
								{userHasLocation && 'Sudah Ada Kamar ✔️'}
							</button>
						</>
					)}
				</div>
			</header>
			<div style={{ display: 'none' }}>
				{userHomeTown} {userReligion} {userJob} {userMajor}
			</div>
			<div className='content'>
				<div className='content-center'>
					<ProfileSingkatInfo icon={<BiMaleFemale />} text={userGender} />
					<ProfileSingkatInfo
						icon={<BiCalendarStar />}
						text={userAge}
						userAge={true}
					/>
					<ProfileSingkatInfo icon={<SiHomeadvisor />} text={userHomeTown} />
					<ProfileSingkatInfo
						icon={<FaRegMoneyBillAlt />}
						text={userBudget}
						userBudget={true}
					/>
				</div>
				<footer>
					<div className='actions'>
						<Link
							to='/profile-detail'
							className='btn'
							onClick={() => setProfileDetail(_id)}
						>
							Detail Profil
						</Link>
					</div>
				</footer>
			</div>
		</Wrapper>
	)
}
export default ProfileSingkat
