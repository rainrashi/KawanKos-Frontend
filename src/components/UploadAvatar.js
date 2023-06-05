import Avatar from 'react-avatar-edit'
import { useState, useEffect } from 'react'

const UploadAvatar = ({ name, labelText, handleAvatar, value, saveAvatar }) => {
	const [src, setSrc] = useState(null)
	const [preview, setPreview] = useState(null)
	const [imageStr, setImageStr] = useState(null)

	const onClose = () => {
		setImageStr(preview)
		setPreview(null)
	}
	const onCrop = (view) => {
		setPreview(view)
	}

	useEffect(() => {}, [preview])

	const handleClick = () => {
		saveAvatar()
	}

	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>
			<Avatar
				label={'Unggah Foto Profil...'}
				width={300}
				height={300}
				onCrop={onCrop}
				onClose={onClose}
				src={src}
			/>
			{(preview || imageStr) && <p>Preview</p>}
			{preview && <img src={preview} className="img" />}
			{!preview && imageStr && (
				<img className="img" src={`data:image/jpeg;base64${imageStr}`} />
			)}
			<div className="center">
				<button onClick={handleClick} className="btn">
					Save Avatar
				</button>
			</div>
		</div>
	)
}
export default UploadAvatar
