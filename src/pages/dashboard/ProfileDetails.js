import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/ProfileDetails'
import defaultAvatar from '../../assets/images/defaultAvatar_rekmld.jpg'
import { Link } from 'react-router-dom'

const ProfileDetails = () => {
	//testing
	const initStateDeets = {
		name: 'testName Nametest',
		userAvatar: 'defaultAvatar',
		userGender: 'testUserGender',
		userAge: 25,
		userHomeTown: 'testUserHomeTown',
		userStatus: 'Pelajar',
		userReligion: 'testUserReligion',
		userJob: 'testUserJob',
		userMajor: 'testUserMajor',
		userBudget: 1000000,
		userDescription: 'testUserDescription',
	}

	const {
		isLoading,
		showAlert,
		displayAlert,
		profileDetail,
		profileDetailId,
		profileDetails,
		handleChange,
		setMessageRecipient,
	} = useAppContext()

	useEffect(() => {
		profileDetail()
	}, [profileDetailId])

	let detailState = initStateDeets

	if (profileDetailId) {
		detailState = profileDetails
	}

	const {
		name,
		userAvatar,
		userGender,
		userAge,
		userHomeTown,
		userStatus,
		userReligion,
		userJob,
		userMajor,
		userBudget,
		userDescription,
	} = detailState

	return (
		<Wrapper>
			<div className="form">
				<h1>Detail Profil {name.split(' ')[0]}</h1>
				<div className="deets-center">
					<div className="deets-row">
						<center>
							{userAvatar === 'defaultAvatar' && (
								<img className="img-avatar" src={defaultAvatar} />
							)}
							{userAvatar !== 'defaultAvatar' && (
								<img className="img-avatar" src={userAvatar} />
							)}
						</center>
					</div>

					<h2>Nama Lengkap:</h2>
					<h5>{name}</h5>

					<h2>Jenis Kelamin:</h2>
					<h5>{userGender}</h5>

					<h2>Umur:</h2>
					<h5>{userAge}</h5>

					<h2>Agama:</h2>
					<h5>{userReligion}</h5>

					<h2>Asal Kota:</h2>
					<h5>{userHomeTown}</h5>

					<h2>Status Pelajar/Pekerja:</h2>
					<h5>{userStatus}</h5>

					{userStatus === 'Pelajar' && <h2>Jurusan:</h2>}
					{userStatus === 'Pelajar' && <h5>{userMajor}</h5>}

					{userStatus === 'Pekerja' && <h2>Pekerjaan:</h2>}
					{userStatus === 'Pekerja' && <h5>{userJob}</h5>}

					<h2>Budget:</h2>
					<h5>Rp {userBudget}</h5>

					<h2>Deskripsi pribadi:</h2>
					<p>{userDescription}</p>

					<Link
						to="/create-message"
						className="btn"
						onClick={() => setMessageRecipient(profileDetailId)}
					>
						Kirim Pesan
					</Link>

					{/* <button
					className="btn"
					onClick={() => setMessageRecipient(profileDetailId)}
				>
					Kirim Pesan
				</button> */}
				</div>
			</div>
		</Wrapper>
	)
}
export default ProfileDetails
