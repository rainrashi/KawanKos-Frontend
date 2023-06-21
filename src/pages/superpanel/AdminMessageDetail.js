import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'
import Wrapper from '../../assets/wrappers/ProfileDetails'
import { Link, useNavigate } from 'react-router-dom'
import defaultAvatar from '../../assets/images/defaultAvatar_rekmld.jpg'

//icons
//icons import
import { MdTitle } from 'react-icons/md'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { FaFeatherAlt } from 'react-icons/fa'

const AdminMessageDetail = () => {
	const navigate = useNavigate()

	const {
		messageDetailsId,
		messageDetails,
		getSingleMessageDetailAdm,
		setProfileDetail,
		deleteMessage,
		messageFrom,
		messageTitle,
		messageTo,
		messageContent,
	} = useAppContext()

	const currentMsgDeets = {
		messageFrom: messageFrom,
		messageTitle: messageTitle,
		messageTo: messageTo,
		messageContent: messageContent,
	}

	console.log(currentMsgDeets)

	useEffect(() => {
		if (messageDetailsId) getSingleMessageDetailAdm()
		else navigate('/superpanel/central-dogma')
	}, [messageDetailsId])

	let senderId = currentMsgDeets.messageFrom._id
	let recId = currentMsgDeets.messageTo._id

	const deleteButton = (id) => {
		deleteMessage(id)

		setTimeout(() => {
			navigate('/superpanel/central-dogma')
		}, 2000)
	}

	return (
		<Wrapper>
			<div className='form'>
				<center>
					<h1>Isi Pesan</h1>
				</center>
				<div className='form-center'>
					<div className='deets-row'>
						<img
							className='img img-avatar'
							src={
								currentMsgDeets.messageFrom.userAvatar === 'defaultAvatar'
									? defaultAvatar
									: currentMsgDeets.messageFrom.userAvatar
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
							<h2>{currentMsgDeets.messageFrom.name}</h2>
						</div>
					</div>
					<Link
						to='/superpanel/central-dogma/adm-profile-details'
						className='btn btn-block btn-hipster'
						onClick={() => setProfileDetail(senderId)}
					>
						Detail Profil Pengirim
					</Link>
					<br /> <br />
					<div className='deets-row'>
						<img
							className='img img-avatar'
							src={
								currentMsgDeets.messageTo.userAvatar === 'defaultAvatar'
									? defaultAvatar
									: currentMsgDeets.messageTo.userAvatar
							}
							alt='avatar'
						/>
					</div>
					<div className='deets-row-container'>
						<FaFeatherAlt />
						<div className='deets-content'>
							<label>
								<b>Penerima: </b>
							</label>
							<h2>{currentMsgDeets.messageTo.name}</h2>
						</div>
					</div>
					<Link
						to='/superpanel/central-dogma/adm-profile-details'
						className='btn btn-block btn-hipster'
						onClick={() => setProfileDetail(recId)}
					>
						Detail Profil Penerima
					</Link>
					<br />
					<br />
					<div className='deets-row-container'>
						<MdTitle />
						<div className='deets-content'>
							<label>
								<b>Judul Pesan: </b>
							</label>
							<h2>{currentMsgDeets.messageTitle}</h2>
						</div>
					</div>
					<div className='deets-row-container'>
						<BiMessageSquareDetail />
						<div className='deets-content'>
							<label>
								<b>Isi Pesan: </b>
							</label>
							<p>{currentMsgDeets.messageContent}</p>
						</div>
					</div>
					<button
						type='button'
						className='btn btn-danger btn-block'
						onClick={() => deleteButton(messageDetailsId)}
					>
						HAPUS DATA
					</button>
				</div>
			</div>
		</Wrapper>
	)
}
export default AdminMessageDetail
