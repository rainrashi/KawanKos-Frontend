import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing, Register, Error, ProtectedRoute } from './pages'
import {
	AddJob,
	AllJobs,
	Profile,
	Home,
	SharedLayout,
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
					path="/"
					element={
						<ProtectedRoute>
							<SharedLayout />
						</ProtectedRoute>
					}
				>
					{/* <Route path='stats' element={<Stats />} /> */}
					<Route index element={<Home />} />
					<Route path="cari-kawankos" element={<AllProfiles />} />
					<Route path="profile" element={<Profile />} />
					<Route path="profile-detail" element={<ProfileDetails />} />
					<Route path="create-message" element={<WriteMessage />} />
					<Route path="inbox" element={<Inbox />} />
					<Route path="inbox-message-detail" element={<InboxMessageDetail />} />
					<Route path="outbox" element={<OutboxContainer />} />
					<Route
						path="outbox-message-detail"
						element={<OutboxMessageDetail />}
					/>
					{/* Remnant from J */}
					<Route path="all-jobs" element={<AllJobs />} />
					<Route path="add-job" element={<AddJob />} />
				</Route>
				<Route path="/register" element={<Register />} />
				<Route path="/landing" element={<Landing />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
