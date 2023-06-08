import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'
import Wrapper from '../../assets/wrappers/ProfileDetails'
import { Link } from 'react-router-dom'
import defaultAvatar from '../../assets/images/defaultAvatar_rekmld.jpg'
import Loading from '../../components/Loading'

const OutboxMessageDetail = () => {
	// DO NOT USE MESSAGEOUTBOX DETAILS
	// SOMEHOW WILL RESET?????????
	const {
		messageOutboxDetailsId,
		messageOutboxDetails,
		getSingleMessageDetailOutbox,
		setProfileDetail,
		isOutboxOrInbox,
		messageFrom,
		messageTitle,
		messageTo,
		messageContent,
	} = useAppContext()

	useEffect(() => {
		getSingleMessageDetailOutbox()
	}, [messageOutboxDetailsId])

	let recipientId = messageTo?._id
	console.log(recipientId)

	// let outDeets = []

	// if (messageOutboxDetails) {
	// 	outDeets = messageOutboxDetails
	// }

	// if (!messageOutboxDetails) {
	// 	return <Loading center />
	// }

	return (
		<Wrapper>
			<div className='form'>
				<h1>Isi Pesan</h1>
				<div className='deets-center'>
					<img
						className='img img-avatar'
						src={
							messageTo.userAvatar === 'defaultAvatar'
								? defaultAvatar
								: messageTo.userAvatar
						}
						alt='avatar'
					/>

					<h2>Nama Penerima:</h2>
					<h5>{messageTo.name}</h5>

					<h2>Judul Pesan:</h2>
					<h5>{messageTitle}</h5>

					<h2>Isi Pesan:</h2>
					<h5>{messageContent}</h5>

					<Link
						to='/profile-detail'
						className='btn'
						onClick={() => setProfileDetail(recipientId)}
					>
						Detail Profil Penerima
					</Link>
				</div>
			</div>
		</Wrapper>
	)
}
export default OutboxMessageDetail
