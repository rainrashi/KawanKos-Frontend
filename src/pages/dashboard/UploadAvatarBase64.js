import { useEffect, useState } from 'react'
import Avatar from 'react-avatar-edit'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useAppContext } from '../../context/appContext'
import defaultAvatar from '../../assets/images/defaultAvatar_rekmld.jpg'

const UploadAvatarBase64 = () => {
	const { user, userAvatarNew, isLoading, updateUserAvatar } = useAppContext()

	const [src, setSrc] = useState(null)
	const [preview, setPreview] = useState(null)
	const [userAvatar, setUserAvatar] = useState(user?.userAvatar)
	const [isChangingAvatar, setIsChangingAvatar] = useState(false)
	const [basedAvatar, setBasedAvatar] = useState()

	const onClose = () => {
		setPreview(null)
	}

	const onCrop = (view) => {
		setPreview(view)
	}

	useEffect(() => {
		console.log('pre: ' + preview)
		if (basedAvatar) {
			setTimeout(() => {
				updateUserAvatar({ userAvatar: basedAvatar })
			}, 5000)
		}
	}, [preview, basedAvatar])

	const handleClick = (e) => {
		e.preventDefault()
		setBasedAvatar(preview)
		console.log('based: ' + basedAvatar)
		updateUserAvatar({ userAvatar: basedAvatar })
		toggleChangeAvatar(e)
	}

	// * just in case, base64 to img
	// basedContainer = `data:image/jpeg;base64,${data}`

	const toggleChangeAvatar = (e) => {
		e.preventDefault()
		setPreview(null)
		setIsChangingAvatar(!isChangingAvatar)
	}

	return (
		<div className='form-avatar'>
			{!isChangingAvatar ? (
				<>
					{/* <img
						className='img img-preview'
						// src={userAvatar === 'defaultAvatar' ? defaultAvatar : userAvatar}
						src={userAvatar}
						alt=''
					/> */}
					{/* keep it as preview */}
					<img
						className='img img-preview'
						src={basedAvatar ? basedAvatar : userAvatar}
					/>
				</>
			) : (
				<>
					<div className='form-centercontainer'>
						<Avatar
							width={200}
							height={200}
							onCrop={onCrop}
							onClose={onClose}
							src={src}
							// exportMimeType='image/jpeg'
							imageWidth={200}
						/>
					</div>
					<br />
					<br />
					<div>
						{preview && (
							<>
								<img className='img img-preview' src={preview} alt='' />
								<br />
								<br />
								<button
									onClick={handleClick}
									className='btn btn-block'
									disabled={isLoading}
								>
									{isLoading ? 'Tunggu sebentar....' : 'Simpan Gambar'}
								</button>
							</>
						)}
					</div>
				</>
			)}
			<br />

			{isChangingAvatar ? (
				<button
					className='btn btn-block btn-danger'
					onClick={toggleChangeAvatar}
				>
					Batal
				</button>
			) : (
				<button
					className='btn btn-block btn-hipster'
					onClick={toggleChangeAvatar}
				>
					Ganti Avatar
				</button>
			)}
		</div>
	)
}
export default UploadAvatarBase64
