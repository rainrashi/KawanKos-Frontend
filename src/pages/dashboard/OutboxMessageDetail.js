import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'
import Wrapper from '../../assets/wrappers/ProfileDetails'
import { Link } from 'react-router-dom'
import defaultAvatar from '../../assets/images/defaultAvatar_rekmld.jpg'
import Loading from '../../components/Loading'

//icons
import { IoSend } from 'react-icons/io5'
import { MdTitle } from 'react-icons/md'
import { BiMailSend } from 'react-icons/bi'

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
				<center>
					<h1>Isi Pesan (Outbox)</h1>
				</center>

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
					<br />

					<div className='deets-row-container'>
						<IoSend />
						<div className='deets-content'>
							<label>
								<b>Pesan ini kamu kirim ke: </b>
							</label>
							<h2>{messageTo.name}</h2>
						</div>
					</div>

					<div className='deets-row-container'>
						<MdTitle />
						<div className='deets-content'>
							<label>
								<b>Judul Pesan: </b>
							</label>
							<h2>{messageTitle}</h2>
						</div>
					</div>

					<div className='deets-row-container'>
						<BiMailSend />
						<div className='deets-content'>
							<label>
								<b>Isi Pesan: </b>
							</label>
							<p>{messageContent}</p>
						</div>
					</div>

					<br />

					<Link
						to='/profile-detail'
						className='btn btn-block btn-hipster'
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
