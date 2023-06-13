import { useState, useRef, useReducer } from 'react'
import {
	FormRow,
	Alert,
	FormRowSelect,
	FormRowDescription,
	FormRowNumber,
} from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import dangerImg from '../../assets/images/danger.svg'
import { Link } from 'react-router-dom'
import defaultAvatar from '../../assets/images/defaultAvatar_rekmld.jpg'

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
import { AiFillPicture } from 'react-icons/ai'

// ! for upload avatar, might move later
import {
	UPLOADING_AVATAR_BEGIN,
	UPLOADING_AVATAR_SUCCESS,
	UPLOADING_AVATAR_ERROR,
} from '../../context/actions'
import reducer from '../../context/reducer'
import axios from 'axios'

//! upload avatar alternative
import UploadAvatarBase64 from './UploadAvatarBase64'

const Profile = () => {
	const {
		user,
		showAlert,
		displayAlert,
		updateUser,
		isLoading,
		userGenderOptions,
		userStatusOptions,
		userReligionOptions,
		updateUserFoundPartner,
		userAvatarNew,
		// token,
		changeAvatar,
	} = useAppContext()

	const [formData, setFormData] = useState({
		name: user?.name,
		email: user?.email,
		userAvatar: user?.userAvatar,
		userDescription: user?.userDescription,
		userGender: user?.userGender,
		userAge: user?.userAge,
		userReligion: user?.userReligion,
		userStatus: user?.userStatus,
		userMajor: user?.userMajor,
		userJob: user?.userJob,
		userBudget: user?.userBudget,
		userHomeTown: user?.userHomeTown,
		userFoundPartner: user?.userFoundPartner,
		userHasLocation: user?.userHasLocation,
		userLocation: user?.userLocation,
		userLocationPrice: user?.userLocationPrice,
	})

	// const [avatar, setAvatar] = useState(user?.userAvatar)
	const [foundButton, setFoundButton] = useState(false)

	const toggleFoundButton = (e) => {
		e.preventDefault()
		const prev = foundButton
		setFoundButton(!prev)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!e.target.checkValidity()) {
			displayAlert()
			return
		}

		updateUser(formData)
	}

	const handleFoundButton = (e) => {
		e.preventDefault()
		setFormData((prevFormData) => ({
			...prevFormData,
			userFoundPartner: !prevFormData.userFoundPartner,
		}))
		updateUserFoundPartner({ userFoundPartner: !formData.userFoundPartner })
		toggleFoundButton(e)
	}

	const toggleHasLocation = (e) => {
		e.preventDefault()
		setFormData((prevFormData) => ({
			...prevFormData,
			userHasLocation: !prevFormData.userHasLocation,
		}))
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}))
	}

	// TODO AVATAR
	// const inputFile = useRef(null)
	// const handleAvatar = () => {
	// 	inputFile.current.click()
	// }
	// const inputAvatar = (e) => {
	// 	e.preventDefault()
	// 	const selectedAvatar = e.target.files[0]
	// 	setAvatar(selectedAvatar)
	// 	changeAvatar(avatar)
	// }

	return (
		<Wrapper>
			<form className='form' onSubmit={handleSubmit}>
				<h3>Edit Profil Kamu</h3>
				{showAlert && <Alert />}
				<div className='form-center'>
					{/* special untuk AVATAR */}

					<label htmlFor='userAvatar'>Gambar Profil:</label>
					<UploadAvatarBase64 />

					{/* <Link to='/upload-avatar'>
						<div className='avatar-area'>
							<img
								src={
									formData.userAvatar === 'defaultAvatar'
										? defaultAvatar
										: formData.userAvatar
								}
								className='img-avatar'
							/>
						</div>
					</Link> */}
					{/* biodata lain */}

					<FormRow
						type='text'
						labelText='nama'
						name='name'
						value={formData.name}
						handleChange={handleChange}
						required
					/>
					<FormRow
						type='text'
						labelText='email'
						name='email'
						value={formData.email}
						handleChange={handleChange}
						required
					/>
					<FormRowSelect
						labelText='Jenis Kelamin'
						name='userGender'
						value={formData.userGender}
						list={userGenderOptions}
						handleChange={handleChange}
						required
					/>
					<FormRowNumber
						name='userAge'
						labelText='Umur Anda'
						value={formData.userAge}
						handleChange={handleChange}
						required
					/>
					<FormRow
						labelText='Asal Kota Anda'
						name='userHomeTown'
						value={formData.userHomeTown}
						handleChange={handleChange}
						required
					/>
					<FormRowSelect
						labelText='Status Pekerja/Pelajar'
						name='userStatus'
						value={formData.userStatus}
						list={userStatusOptions}
						handleChange={handleChange}
						required
					/>
					{formData.userStatus === 'Pekerja' && (
						<FormRow
							labelText='Pekerjaan Anda'
							name='userJob'
							value={formData.userJob}
							handleChange={handleChange}
							required
						/>
					)}
					{formData.userStatus === 'Pelajar' && (
						<FormRow
							labelText='Jurusan Anda'
							name='userMajor'
							value={formData.userMajor}
							handleChange={handleChange}
							required
						/>
					)}
					<FormRowSelect
						labelText='Agama'
						name='userReligion'
						value={formData.userReligion}
						list={userReligionOptions}
						handleChange={handleChange}
						required
					/>
					<FormRowNumber
						labelText='Pilih maksimal perkiraan budget anda untuk indekos'
						name='userBudget'
						value={formData.userBudget}
						handleChange={handleChange}
						step='100000'
						min='500000'
						required
					/>
					<FormRowDescription
						labelText='Tentang anda'
						name='userDescription'
						value={formData.userDescription}
						handleChange={handleChange}
						required
					/>
					<br />
					<div className='form-inside'>
						<div className='form-row'>
							<label htmlFor='userHasLocation'>
								<h3>
									<b>
										{formData.userHasLocation
											? 'Kamu sudah punya kamar kost!'
											: 'Apakah kamu sudah punya kamar kost untuk dibagi?'}
									</b>
								</h3>
							</label>
							<button
								className='btn btn-block btn-hipster'
								style={{ textTransform: 'none' }}
								onClick={toggleHasLocation}
							>
								{formData.userHasLocation
									? 'Kamar kost yang sudah aku daftarkan tidak berlaku lagi...'
									: 'Aku sudah punya kamar kost!'}
							</button>
						</div>
						{formData.userHasLocation && (
							<FormRow
								labelText='Alamat Kost'
								name='userLocation'
								value={formData.userLocation}
								placeholder='Alamat kost kamu...'
								handleChange={handleChange}
								required
							/>
						)}
						{formData.userHasLocation && (
							<FormRowNumber
								labelText='Harga Kamar'
								name='userLocationPrice'
								value={formData.userLocationPrice}
								handleChange={handleChange}
								placeholder='Contoh: 10000000, perkalian 100000'
								step='100000'
								min='100000'
								required
							/>
						)}
					</div>
					<br />
					<button className='btn btn-block' type='submit' disabled={isLoading}>
						{isLoading ? 'Tunggu sebentar....' : 'Simpan perubahan'}
					</button>
				</div>
			</form>
			<br />
			<br />
			<br />
			<div className='form'>
				{showAlert && <Alert />}

				{formData.userFoundPartner ? (
					<h1>Kamu ingin cari KawanKos lagi?</h1>
				) : (
					<h1>Apakah kamu sudah mendapatkan KawanKos?</h1>
				)}
				{formData.userFoundPartner ? (
					<p>
						Kalau kamu masih mau mencari KawanKos lagi, silahkan tekan tombol di
						bawah ya! Nanti kamu hadir lagi di pencarian pengguna lain, selamat
						mencari!
					</p>
				) : (
					<p>
						Apabila kamu sudah mendapatkan KawanKos, kamu dapat menekan tombol
						di bawah. Kamu tidak dapat ditemukan dalam pencarian pengguna lain
						ketika kamu menekan tombol di bawah ini. Tenang saja, proses ini
						dapat dikembalikan dengan mudah kok!
					</p>
				)}

				<button
					onClick={toggleFoundButton}
					type='button'
					disabled={isLoading}
					className='btn btn-block'
				>
					{isLoading
						? 'Tunggu sebentar...'
						: formData.userFoundPartner
						? 'Iya, aku ingin mencari KawanKos lagi!'
						: 'Sudah mendapatkan KawanKos!'}
				</button>

				{foundButton && (
					<>
						<br /> <br />
						<img src={dangerImg} alt='danger' className='img img-danger' />
						<br />
						<h3>Kamu yakin dengan perubahan ini?</h3>
						{formData.userFoundPartner ? (
							<p>
								Jika kamu menekan "Ya" maka kamu dapat dicari dan mencari
								pengguna lain.
							</p>
						) : (
							<p>
								Jika kamu menekan "Ya" maka kamu tidak akan bisa dicari dan
								mencari pengguna lain.
							</p>
						)}
						<button
							className='btn btn-danger btn-block'
							type='button'
							disabled={isLoading}
							onClick={handleFoundButton}
						>
							{isLoading ? 'Tunggu sebentar...' : 'Ya, saya mengerti'}
						</button>
						<br /> <br />
						<button
							className='btn btn-hipster btn-block'
							type='button'
							disabled={isLoading}
							onClick={toggleFoundButton}
						>
							{isLoading ? 'Tunggu sebentar...' : 'Batal'}
						</button>
					</>
				)}

				{/* <button
					className='btn btn-danger btn-block'
					type='button'
					disabled={isLoading}
					onClick={handleFoundButton}
				>
					{isLoading
						? 'Tunggu sebentar...'
						: formData.userFoundPartner
						? 'Iya, aku ingin mencari KawanKos lagi!'
						: 'Sudah mendapatkan KawanKos!'}
				</button> */}
			</div>
		</Wrapper>
	)
}
export default Profile

// * Previous unoptimized

// import { useState } from 'react'
// import {
// 	FormRow,
// 	Alert,
// 	FormRowSelect,
// 	FormRowDescription,
// 	FormRowNumber,
// } from '../../components'
// import { useAppContext } from '../../context/appContext'
// import Wrapper from '../../assets/wrappers/DashboardFormPage'

// const Profile = () => {
// 	const {
// 		user,
// 		showAlert,
// 		displayAlert,
// 		updateUser,
// 		isLoading,
// 		userGenderOptions,
// 		userStatusOptions,
// 		userReligionOptions,
// 		updateUserFoundPartner,
// 	} = useAppContext()
// 	const [name, setName] = useState(user?.name)
// 	const [email, setEmail] = useState(user?.email)

// 	//biodata
// 	const [userDescription, setUserDescription] = useState(user?.userDescription)
// 	const [userGender, setUserGender] = useState(user?.userGender)
// 	const [userAge, setUserAge] = useState(user?.userAge)
// 	const [userReligion, setUserReligion] = useState(user?.userReligion)
// 	const [userStatus, setUserStatus] = useState(user?.userStatus)
// 	const [userMajor, setUserMajor] = useState(user?.userMajor)
// 	const [userJob, setUserJob] = useState(user?.userJob)
// 	const [userBudget, setUserBudget] = useState(user?.userBudget)
// 	const [userAvatar, setUserAvatar] = useState(user?.userAvatar)
// 	const [userHomeTown, setUserHomeTown] = useState(user?.userHomeTown)
// 	const [userFoundPartner, setUserFoundPartner] = useState(
// 		user?.userFoundPartner
// 	)
// 	const [userHasLocation, setUserHasLocation] = useState(user?.userHasLocation)
// 	const [userLocation, setUserLocation] = useState(user?.userLocation)
// 	const [userLocationPrice, setUserLocationPrice] = useState(
// 		user?.userLocationPrice
// 	)

// 	// * remnant of J
// 	// const [lastName, setLastName] = useState(user?.lastName)
// 	// const [location, setLocation] = useState(user?.location)

// 	const handleSubmit = (e) => {
// 		e.preventDefault()
// 		// ! REMOVE while testing
// 		if (
// 			!name ||
// 			!email ||
// 			!userGender ||
// 			!userAge ||
// 			!userHomeTown ||
// 			!userStatus ||
// 			!userReligion ||
// 			(userStatus === 'Pelajar' && !userMajor) ||
// 			(userStatus === 'Pekerja' && !userJob) ||
// 			!userBudget ||
// 			!userDescription ||
// 			(userHasLocation && !userLocation)
// 		) {
// 			displayAlert()
// 			return
// 		}
// 		updateUser({
// 			name,
// 			email,
// 			userGender,
// 			userAge,
// 			userHomeTown,
// 			userStatus,
// 			userReligion,
// 			userMajor,
// 			userJob,
// 			userBudget,
// 			userDescription,
// 			userHasLocation,
// 			userLocation,
// 			userLocationPrice,
// 		})
// 	}

// 	const handleFoundButton = (e) => {
// 		e.preventDefault()
// 		let prev = userFoundPartner
// 		setUserFoundPartner(!prev)
// 		updateUserFoundPartner({ userFoundPartner })
// 	}

// 	const toggleHasLocation = (e) => {
// 		e.preventDefault()
// 		setUserHasLocation(!userHasLocation)
// 	}

// 	return (
// 		<Wrapper>
// 			<form className="deets" onSubmit={handleSubmit}>
// 				<h3>Edit Profil Kamu</h3>
// 				{showAlert && <Alert />}
// 				<div className="deets-center">
// 					<FormRow
// 						type="text"
// 						labelText="nama"
// 						name="name"
// 						value={name}
// 						handleChange={(e) => setName(e.target.value)}
// 					/>
// 					<FormRow
// 						type="text"
// 						labelText="email"
// 						name="email"
// 						value={email}
// 						handleChange={(e) => setEmail(e.target.value)}
// 					/>
// 					<FormRowSelect
// 						labelText="Jenis Kelamin"
// 						name="userGender"
// 						value={userGender}
// 						list={userGenderOptions}
// 						handleChange={(e) => setUserGender(e.target.value)}
// 					/>
// 					<FormRowNumber
// 						name="userAge"
// 						labelText="Umur Anda"
// 						placeholder={userAge}
// 						value={userAge}
// 						handleChange={(e) => setUserAge(e.target.value)}
// 					/>
// 					<FormRow
// 						labelText="Asal Kota Anda"
// 						name="userHomeTown"
// 						value={userHomeTown}
// 						handleChange={(e) => setUserHomeTown(e.target.value)}
// 					/>
// 					<FormRowSelect
// 						labelText="Status Pekerja/Pelajar"
// 						name="userStatus"
// 						value={userStatus}
// 						list={userStatusOptions}
// 						handleChange={(e) => setUserStatus(e.target.value)}
// 					/>
// 					{userStatus === 'Pekerja' && (
// 						<FormRow
// 							labelText="Pekerjaan Anda"
// 							name="userJob"
// 							value={userJob}
// 							handleChange={(e) => setUserJob(e.target.value)}
// 						/>
// 					)}
// 					{userStatus === 'Pelajar' && (
// 						<FormRow
// 							labelText="Jurusan Anda"
// 							name="userMajor"
// 							value={userMajor}
// 							handleChange={(e) => setUserMajor(e.target.value)}
// 						/>
// 					)}
// 					<FormRowSelect
// 						labelText="Agama"
// 						name="userReligion"
// 						value={userReligion}
// 						list={userReligionOptions}
// 						handleChange={(e) => setUserReligion(e.target.value)}
// 					/>
// 					<FormRowNumber
// 						labelText="Pilih maksimal perkiraan budget anda untuk indekos"
// 						name="userBudget"
// 						value={userBudget}
// 						handleChange={(e) => setUserBudget(e.target.value)}
// 						step="100000"
// 						min="500000"
// 					/>
// 					<FormRowDescription
// 						labelText="Tentang anda"
// 						name="userDescription"
// 						value={userDescription}
// 						handleChange={(e) => setUserDescription(e.target.value)}
// 					/>
// 					<div className="form-row">
// 						<label htmlFor="userHasLocation">
// 							Apakah kamu sudah punya kamar kost untuk dibagi?
// 						</label>
// 						<button
// 							className="btn btn-block member-btn"
// 							onClick={toggleHasLocation}
// 						>
// 							{userHasLocation
// 								? 'Aku belum ada kamar kost...'
// 								: 'Aku sudah punya kamar kost!'}
// 						</button>
// 					</div>
// 					{userHasLocation && (
// 						<FormRow
// 							labelText="Alamat Kost"
// 							name="userLocation"
// 							value={userLocation}
// 							placeholder="Alamat kost kamu..."
// 							handleChange={(e) => setUserLocation(e.target.value)}
// 						/>
// 					)}
// 					{userHasLocation && (
// 						<FormRowNumber
// 							labelText="Harga Kamar"
// 							name="userLocationPrice"
// 							value={userLocationPrice}
// 							handleChange={(e) => setUserLocationPrice(e.target.value)}
// 							placeholder="Contoh: 10000000, perkalian 100000"
// 							step="100000"
// 							min="100000"
// 						/>
// 					)}
// 					<button className="btn btn-block" type="submit" disabled={isLoading}>
// 						{isLoading ? 'Tunggu sebentar....' : 'Simpan perubahan'}
// 					</button>
// 				</div>
// 			</form>
// 			<br />
// 			<br />
// 			<br />
// 			<div className="deets">
// 				{userFoundPartner ? (
// 					<h1>Apakah kamu sudah mendapatkan KawanKos?</h1>
// 				) : (
// 					<h1>Kamu ingin cari KawanKos lagi?</h1>
// 				)}
// 				<button
// 					className="btn btn-block"
// 					type="button"
// 					disabled={isLoading}
// 					onClick={handleFoundButton}
// 				>
// 					{isLoading
// 						? 'Tunggu sebentar...'
// 						: userFoundPartner
// 						? 'Iya, aku ingin mencari KawanKos lagi!'
// 						: 'Sudah mendapatkan KawanKos!'}
// 				</button>
// 			</div>
// 		</Wrapper>
// 	)
// }
// export default Profile
