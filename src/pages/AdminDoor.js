import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'

const initialState = {
	email: '',
	password: '',
}

const AdminDoor = () => {
	const [values, setValues] = useState(initialState)
	const navigate = useNavigate()
	const { user, isLoading, showAlert, displayAlert, setupUser } =
		useAppContext()

	//global state and useNavigate
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	//submit
	const onSubmit = (e) => {
		e.preventDefault()
		const { email, password } = values

		//form validation
		if (!email || !password) {
			displayAlert()
			return
		}
		//end of form validation

		// ! just in case
		if (email === 'papikos@indekos.kos' && password === 'papikos@indekos.kos') {
			//continue
			const currentUser = {
				email,
				password,
			}

			setupUser({
				currentUser,
				endPoint: 'login',
				alertText: 'Login berhasil, mengalihkan ke halaman utama...',
			})
		} else {
			displayAlert()
			return
		}
	}

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate('/superpanel/central-dogma')
			}, 3000)
		}
	}, [user, navigate])

	return (
		<Wrapper className='full-page'>
			<form className='form' onSubmit={onSubmit}>
				{showAlert && <Alert />}

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
					placeholder='password'
					type='password'
					name='password'
					value={values.password}
					handleChange={handleChange}
				/>

				<button
					type='submit'
					className='btn btn-block btn-danger'
					disabled={isLoading}
				>
					Enter.
				</button>

				<Link to='/landing' className='btn btn-block'>
					Tekan untuk kembali
				</Link>
			</form>
		</Wrapper>
	)
}
export default AdminDoor
