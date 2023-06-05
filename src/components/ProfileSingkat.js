import moment from 'moment'
import {
	FaLocationArrow,
	FaBriefcase,
	FaCalendarAlt,
	FaRegMoneyBillAlt,
} from 'react-icons/fa'
import { BiCalendarStar, BiMaleFemale } from 'react-icons/bi'
import { SiHomeadvisor } from 'react-icons/si'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ProfilSingkat'
import ProfileSingkatInfo from './ProfileSingkatInfo'

//Profil singkat yang tampil pas di cari kawankos
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
	createdAt,
}) => {
	const { user, setProfileDetail } = useAppContext()
	// const isCurrentUser = user && user._id === _id
	// if (isCurrentUser) {
	// 	return null
	// }

	return (
		<Wrapper>
			<header>
				<div className="main-icon">{name.charAt(0)}</div>
				<div className="info">
					<h5>{name}</h5>
					<p>{userStatus}</p>
				</div>
			</header>
			<div style={{ display: 'none' }}>
				{userHomeTown} {userReligion} {userJob} {userMajor}
			</div>
			<div className="content">
				<div className="content-center">
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
					{/* <div className={`status ${status}`}>{status}</div> */}
				</div>
				<footer>
					<div className="actions">
						<Link
							// ! DETAIL PROFIL
							to="/profile-detail"
							className="btn"
							onClick={() => setProfileDetail(_id)}
						>
							Detail Profil
						</Link>
						{/* <button>Detail Profil</button> */}
						{/* <Link
							to="/add-job"
							className="btn edit-btn"
							onClick={() => setEditJob(_id)}
						>
							Edit
						</Link>
						<button
							type="button"
							className="btn delete-btn"
							onClick={() => deleteJob(_id)}
						>
							Hapus
						</button> */}
					</div>
				</footer>
			</div>
		</Wrapper>
	)
}
export default ProfileSingkat
