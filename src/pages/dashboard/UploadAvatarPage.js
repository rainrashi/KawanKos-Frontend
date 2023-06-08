import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useRef, useState, useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import defaultAvatar from '../../assets/images/defaultAvatar_rekmld.jpg'
import { Alert } from '../../components'

const UploadAvatar = () => {
	const {
		showAlert,
		displayAlert,
		isLoading,
		changeAvatar,
		user,
		userAvatarNew,
		updateUserAvatar,
	} = useAppContext()

	const [userAvatar, setUserAvatar] = useState(user?.userAvatar)
	const [tempHolder, setTempHolder] = useState()

	useEffect(() => {}, [userAvatarNew])

	// TODO AVATAR
	const inputFile = useRef(null)
	const handleAvatar = () => {
		inputFile.current.click()
	}
	const inputAvatar = (e) => {
		e.preventDefault()
		const selectedAvatar = e.target.files[0]
		setTempHolder(selectedAvatar)
		changeAvatar(tempHolder)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const newAvatar = userAvatarNew
		setUserAvatar(newAvatar)
		updateUserAvatar({ userAvatar: userAvatar })
		console.log(userAvatar, userAvatarNew, newAvatar)
	}

	return (
		<Wrapper>
			{/* special untuk AVATAR */}
			<form className='form' onSubmit={handleSubmit}>
				{showAlert && <Alert />}
				<label htmlFor='userAvatar'>Gambar Profil:</label>
				<div className='avatar-area' onClick={handleAvatar}>
					<img
						src={
							userAvatarNew
								? userAvatarNew
								: userAvatar === 'defaultAvatar'
								? defaultAvatar
								: userAvatar
						}
						// className='img-avatar'
					/>
					{/* <AiFillPicture /> */}
				</div>
				<input
					type='file'
					name='userAvatar'
					ref={inputFile}
					onChange={inputAvatar}
					// className='avatar-input'
				/>
				<br />
				<br />
				<button type='submit' className='btn btn-block' disabled={isLoading}>
					{isLoading ? 'Tunggu sebentar....' : 'Simpan Gambar Profil'}
				</button>
			</form>
		</Wrapper>
	)
}
export default UploadAvatar
