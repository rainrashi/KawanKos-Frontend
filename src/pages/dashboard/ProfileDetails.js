import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/ProfileDetails'
import defaultAvatar from '../../assets/images/defaultAvatar_rekmld.jpg'
import { Link } from 'react-router-dom'

//icons import
import {
	MdDescription,
	MdOutlineHomeWork,
	MdPermIdentity,
	MdShareLocation,
} from 'react-icons/md'
import { BiCalendarStar, BiMaleFemale } from 'react-icons/bi'
import { BsStars } from 'react-icons/bs'
import { SiHomeadvisor } from 'react-icons/si'
import { IoPricetag, IoSchool } from 'react-icons/io5'
import { HiOfficeBuilding } from 'react-icons/hi'
import { FaRegMoneyBillAlt } from 'react-icons/fa'

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
		userBudget: 88888888,
		userDescription: 'testUserDescription',
		userHasLocation: false,
		userLocation: 'testUserLocation',
		userLocationPrice: 8888888,
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
		userHasLocation,
		userLocation,
		userLocationPrice,
	} = detailState

	return (
		<Wrapper>
			<div className='form'>
				<center>
					<h3>Detail Profil {name.split(' ')[0]}</h3>
				</center>
				<div className='deets-center'>
					<div className='deets-row'>
						<center>
							{userAvatar === 'defaultAvatar' && (
								<img className='img-avatar-deets' src={defaultAvatar} />
							)}
							{userAvatar !== 'defaultAvatar' && (
								<img className='img-avatar-deets' src={userAvatar} />
							)}
						</center>
					</div>

					<div className='deets-row-container'>
						<MdPermIdentity />
						<div className='deets-content'>
							<label>
								<b>Nama Lengkap: </b>
							</label>
							<>{name}</>
						</div>
					</div>

					<div className='deets-row-container'>
						<BiMaleFemale />
						<div className='deets-content'>
							<label>
								<b>Jenis Kelamin: </b>
							</label>
							<>{userGender}</>
						</div>
					</div>

					<div className='deets-row-container'>
						<BiCalendarStar />
						<div className='deets-content'>
							<label>
								<b>Umur: </b>
							</label>
							<>{userAge}</>
						</div>
					</div>

					<div className='deets-row-container'>
						<BsStars />
						<div className='deets-content'>
							<label>
								<b>Agama: </b>
							</label>
							<>{userReligion}</>
						</div>
					</div>

					<div className='deets-row-container'>
						<SiHomeadvisor />
						<div className='deets-content'>
							<label>
								<b>Asal Kota: </b>
							</label>
							<>{userHomeTown}</>
						</div>
					</div>

					<div className='deets-row-container'>
						<MdOutlineHomeWork />
						<div className='deets-content'>
							<label>
								<b>Status Pelajar/Pekerja: </b>
							</label>
							<>{userStatus}</>
						</div>
					</div>

					{userStatus === 'Pelajar' && (
						<div className='deets-row-container'>
							<IoSchool />
							<div className='deets-content'>
								<label>
									<b>Jurusan: </b>
								</label>
								<>{userMajor}</>
							</div>
						</div>
					)}

					{userStatus === 'Pekerja' && (
						<div className='deets-row-container'>
							<HiOfficeBuilding />
							<div className='deets-content'>
								<label>
									<b>Pekerjaan: </b>
								</label>
								<>{userJob}</>
							</div>
						</div>
					)}

					<div className='deets-row-container'>
						<FaRegMoneyBillAlt />
						<div className='deets-content'>
							<label>
								<b>Budget: </b>
							</label>
							<>Rp {userBudget}</>
						</div>
					</div>

					<div className='deets-row-container'>
						<MdDescription />
						<div className='deets-content'>
							<label>
								<b>Deskripsi pribadi: </b>
							</label>
							<>{userDescription}</>
						</div>
					</div>

					{userHasLocation && (
						<>
							<div className='deets-row-container'>
								<MdShareLocation />
								<div className='deets-content'>
									<label>
										<b>Lokasi Indekos: </b>
									</label>
									<>{userLocation}</>
								</div>
							</div>

							<div className='deets-row-container'>
								<IoPricetag />
								<div className='deets-content'>
									<label>
										<b>Harga kamar: </b>
									</label>
									<>Rp {userLocationPrice}</>
								</div>
							</div>
						</>
					)}

					<br />

					<Link
						to='/create-message'
						className='btn'
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

/* <h2>Nama Lengkap:</h2>
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

					{userHasLocation && (
						<>
							<h2>Lokasi Indekos:</h2>
							<p>{userLocation}</p>

							<h2>Harga kamar:</h2>
							<p>{userLocationPrice}</p>
						</>
					)} */
