import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'
import Wrapper from '../../assets/wrappers/ProfileDetails'
import { Link } from 'react-router-dom'
import defaultAvatar from '../../assets/images/defaultAvatar_rekmld.jpg'

//icons
//icons import
import { MdTitle } from 'react-icons/md'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { FaFeatherAlt } from 'react-icons/fa'

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

	return (
		<Wrapper>
			<div className='form'>
				<center>
					<h1>Isi Pesan (Inbox)</h1>
				</center>
				<div className='form-center'>
					<div className='deets-row'>
						<img
							className='img img-avatar'
							src={
								messageInboxDetails.messageFrom.userAvatar === 'defaultAvatar'
									? defaultAvatar
									: messageInboxDetails.messageFrom.userAvatar
							}
							alt='avatar'
						/>
					</div>

					<div className='deets-row-container'>
						<FaFeatherAlt />
						<div className='deets-content'>
							<label>
								<b>Dikirim oleh: </b>
							</label>
							<h2>{messageInboxDetails.messageFrom.name}</h2>
						</div>
					</div>
					<div className='deets-row-container'>
						<MdTitle />
						<div className='deets-content'>
							<label>
								<b>Judul Pesan: </b>
							</label>
							<h2>{messageInboxDetails.messageTitle}</h2>
						</div>
					</div>
					<div className='deets-row-container'>
						<BiMessageSquareDetail />
						<div className='deets-content'>
							<label>
								<b>Isi Pesan: </b>
							</label>
							<p>{messageInboxDetails.messageContent}</p>
						</div>
					</div>

					<br />

					<Link
						to='/profile-detail'
						className='btn btn-block btn-hipster'
						onClick={() => setProfileDetail(senderId)}
					>
						Detail Profil Pengirim
					</Link>
					<br />
					<br />
					<Link
						to='/create-message'
						className='btn btn-block'
						onClick={() => setReplyMessage(messageInboxDetails._id)}
					>
						Balas Pesan
					</Link>
				</div>
			</div>
		</Wrapper>
	)
}
export default InboxMessageDetail
