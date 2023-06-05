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
		numOfPages,
		totalInbox,
		setSingleMessage,
		isOutboxOrInbox,
	} = useAppContext()

	useEffect(() => {
		getInbox()
	}, [])

	console.log(isOutboxOrInbox)

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

	return (
		<Wrapper>
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
											<b>{messages.messageFrom.name}</b>
										) : (
											<p>{messages.messageFrom.name}</p>
										)}
									</td>
									<td>
										{messages.messageSeen ? (
											<b>{messages.messageTitle}</b>
										) : (
											<p>{messages.messageTitle}</p>
										)}
									</td>
									<td>
										<Link
											to={`/inbox-message-detail`}
											className="btn"
											onClick={() => setSingleMessage(messages._id)}
										>
											Buka
										</Link>
										{'  '}
										<button className="btn btn-danger">Hapus</button>
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
