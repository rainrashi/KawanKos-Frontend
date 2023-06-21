import { ProfilesContainer, PageButtonContainer, Alert } from '../components'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SharedLayout'
import { Navbar } from '../components'
import { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'

const AdminPanel = () => {
	const {
		logoutUser,
		showAlert,
		displayAlert,
		user,
		getProfiles,
		getAllMessages,
		totalMessages,
		totalProfiles,
		allMessages,
		profiles,
		numOfPages,
		deleteMessage,
		setSingleMessageAdm,
		setProfileDetail,
	} = useAppContext()

	useEffect(() => {
		getProfiles()
		getAllMessages()
	}, [totalMessages, totalProfiles])

	const deleteButton = (id) => {
		deleteMessage(id)

		setTimeout(() => {
			getAllMessages()
		}, 1000)
	}

	if (!user) {
		return <Navigate to='/superpanel' />
	}

	return (
		<Wrapper>
			{/* Profiles */}
			<center>
				<h1>Profiles</h1>
			</center>
			{showAlert && <Alert />}
			<h5>Terdapat {totalProfiles} pengguna</h5>
			<div>
				<table>
					<thead>
						<tr>
							<th>ID Pengguna</th>
							<th>Nama</th>
							<th>Sudah ketemu KawanKos?</th>
							<th>Punya Kos?</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{profiles.map((profiles) => {
							return (
								<tr key={profiles._id}>
									<td>{profiles._id}</td>
									<td>
										<b>{profiles.name}</b>
									</td>
									<td>{profiles.userHasFoundPartner ? 'Iya' : 'Tidak'}</td>
									<td>
										{profiles.userHasLocation
											? 'Iya ' +
											  profiles.userLocation +
											  ', ' +
											  profiles.userLocationArea
											: 'Tidak'}
									</td>
									<td>
										<Link
											to={`adm-profile-details`}
											className='btn btn-danger'
											onClick={setProfileDetail(profiles._id)}
										>
											HAPUS DATA
										</Link>
										{/* <button
											type='button'
											className='btn btn-danger'
											onClick={() => deleteButton(messages._id)}
										>
											Hapus
										</button> */}
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>

			{/* MESSAGES */}
			<center>
				<h1>Messages</h1>
			</center>
			{showAlert && <Alert />}
			<h5>Terdapat {totalMessages} pesan</h5>
			<div>
				<table>
					<thead>
						<tr>
							<th>ID Pesan</th>
							<th>Penerima</th>
							<th>Pengirim</th>
							<th>Judul pesan</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{allMessages.map((messages) => {
							return (
								<tr key={messages._id}>
									<td>{messages._id}</td>
									<td>
										<b>{messages.messageTo.name}</b> {'['}
										{messages.messageTo._id}
										{']'}
									</td>
									<td>
										<b>{messages.messageFrom.name}</b> {'['}
										{messages.messageFrom._id} {']'}
									</td>
									<td>{messages.messageTitle}</td>
									<td>
										<Link
											to={`adm-message-details`}
											className='btn btn-danger'
											onClick={setSingleMessageAdm(messages._id)}
										>
											HAPUS DATA
										</Link>
										{/* <button
											type='button'
											className='btn btn-danger'
											onClick={() => deleteButton(messages._id)}
										>
											Hapus
										</button> */}
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			{/* {numOfPages > 1 && <PageButtonContainer />} */}
		</Wrapper>
	)
}
export default AdminPanel
