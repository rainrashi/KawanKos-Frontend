import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Logo,
	FormRow,
	Alert,
	FormRowSelect,
	FormRowDescription,
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
	userLocationArea: '',
}

const Register = () => {
	const [values, setValues] = useState(initialState)
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
		userLocationAreaOptions,
	} = useAppContext()
	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember })
	}
	const toggleHasLocation = () => {
		setValues({ ...values, userHasLocation: !values.userHasLocation })
	}

	var passwordPlaceholder = 'Masukkan password anda'

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
			userLocationArea,
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
				userBudget < 500000 ||
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
			userLocationArea,
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
		<Wrapper className='full-page'>
			<form className='form' onSubmit={onSubmit}>
				<Logo />
				<h3>{values.isMember ? 'Login' : 'Register'}</h3>
				{showAlert && <Alert />}
				{/* name input */}
				{!values.isMember && (
					<FormRow
						placeholder='Nama Lengkap Anda'
						labelText='nama lengkap'
						type='text'
						name='name'
						value={values.name}
						handleChange={handleChange}
					/>
				)}
				{/* email input */}
				<FormRow
					placeholder='Email Anda'
					type='email'
					name='email'
					value={values.email}
					handleChange={handleChange}
				/>
				{/* password input */}
				<FormRow
					placeholder={
						(values.isMember && passwordPlaceholder) ||
						(!values.isMember && (passwordPlaceholder = 'Minimal 6 karakter'))
					}
					type='password'
					name='password'
					value={values.password}
					handleChange={handleChange}
				/>
				{/* input biodata */}
				{!values.isMember && (
					//Jenis Kelamin
					<FormRowSelect
						placeholder='Pilih jenis kelamin anda'
						labelText='Jenis Kelamin'
						name='userGender'
						value={values.userGender}
						list={userGenderOptions}
						handleChange={handleChange}
					/>
				)}
				{!values.isMember && (
					<FormRowNumber
						name='userAge'
						placeholder='Umur anda, Contoh: 24'
						labelText='Umur Anda'
						min={18}
						value={values.userAge}
						handleChange={handleChange}
					/>
				)}
				{!values.isMember && (
					//Asal Kota
					<FormRow
						placeholder='Kota asal anda, Contoh: Bekasi'
						labelText='Asal Kota Anda'
						name='userHomeTown'
						value={values.userHomeTown}
						handleChange={handleChange}
					/>
				)}
				{!values.isMember && (
					//Status Pelajar/Pekerja
					<FormRowSelect
						placeholder='Status anda'
						labelText='Status Pekerja/Pelajar'
						name='userStatus'
						value={values.userStatus}
						list={userStatusOptions}
						handleChange={handleChange}
					/>
				)}
				{!values.isMember && values.userStatus === 'Pekerja' && (
					//pekerjaan
					<FormRow
						placeholder='Contoh: Programmer, Designer, dsb.'
						labelText='Pekerjaan Anda'
						name='userJob'
						value={values.userJob}
						handleChange={handleChange}
					/>
				)}
				{!values.isMember && values.userStatus === 'Pelajar' && (
					//jurusan
					<FormRow
						placeholder='Contoh: Teknik Informatika, DKV Animasi, dsb.'
						labelText='Jurusan Anda'
						name='userMajor'
						value={values.userMajor}
						handleChange={handleChange}
					/>
				)}
				{!values.isMember && (
					//Agama
					<FormRowSelect
						placeholder='Pilih agama anda'
						labelText='Agama'
						name='userReligion'
						value={values.userReligion}
						list={userReligionOptions}
						handleChange={handleChange}
					/>
				)}
				{!values.isMember && (
					<FormRowNumber
						labelText='Pilih maksimal perkiraan budget anda untuk indekos'
						name='userBudget'
						value={values.userBudget}
						handleChange={handleChange}
						placeholder='Contoh: 1000000, perkalian 100000'
						step='100000'
						min='500000'
					/>
				)}
				{!values.isMember && (
					//Deskripsi
					<FormRowDescription
						placeholder='Deskripsikan diri anda secara singkat'
						labelText='Tentang anda'
						name='userDescription'
						value={values.userDescription}
						handleChange={handleChange}
					/>
				)}
				{/* HasLocation: True or False */}
				{!values.isMember && (
					<div className='form-row'>
						<label htmlFor='userHasLocation'>
							Apakah kamu sudah punya kamar kost untuk dibagi?
						</label>
						<button
							className='btn btn-block member-btn'
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
						labelText='Alamat Kost'
						name='userLocation'
						value={values.userLocation}
						placeholder='Alamat kost kamu...'
						handleChange={handleChange}
					/>
				)}
				{/* HasLocation: Bagian Jakarta locationArea */}
				{!values.isMember && values.userHasLocation && (
					<FormRowSelect
						placeholder='Area Kost'
						labelText='Area Lokasi'
						name='userLocationArea'
						value={values.userLocationArea}
						list={userLocationAreaOptions}
						handleChange={handleChange}
					/>
				)}
				{/* HasLocation: Harga*/}
				{!values.isMember && values.userHasLocation && (
					<FormRowNumber
						labelText='Harga Kamar'
						name='userLocationPrice'
						value={values.userLocationPrice}
						handleChange={handleChange}
						placeholder='Contoh: 10000000, perkalian 100000'
						step='100000'
						min='100000'
					/>
				)}
				{showAlert && <Alert />}
				<button type='submit' className='btn btn-block' disabled={isLoading}>
					submit
				</button>

				<p>
					{values.isMember
						? 'Belum menjadi anggota?'
						: 'Sudah menjadi anggota?'}
					<button type='button' onClick={toggleMember} className='member-btn'>
						{values.isMember ? 'Mari daftar disini!' : 'Silahkan login.'}
					</button>
				</p>
			</form>
		</Wrapper>
	)
}
export default Register
