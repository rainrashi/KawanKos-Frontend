import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import Loading from '../../components/Loading'
import PageButtonContainer from '../../components/PageBtnContainer'
import { CiRead, CiUnread } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/ProfileDetails'

const Inbox = () => {
	const {
		getInbox,
		userInboxMessages,
		isLoading,
		page,
		isOutboxOrInbox,
		numOfPages,
		setSingleMessage,
		deleteMessage,
		totalInbox,
	} = useAppContext()

	let refreshPage = false

	useEffect(() => {
		getInbox()
	}, [refreshPage])

	if (isLoading) {
		return <Loading center />
	}

	if (userInboxMessages.length === 0) {
		return (
			<Wrapper>
				<h1>Inbox anda kosong.</h1>
			</Wrapper>
		)
	}

	const deleteButton = (id) => {
		deleteMessage(id)

		setTimeout(() => {
			getInbox()
			refreshPage = true
		}, 3000)
	}

	return (
		<Wrapper>
			<center>
				<h1>Inbox</h1>
			</center>
			<h5>Terdapat {userInboxMessages.length} pesan dalam inbox anda</h5>
			<div>
				<table>
					<thead>
						<tr>
							<th>Terbaca?</th>
							<th>Nama Pengirim</th>
							<th>Judul pesan</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{userInboxMessages.map((messages) => {
							return (
								<tr key={messages._id}>
									<td>{messages.messageSeen ? <CiRead /> : <CiUnread />}</td>
									<td>
										{messages.messageSeen ? (
											<>{messages.messageFrom.name}</>
										) : (
											<b>{messages.messageFrom.name}</b>
										)}
									</td>
									<td>
										{messages.messageSeen ? (
											<>{messages.messageTitle}</>
										) : (
											<b>{messages.messageTitle}</b>
										)}
									</td>
									<td>
										<Link
											to={`/inbox-message-detail`}
											className='btn'
											onClick={() => setSingleMessage(messages._id)}
										>
											Buka
										</Link>
										<button
											type='button'
											className='btn btn-danger'
											onClick={() => deleteButton(messages._id)}
										>
											Hapus
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			{numOfPages > 1 && <PageButtonContainer />}
		</Wrapper>
	)
}
export default Inbox
