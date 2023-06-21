import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
	Landing,
	Register,
	Error,
	ProtectedRoute,
	AdminPanel,
	AdminDoor,
} from './pages'
import {
	AdminMessageDetail,
	AdminUserDetail,
	MessagesPanel,
	UsersPanel,
} from './pages/superpanel'
import {
	Profile,
	Home,
	SharedLayout,
	SharedLayoutAdmin,
	AllProfiles,
	ProfileDetails,
	Inbox,
	WriteMessage,
	InboxMessageDetail,
	OutboxMessageDetail,
	OutboxContainer,
} from './pages/dashboard'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<SharedLayout />
						</ProtectedRoute>
					}
				>
					{/* <Route path='stats' element={<Stats />} /> */}
					<Route index element={<Home />} />
					<Route path='cari-kawankos' element={<AllProfiles />} />
					<Route path='profile' element={<Profile />} />
					<Route path='profile-detail' element={<ProfileDetails />} />
					<Route path='create-message' element={<WriteMessage />} />
					<Route path='inbox' element={<Inbox />} />
					<Route path='inbox-message-detail' element={<InboxMessageDetail />} />
					<Route path='outbox' element={<OutboxContainer />} />
					<Route
						path='outbox-message-detail'
						element={<OutboxMessageDetail />}
					/>
				</Route>

				{/* ADMIN */}
				<Route path='/superpanel'>
					<Route index element={<AdminDoor />} />
					<Route
						path='central-dogma'
						/* element={
							<ProtectedRoute>
								<SharedLayoutAdmin />
							</ProtectedRoute>
						} */
					>
						<Route index element={<AdminPanel />} />
						<Route
							path='adm-message-details'
							element={<AdminMessageDetail />}
						/>
						<Route path='adm-profile-details' element={<AdminUserDetail />} />
					</Route>
				</Route>

				<Route path='/register' element={<Register />} />
				<Route path='/landing' element={<Landing />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
