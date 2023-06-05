import { useEffect, useState } from 'react'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/WriteMessage'
import { Link, useNavigate } from 'react-router-dom'
import {
	FormRow,
	Alert,
	FormRowSelect,
	FormRowDescription,
} from '../../components'
import defaultAvatar from '../../assets/images/defaultAvatar_rekmld.jpg'

const WriteMessage = () => {
	const {
		isLoading,
		showAlert,
		displayAlert,
		profileDetailId,
		messageRecipientId,
		messageRecipientProfile,
		handleChange,
		clearValues,
		createMessage,
		messageTo,
		messageFrom,
		messageTitle,
		messageContent,
		messageReplyTo,
		messageInboxDetails,
		messageInboxDetailsId,
		isReplying,
		isReplyingToId,
		isReplyingTo,
		setProfileDetail,
	} = useAppContext()

	const [messageSent, setMessageSent] = useState(false)

	const navigate = useNavigate()

	let nextPage = '/profile-detail'
	if (isReplying) {
		nextPage = '/inbox'
	}

	// const penerimaPesan = messageRecipientId

	// messageTo = penerimaPesan

	//turntables reply
	// if (isReplying) {
	// 	messageTitle = 'RE: ' + messageInboxDetails.messageTitle
	// 	messageFrom = messageInboxDetails.messageTo
	// 	messageTo = messageInboxDetails.messageFrom
	// 	messageReplyTo = messageInboxDetailsId
	// }

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!messageTitle || !messageContent) {
			displayAlert()
			return
		}
		createMessage()
		setMessageSent(true)
	}

	const handleMessageInput = (e) => {
		const name = e.target.name
		const value = e.target.value
		handleChange({ name, value })
	}

	useEffect(() => {
		if (messageSent) {
			setTimeout(() => {
				navigate(nextPage)
			}, 3000)
		}
	}, [messageSent, navigate])

	console.log(isReplying)
	console.log(messageTitle)
	console.log(messageFrom)
	console.log(messageTo)
	console.log(messageRecipientProfile)

	return (
		<Wrapper>
			<form className="form">
				<h1>Mengirim pesan</h1>
				{showAlert && <Alert />}
				<div className="form-center">
					{/* message to */}
					{
						<>
							<h3>Pesan akan dikirim ke:</h3>
							<br />
						</>
					}
					{
						<>
							{messageRecipientProfile.userAvatar === 'defaultAvatar' ? (
								<img className="img img-avatar" src={defaultAvatar} />
							) : (
								<img
									className="img img-avatar"
									src={messageRecipientProfile.userAvatar}
								/>
							)}
							<p>
								<center>{messageRecipientProfile.name}</center>
							</p>
						</>
					}
					{/* message title */}
					<FormRow
						type="text"
						labelText="Judul Pesan"
						name="messageTitle"
						value={messageTitle}
						handleChange={handleMessageInput}
						placeholder="Judul pesan..."
					/>
					{/* messagecontent */}
					<FormRowDescription
						labelText="Isi Pesan Anda:"
						placeholder="Isi pesan anda..."
						name="messageContent"
						value={messageContent}
						handleChange={handleMessageInput}
					/>
					{/* btn container A */}
					<div className="btn-container">
						<button
							type="submit"
							className="btn btn-block submit-btn"
							onClick={handleSubmit}
							disabled={isLoading}
						>
							Kirim Pesan
						</button>

						<Link
							to={nextPage}
							className="btn btn-block btn-danger"
							onClick={(e) => {
								// e.preventDefault()
								clearValues()
							}}
						>
							Batal
						</Link>
					</div>
				</div>
			</form>
		</Wrapper>
	)
}
export default WriteMessage
