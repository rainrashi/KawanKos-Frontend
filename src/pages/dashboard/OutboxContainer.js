import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import Loading from '../../components/Loading'
import { Link } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/ProfileDetails'
import placeholderSVG from '../../assets/images/silahkan-cari-KK.svg'

const OutboxContainer = () => {
	const {
		getOutbox,
		userOutboxMessages,
		isLoading,
		totalOutbox,
		setSingleMessageOutbox,
		deleteMessage,
		isOutboxOrInbox,
		page,
		numOfPages,
	} = useAppContext()

	let refreshPage = false

	useEffect(() => {
		getOutbox()
	}, [refreshPage])

	if (isLoading) {
		return <Loading center />
	}

	if (totalOutbox === 0) {
		return (
			<Wrapper>
				{/* <p>Kamu belum mengirimkan pesan ke calon KawanKos.</p> */}
				<img src={placeholderSVG} alt='' className='img img-avatar' />
			</Wrapper>
		)
	}

	console.log(refreshPage)

	const deleteButton = (id) => {
		deleteMessage(id)

		setTimeout(() => {
			getOutbox()
			refreshPage = true
		}, 3000)
	}

	return (
		<Wrapper>
			<div className='form'>
				<center>
					<h1>Outbox</h1>
				</center>
				<h5>
					Kamu telah mengirim {totalOutbox} pesan kepada calon KawanKos kamu!
				</h5>
				<div>
					<table>
						<thead>
							<tr>
								<th>Nama Penerima</th>
								<th>Judul pesan</th>
								<th>Aksi</th>
							</tr>
						</thead>
						<tbody>
							{userOutboxMessages.map((messages) => {
								return (
									<tr key={messages._id}>
										<td>{messages.messageTo.name}</td>
										<td>{messages.messageTitle}</td>
										<td>
											<Link
												to={`/outbox-message-detail`}
												className='btn'
												onClick={() => setSingleMessageOutbox(messages._id)}
											>
												Buka
											</Link>
											{'  '}
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
			</div>
		</Wrapper>
	)
}
export default OutboxContainer
