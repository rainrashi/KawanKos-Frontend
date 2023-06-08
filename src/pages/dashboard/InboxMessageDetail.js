import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'
import Wrapper from '../../assets/wrappers/ProfileDetails'
import { Link } from 'react-router-dom'
import defaultAvatar from '../../assets/images/defaultAvatar_rekmld.jpg'

const InboxMessageDetail = () => {
	const {
		messageInboxDetailsId,
		messageInboxDetails,
		getSingleMessageDetail,
		setReplyMessage,
		setProfileDetail,
	} = useAppContext()

	useEffect(() => {
		getSingleMessageDetail()
	}, [messageInboxDetailsId])

	let senderId = messageInboxDetails.messageFrom._id
	console.log(messageInboxDetails)
	// const {
	// 	messageTo,
	// 	messageFrom,
	// 	messageTitle,
	// 	messageContent,
	// 	messageReplyTo,
	// 	messageSeen,
	// } = messageInboxDetails

	// console.log(messageInboxDetails)

	return (
		<Wrapper>
			<div className='form'>
				<h1>Isi Pesan</h1>
				<div className='form-center'>
					<img
						className='img img-avatar'
						src={
							messageInboxDetails.messageFrom.userAvatar === 'defaultAvatar'
								? defaultAvatar
								: messageInboxDetails.messageFrom.userAvatar
						}
						alt='avatar'
					/>

					<h2>Nama Pengirim:</h2>
					<h5>{messageInboxDetails.messageFrom.name}</h5>

					<h2>Judul Pesan:</h2>
					<h5>{messageInboxDetails.messageTitle}</h5>

					<h2>Isi Pesan:</h2>
					<h5>{messageInboxDetails.messageContent}</h5>

					<Link
						to='/create-message'
						className='btn'
						onClick={() => setReplyMessage(messageInboxDetails._id)}
					>
						Balas Pesan
					</Link>

					<Link
						to='/profile-detail'
						className='btn'
						onClick={() => setProfileDetail(senderId)}
					>
						Detail Profil Pengirim
					</Link>
				</div>
			</div>
		</Wrapper>
	)
}
export default InboxMessageDetail
