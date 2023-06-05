import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Logo,
	FormRow,
	Alert,
	FormRowSelect,
	FormRowDate,
	FormRowBudget,
	FormRowDescription,
	UploadAvatar,
	FormRowNumber,
} from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'

const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true,
	userGender: '',
	// userBirthdate: '',
	userAge: 18,
	userHomeTown: '',
	userStatus: '',
	userReligion: '',
	userJob: '',
	userMajor: '',
	userHasLocation: false,
	userLocation: '',
	userLocationPrice: 500000,
	userBudget: 500000,
	userDescription: '',
}

const Register = () => {
	// const [budget, setBudget] = useState(0)
	const [values, setValues] = useState(initialState)
	// const navigate = useNavigate(initialState)
	const navigate = useNavigate()
	const {
		user,
		isLoading,
		showAlert,
		displayAlert,
		setupUser,
		userStatusOptions,
		userGenderOptions,
		userReligionOptions,
	} = useAppContext()
	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember })
	}
	const toggleHasLocation = () => {
		setValues({ ...values, userHasLocation: !values.userHasLocation })
	}

	var passwordPlaceholder = 'Masukkan password anda'

	// const [selectedBirthdate, setSelectedBirthdate] = useState('')
	// * birthdate change
	// const handleBirthdateChange = (e) => {
	// 	setSelectedBirthdate(e.target.value)
	// 	var hbDate = new Date()
	// 	hbDate = selectedBirthdate
	// 	hbDate.toISOString()
	// 	setValues({ ...values, userBirthdate: hbDate })
	// }

	// * birthday picker
	// const BirthdayPickerElement = ({ labelText, name, handleBirthdateChange, value }) => {
	// 	return (
	// 		<div className="form-row">
	// 			<label htmlFor={name} className="form-label">
	// 				{labelText || name}
	// 			</label>
	// 			<input type="date" onSubmit={handleBirthdateChange} value={value} />
	// 			<button type="submit" className="btn btn-primary">submit</button>
	// 		</div>
	// 	)
	// }

	// Avatar handler
	// const handleAvatar = (e) => {
	// 	e.preventDefault()
	// 	const avatar = avatarRef.target.value
	// }

	//global state and useNavigate
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}
	const onSubmit = (e) => {
		e.preventDefault()
		const {
			name,
			email,
			password,
			isMember,
			userGender,
			userAge,
			userHomeTown,
			userStatus,
			userReligion,
			userJob,
			userMajor,
			userHasLocation,
			userLocation,
			userLocationPrice,
			userBudget,
			userDescription,
		} = values

		//form validation
		if (isMember) {
			if (!email || !password) {
				displayAlert()
				return
			}
		}

		if (!isMember) {
			if (
				!email ||
				!password ||
				!name ||
				!userGender ||
				userGender === 'Pilih jenis kelamin anda' ||
				!userAge ||
				!userHomeTown ||
				!userStatus ||
				userStatus === 'Status anda' ||
				!userReligion ||
				userReligion === 'Pilih agama anda' ||
				!userBudget ||
				userBudget === 0 ||
				!userDescription ||
				(userHasLocation && !userLocation)
			) {
				displayAlert()
				return
			}
		}
		//end of form validation

		const currentUser = {
			name,
			email,
			password,
			userGender,
			userAge,
			userStatus,
			userJob,
			userMajor,
			userReligion,
			userBudget,
			userDescription,
			userHomeTown,
			userHasLocation,
			userLocation,
			userLocationPrice,
		}
		if (isMember) {
			setupUser({
				currentUser,
				endPoint: 'login',
				alertText: 'Login berhasil, mengalihkan ke halaman utama...',
			})
		} else {
			setupUser({
				currentUser,
				endPoint: 'register',
				alertText: 'Pendaftaran berhasil, mengalihkan ke halaman utama...',
			})
		}
	}
	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate('/')
			}, 3000)
		}
	}, [user, navigate])

	return (
		<Wrapper className="full-page">
			<form className="form" onSubmit={onSubmit}>
				<Logo />
				<h3>{values.isMember ? 'Login' : 'Register'}</h3>
				{showAlert && <Alert />}
				{/* name input */}
				{!values.isMember && (
					<FormRow
						placeholder="Nama Lengkap Anda"
						labelText="nama lengkap"
						type="text"
						name="name"
						value={values.name}
						handleChange={handleChange}
					/>
				)}
				{/* email input */}
				<FormRow
					placeholder="Email Anda"
					type="email"
					name="email"
					value={values.email}
					handleChange={handleChange}
				/>
				{/* password input */}
				<FormRow
					placeholder={
						(values.isMember && passwordPlaceholder) ||
						(!values.isMember && (passwordPlaceholder = 'Minimal 6 karakter'))
					}
					type="password"
					name="password"
					value={values.password}
					handleChange={handleChange}
				/>
				{/* input biodata */}
				{!values.isMember && (
					//Jenis Kelamin
					<FormRowSelect
						placeholder="Pilih jenis kelamin anda"
						labelText="Jenis Kelamin"
						name="userGender"
						value={values.userGender}
						list={userGenderOptions}
						handleChange={handleChange}
					/>
				)}
				{!values.isMember && (
					//? Tanggal Lahir

					// 	<FormRowDate
					// 	labelText="Tanggal Lahir"
					// 	name="userBirthdate"
					// 	value={values.userBirthdate}
					// 	handleBirthdateChange={handleBirthdateChange}
					// />

					// <BirthdayPickerElement
					// 	labelText="Tanggal Lahir"
					// 	name="userBirthDate"
					// 	handleBirthdateChange={handleBirthdateChange}
					// 	value={values.userBirthdate}
					// />
					<FormRowNumber
						name="userAge"
						placeholder="Umur anda, Contoh: 24"
						labelText="Umur Anda"
						min={18}
						value={values.userAge}
						handleChange={handleChange}
					/>
				)}
				{!values.isMember && (
					//Asal Kota
					<FormRow
						placeholder="Kota asal anda, Contoh: Bekasi"
						labelText="Asal Kota Anda"
						name="userHomeTown"
						value={values.userHomeTown}
						handleChange={handleChange}
					/>
				)}
				{!values.isMember && (
					//Status Pelajar/Pekerja
					<FormRowSelect
						placeholder="Status anda"
						labelText="Status Pekerja/Pelajar"
						name="userStatus"
						value={values.userStatus}
						list={userStatusOptions}
						handleChange={handleChange}
					/>
				)}
				{!values.isMember && values.userStatus === 'Pekerja' && (
					//pekerjaan
					<FormRow
						placeholder="Contoh: Programmer, Designer, dsb."
						labelText="Pekerjaan Anda"
						name="userJob"
						value={values.userJob}
						handleChange={handleChange}
					/>
				)}
				{!values.isMember && values.userStatus === 'Pelajar' && (
					//jurusan
					<FormRow
						placeholder="Contoh: Teknik Informatika, DKV Animasi, dsb."
						labelText="Jurusan Anda"
						name="userMajor"
						value={values.userMajor}
						handleChange={handleChange}
					/>
				)}
				{!values.isMember && (
					//Agama
					<FormRowSelect
						placeholder="Pilih agama anda"
						labelText="Agama"
						name="userReligion"
						value={values.userReligion}
						list={userReligionOptions}
						handleChange={handleChange}
					/>
				)}
				{!values.isMember && (
					//budget
					// <FormRowBudget
					// 	placeholder="Pilih budget anda"
					// 	labelText="Budget Maksimal Anda (Per Rp500.000)"
					// 	name="userBudget"
					// 	value={setValues}
					// 	handleChange={handleChange}
					// />

					<FormRowNumber
						labelText="Pilih maksimal perkiraan budget anda untuk indekos"
						name="userBudget"
						value={values.userBudget}
						handleChange={handleChange}
						placeholder="Contoh: 1000000, perkalian 100000"
						step="100000"
						min="500000"
					/>
				)}
				{!values.isMember && (
					//Deskripsi
					<FormRowDescription
						placeholder="Deskripsikan diri anda secara singkat"
						labelText="Tentang anda"
						name="userDescription"
						value={values.userDescription}
						handleChange={handleChange}
					/>
				)}
				{/* {!values.isMember && (
					// ? Profile Picture pindah ke edit profile aja?
					<UploadAvatar
						labelText="Foto Profil Anda"
						name="userAvatar"
						value={values.userAvatar}
						handleAvatar={handleAvatar}
						saveAvatar={setValues}
					/>
				)} */}
				{/* HasLocation: True or False */}
				{!values.isMember && (
					<div className="form-row">
						<label htmlFor="userHasLocation">
							Apakah kamu sudah punya kamar kost untuk dibagi?
						</label>
						<button
							className="btn btn-block member-btn"
							onClick={toggleHasLocation}
						>
							{values.userHasLocation
								? 'Aku belum ada kamar kost...'
								: 'Aku sudah punya kamar kost!'}
						</button>
					</div>
				)}
				{/* HasLocation: Alamat*/}
				{!values.isMember && values.userHasLocation && (
					<FormRow
						labelText="Alamat Kost"
						name="userLocation"
						value={values.userLocation}
						placeholder="Alamat kost kamu..."
						handleChange={handleChange}
					/>
				)}
				{/* HasLocation: Harga*/}
				{!values.isMember && values.userHasLocation && (
					<FormRowNumber
						labelText="Harga Kamar"
						name="userLocationPrice"
						value={values.userLocationPrice}
						handleChange={handleChange}
						placeholder="Contoh: 10000000, perkalian 100000"
						step="100000"
						min="100000"
					/>
				)}
				{!values.isMember &&
					// TODO: Profile Picture (maybe pindah ke edit profile, backend upload ok),
					//! punya indekos dan dimana?, BUDGET!!!
					console.log(values)}
				{showAlert && <Alert />}
				<button type="submit" className="btn btn-block" disabled={isLoading}>
					submit
				</button>
				{/* <button
					type="button"
					className="btn btn-block btn-hipster"
					disabled={isLoading}
					onClick={() => {
						setupUser({
							currentUser: {
								// name: 'Test User Alpha',
								email: 'testUser@test.com',
								password: 'secret',
								// userGender: 'Laki-laki',
								// userAvatar: 'defaultAvatar',
								// userAge: 23,
								// userHomeTown: 'Bogor',
								// userStatus: 'Pelajar',
								// userReligion: 'Islam',
								// userMajor: 'Teknik Informatika',
								// userBudget: '1000000',
								// userDescription:
								// 	'Halo, saya adalah test user. Harap tes aplikasi ini sesuai kemampuan kamu ya, salam dari Mr.A',
							},
							// endPoint: 'register',
							endPoint: 'login',
							alertText: 'Login sebagai TEST USER! Mengalihkan...',
						})
					}}
				>
					{isLoading ? 'Memuat...' : 'Demo User'}
				</button> */}
				<p>
					{values.isMember
						? 'Belum menjadi anggota?'
						: 'Sudah menjadi anggota?'}
					<button type="button" onClick={toggleMember} className="member-btn">
						{values.isMember ? 'Mari daftar disini!' : 'Silahkan login.'}
					</button>
				</p>
			</form>
		</Wrapper>
	)
}
export default Register
