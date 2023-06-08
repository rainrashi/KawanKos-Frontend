import React, { useReducer, useContext } from 'react'
import reducer from './reducer'
import axios from 'axios'

import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_ERROR,
	SETUP_USER_SUCCESS,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
	UPDATE_USER_BEGIN,
	UPDATE_USER_ERROR,
	UPDATE_USER_SUCCESS,
	HANDLE_CHANGE,
	CLEAR_VALUES,
	CREATE_JOB_BEGIN,
	CREATE_JOB_SUCCESS,
	CREATE_JOB_ERROR,
	GET_JOBS_BEGIN,
	GET_JOBS_SUCCESS,
	SET_EDIT_JOB,
	DELETE_JOB_BEGIN,
	EDIT_JOB_BEGIN,
	EDIT_JOB_SUCCESS,
	EDIT_JOB_ERROR,
	CLEAR_FILTERS,
	GET_PROFILES_BEGIN,
	GET_PROFILES_SUCCESS,
	CHANGE_PAGE,
	SET_PROFILE_DETAILS,
	PROFILE_DETAIL_BEGIN,
	PROFILE_DETAIL_SUCCESS,
	PROFILE_DETAIL_ERROR,
	MESSAGE_SEND_BEGIN,
	SET_MESSAGE_RECIPIENT,
	MESSAGE_SEND_SUCCESS,
	MESSAGE_SEND_ERROR,
	GET_INBOX_BEGIN,
	GET_INBOX_SUCCESS,
	SET_MESSAGE_DETAILS,
	MESSAGE_DETAIL_BEGIN,
	MESSAGE_DETAIL_SUCCESS,
	MESSAGE_DETAIL_ERROR,
	SET_REPLY_MESSAGE,
	GET_OUTBOX_BEGIN,
	GET_OUTBOX_SUCCESS,
	SET_OUTBOX_DETAILS,
	OUTBOX_DETAIL_BEGIN,
	OUTBOX_DETAIL_SUCCESS,
	OUTBOX_DETAIL_ERROR,
	UPLOADING_AVATAR_BEGIN,
	UPLOADING_AVATAR_SUCCESS,
	UPLOADING_AVATAR_ERROR,
} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
// const userLocation = localStorage.getItem('location')

const initialState = {
	// * init
	isLoading: false,
	showAlert: false,
	alertText: '',
	alertType: '',
	user: user ? JSON.parse(user) : null,
	token: token,
	isEditing: false,
	// * search all
	profiles: [],
	totalProfiles: 0,
	// * pagination
	numOfPages: 1,
	page: 1,
	// * search n options + init
	search: '',
	searchUserJob: '',
	searchUserMajor: '',
	searchUserHomeTown: '',
	searchUserStatus: 'semua',
	searchUserGender: 'semua',
	searchUserReligion: 'semua',
	searchUserHasLocation: 'semua',
	sort: 'Pengguna terbaru',
	sortOptions: [
		'Pengguna terbaru',
		'Pengguna terlama',
		'A-Z',
		'Z-A',
		'Budget terendah',
		'Budget tertinggi',
		'Umur termuda',
		'Umur tertua',
	],
	userStatusOptions: ['Pekerja', 'Pelajar'],
	userStatus: 'Pelajar',
	userGenderOptions: ['Laki-laki', 'Perempuan'],
	userGender: 'Laki-laki',
	userReligionOptions: [
		'Islam',
		'Kristen Protestan',
		'Katolik',
		'Hindu',
		'Buddha',
		'Konghucu',
		'Lainnya',
	],
	userReligion: 'Lainnya',
	// userDescription: '',
	// userAvatar: 'defaultAvatar',
	// userAge: 18,
	// userMajor: '',
	// userBudget: 500000,
	// * Profile details
	profileDetailId: '',
	profileDetails: [],
	// * Message
	isOutboxOrInbox: '',
	totalInbox: 0,
	userInboxMessages: [],
	totalOutbox: 0,
	userOutboxMessages: [],
	messageRecipientId: '',
	messageRecipientProfile: [],
	messageOutboxDetailsId: '',
	messageOutboxDetails: [],
	messageInboxDetailsId: '',
	messageInboxDetails: [],
	isReplying: false,
	isReplyingTo: [],
	isReplyingToId: '',
	// * Message init
	messageTo: '',
	messageFrom: '',
	messageTitle: '',
	messageContent: '',
	messageReplyTo: '',
	//avatarUploadURL
	userAvatarNew: '',
	// * Remnants of J
	editJobId: '',
	position: '',
	company: '',
	// userLocation: userLocation || '',
	// showLocation: false,
	jobs: [],
	totalJobs: 0,
	jobLocation: '',
	jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
	jobType: 'full-time',
	statusOptions: ['interview', 'declined', 'pending'],
	status: 'pending',
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	//axios setup
	const authFetch = axios.create({
		baseURL: 'api/v1',
		headers: {
			Authorization: `Bearer ${state.token}`,
		},
	})

	//request interceptor
	/* authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  ) */

	//response interceptor
	authFetch.interceptors.response.use(
		(response) => {
			return response
		},
		(error) => {
			console.log(error)
			if (error.response.status === 401) {
				logoutUser()
			}
			return Promise.reject(error)
		}
	)

	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT })
		clearAlert()
	}
	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT })
		}, 5000)
	}

	//local storage
	const addUserToLocalStorage = ({ user, token }) => {
		localStorage.setItem('user', JSON.stringify(user))
		localStorage.setItem('token', JSON.stringify(token))
		// localStorage.setItem('location', JSON.stringify(location))
	}
	const removeUserFromLocalStorage = () => {
		localStorage.removeItem('user')
		localStorage.removeItem('token')
		// localStorage.removeItem('location')
	}

	const setupUser = async ({ currentUser, endPoint, alertText }) => {
		dispatch({ type: SETUP_USER_BEGIN })
		try {
			const response = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
			// const { user, token, location } = response.data
			const { user, token } = response.data
			dispatch({
				type: SETUP_USER_SUCCESS,
				// payload: { user, token, location, alertText },
				payload: { user, token, alertText },
			})
			// addUserToLocalStorage({ user, token, location })
			addUserToLocalStorage({ user, token })
		} catch (error) {
			dispatch({
				type: SETUP_USER_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
		clearAlert()
	}

	const toggleSidebar = () => {
		dispatch({ type: TOGGLE_SIDEBAR })
	}

	//logout
	const logoutUser = () => {
		dispatch({ type: LOGOUT_USER })
		removeUserFromLocalStorage()
	}

	//updateUser
	const updateUser = async (currentUser) => {
		dispatch({ type: UPDATE_USER_BEGIN })
		try {
			const { data } = await authFetch.patch('/auth/updateUser', currentUser)

			// const { user, location, token } = data
			const { user, token } = data

			dispatch({
				type: UPDATE_USER_SUCCESS,
				// payload: { user, location, token },
				payload: { user, token },
			})
			// addUserToLocalStorage({ user, token, location })
			addUserToLocalStorage({ user, token })
		} catch (error) {
			if (error.response.status !== 401) {
				dispatch({
					type: UPDATE_USER_ERROR,
					payload: { msg: error.response.data.msg },
				})
			}
		}
	}

	//updateUserFoundPartner
	const updateUserFoundPartner = async (currentUser) => {
		dispatch({ type: UPDATE_USER_BEGIN })
		try {
			const { data } = await authFetch.patch(
				'/auth/updateUserFoundPartner',
				currentUser
			)

			// const { user, location, token } = data
			const { user, token } = data

			dispatch({
				type: UPDATE_USER_SUCCESS,
				// payload: { user, location, token },
				payload: { user, token },
			})
			// addUserToLocalStorage({ user, token, location })
			addUserToLocalStorage({ user, token })
		} catch (error) {
			if (error.response.status !== 401) {
				dispatch({
					type: UPDATE_USER_ERROR,
					payload: { msg: error.response.data.msg },
				})
			}
		}
	}

	//clear
	const clearValues = () => {
		dispatch({ type: CLEAR_VALUES })
	}

	// CARI ALL KAWANKOS
	const getProfiles = async () => {
		const {
			page,
			search,
			searchUserHomeTown,
			searchUserJob,
			searchUserMajor,
			searchUserStatus,
			searchUserGender,
			searchUserReligion,
			searchUserHasLocation,
			sort,
		} = state
		// let url = `/profiles?page=${page}&userStatus=${searchUserStatus}&userGender=${searchUserGender}&userReligion=${searchUserReligion}&userHasLocation=${searchUserHasLocation}&sort=${sort}`

		// if (search) {
		// 	url = url + `&search=${search}`
		// }
		// if (searchUserHomeTown) {
		// 	url = url + `&userHomeTown=${searchUserHomeTown}`
		// }
		// if (searchUserJob) {
		// 	url = url + `&userJob=${searchUserJob}`
		// }
		// if (searchUserMajor) {
		// 	url = url + `&userMajor=${searchUserMajor}`
		// }

		const queryParams = {
			page,
			userStatus: searchUserStatus,
			userGender: searchUserGender,
			userReligion: searchUserReligion,
			userHasLocation: searchUserHasLocation,
			sort,
		}

		if (search) {
			queryParams.search = search
		}
		if (searchUserHomeTown) {
			queryParams.userHomeTown = searchUserHomeTown
		}
		if (searchUserJob) {
			queryParams.userJob = searchUserJob
		}
		if (searchUserMajor) {
			queryParams.userMajor = searchUserMajor
		}

		const queryString = new URLSearchParams(queryParams).toString()
		const url = `/profiles?${queryString}`

		dispatch({ type: GET_PROFILES_BEGIN })
		try {
			const { data } = await authFetch(url)
			const { profiles, totalProfiles, numOfPages } = data
			dispatch({
				type: GET_PROFILES_SUCCESS,
				payload: {
					profiles,
					totalProfiles,
					numOfPages,
				},
			})
		} catch (error) {
			console.log(error.response)
			// * logoutUser()
		}
		clearAlert()
	}

	// * Detail Profil
	const setProfileDetail = (id) => {
		dispatch({ type: SET_PROFILE_DETAILS, payload: { id } })
	}
	const profileDetail = async () => {
		dispatch({ type: PROFILE_DETAIL_BEGIN })
		try {
			const { data } = await authFetch.get(`profiles/${state.profileDetailId}`)
			const { profileDetails } = data
			dispatch({
				type: PROFILE_DETAIL_SUCCESS,
				payload: {
					profileDetails,
				},
			})
		} catch (error) {
			if (error.response.status === 401) return
			dispatch({
				type: PROFILE_DETAIL_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
		clearAlert()
	}

	// Kirim Pesan
	const setMessageRecipient = async (id) => {
		dispatch({ type: SET_MESSAGE_RECIPIENT, payload: { id } })
	}

	const createMessage = async () => {
		dispatch({ type: MESSAGE_SEND_BEGIN })
		try {
			const {
				messageRecipientId,
				messageFrom,
				messageTitle,
				messageContent,
				messageReplyTo,
			} = state

			const messageTo = messageRecipientId

			await authFetch.post(`/messages/create/${state.messageRecipientId}`, {
				messageTo,
				messageFrom,
				messageTitle,
				messageContent,
				messageReplyTo,
			})
			dispatch({ type: MESSAGE_SEND_SUCCESS })
			dispatch({ type: CLEAR_VALUES })
		} catch (error) {
			if (error.response.status === 401) return
			dispatch({
				type: MESSAGE_SEND_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
		clearAlert()
	}

	// Inbox
	const getInbox = async () => {
		let url = `/messages`

		dispatch({ type: GET_INBOX_BEGIN })
		try {
			const { data } = await authFetch(url)
			const { userInboxMessages, totalInbox, numOfPages } = data
			dispatch({
				type: GET_INBOX_SUCCESS,
				payload: {
					userInboxMessages,
					totalInbox,
					numOfPages,
				},
			})
		} catch (error) {
			console.log(error.response)
			logoutUser()
		}
		clearAlert()
	}

	// TODO Outbox
	const getOutbox = async () => {
		let url = `/messages/outbox`

		dispatch({ type: GET_OUTBOX_BEGIN })
		try {
			const { data } = await authFetch(url)
			const { userOutboxMessages, totalOutbox, numOfPages } = data
			dispatch({
				type: GET_OUTBOX_SUCCESS,
				payload: {
					userOutboxMessages,
					totalOutbox,
					numOfPages,
				},
			})
		} catch (error) {
			console.log(error.response)
			logoutUser()
		}
		clearAlert()
	}

	// TODO Single Message View, OUtbox trial failed, pisah aja
	const setSingleMessage = (id) => {
		dispatch({ type: SET_MESSAGE_DETAILS, payload: { id } })
	}
	const getSingleMessageDetail = async () => {
		// const messageType = state.isOutboxOrInbox
		dispatch({ type: MESSAGE_DETAIL_BEGIN })
		try {
			/* if (messageType === 'inbox') {
				const { data } = await authFetch.get(
					`messages/${state.messageInboxDetailsId}`
				)
				const { messageInboxDetails } = data
				dispatch({
					type: MESSAGE_DETAIL_SUCCESS,
					payload: {
						messageInboxDetails,
					},
				})
			} else if (messageType === 'outbox') {
				const { data } = await authFetch.get(
					`messages/${state.messageOutboxDetailsId}`
				)
				const { messageOutboxDetails } = data
				dispatch({
					type: MESSAGE_DETAIL_SUCCESS,
					payload: {
						messageOutboxDetails,
					},
				})
			} */
			const { data } = await authFetch.get(
				`messages/${state.messageInboxDetailsId}`
			)
			const { messageInboxDetails } = data
			dispatch({
				type: MESSAGE_DETAIL_SUCCESS,
				payload: {
					messageInboxDetails,
				},
			})
		} catch (error) {
			if (error.response.status === 401) return
			dispatch({
				type: MESSAGE_DETAIL_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
		clearAlert()
	}

	// TODO outbox single message
	const setSingleMessageOutbox = (id) => {
		dispatch({ type: SET_OUTBOX_DETAILS, payload: { id } })
	}
	const getSingleMessageDetailOutbox = async () => {
		dispatch({ type: OUTBOX_DETAIL_BEGIN })
		try {
			const { data } = await authFetch.get(
				`messages/${state.messageOutboxDetailsId}`
			)
			const { messageOutboxDetails } = data
			dispatch({
				type: OUTBOX_DETAIL_SUCCESS,
				payload: {
					messageOutboxDetails,
				},
			})
		} catch (error) {
			if (error.response.status === 401) return
			dispatch({
				type: OUTBOX_DETAIL_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
		clearAlert()
	}

	// TODO Set Reply
	const setReplyMessage = (id) => {
		dispatch({ type: SET_REPLY_MESSAGE, payload: { id } })
	}

	// * Search

	//handle change
	const handleChange = ({ name, value }) => {
		dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
	}

	// Clear Filters
	const clearFilters = () => {
		dispatch({ type: CLEAR_FILTERS })
	}

	//pagination - change page
	const changePage = (page) => {
		dispatch({ type: CHANGE_PAGE, payload: { page } })
	}

	//avatar with backend
	const changeAvatar = async (avatarData) => {
		dispatch({ type: UPLOADING_AVATAR_BEGIN })
		try {
			const { userAvatarNew } = state
			// ambil file
			const file = avatarData
			let formData = new FormData()
			formData.append('avatar', file)

			//upload ke cloud
			const res = await authFetch.post('/uploads', formData, {
				headers: {
					'content-type': 'multipart/form-data',
				},
			})
			userAvatarNew = res.data.url
			dispatch({ type: UPLOADING_AVATAR_SUCCESS, payload: userAvatarNew })
			console.log(res.data.url)
			console.log(userAvatarNew)
		} catch (error) {
			dispatch({
				type: UPLOADING_AVATAR_ERROR,
				payload: { msg: error.response.data.msg },
			})
			console.log('upload gagal')
		}
	}

	//updateUserAvatar
	const updateUserAvatar = async (currentUser) => {
		dispatch({ type: UPDATE_USER_BEGIN })
		try {
			const { data } = await authFetch.patch(
				'/auth/updateUserAvatar',
				currentUser
			)

			// const { user, location, token } = data
			const { user, token } = data

			setTimeout(() => {
				dispatch({
					type: UPDATE_USER_SUCCESS,
					// payload: { user, location, token },
					payload: { user, token },
				})
				// addUserToLocalStorage({ user, token, location })
				addUserToLocalStorage({ user, token })
			}, 5000)
		} catch (error) {
			if (error.response.status !== 401) {
				dispatch({
					type: UPDATE_USER_ERROR,
					payload: { msg: error.response.data.msg },
				})
			}
		}
	}

	// * Remnants of J
	//create job
	const createJob = async () => {
		dispatch({ type: CREATE_JOB_BEGIN })
		try {
			const { position, company, jobLocation, jobType, status } = state
			await authFetch.post('/jobs', {
				position,
				company,
				jobLocation,
				jobType,
				status,
			})
			dispatch({ type: CREATE_JOB_SUCCESS })
			dispatch({ type: CLEAR_VALUES })
		} catch (error) {
			if (error.response.status === 401) return
			dispatch({
				type: CREATE_JOB_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
		clearAlert()
	}

	const getJobs = async () => {
		let url = `/jobs`

		dispatch({ type: GET_JOBS_BEGIN })
		try {
			const { data } = await authFetch(url)
			const { jobs, totalJobs, numOfPages } = data
			dispatch({
				type: GET_JOBS_SUCCESS,
				payload: {
					jobs,
					totalJobs,
					numOfPages,
				},
			})
		} catch (error) {
			console.log(error.response)
			logoutUser()
		}
		clearAlert()
	}

	//edit job
	const setEditJob = (id) => {
		dispatch({ type: SET_EDIT_JOB, payload: { id } })
	}
	const editJob = async () => {
		dispatch({ type: EDIT_JOB_BEGIN })
		try {
			const { position, company, jobLocation, jobType, status } = state
			await authFetch.patch(`/jobs/${state.editJobId}`, {
				company,
				position,
				jobLocation,
				jobType,
				status,
			})
			dispatch({ type: EDIT_JOB_SUCCESS })
			dispatch({ type: CLEAR_VALUES })
		} catch (error) {
			if (error.response.status === 401) return
			dispatch({
				type: EDIT_JOB_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
		clearAlert()
	}

	const deleteJob = async (jobId) => {
		dispatch({ type: DELETE_JOB_BEGIN })
		try {
			await authFetch.delete(`/jobs/${jobId}`)
			getJobs()
		} catch (error) {
			console.log(error.response)
		}
	}

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				setupUser,
				toggleSidebar,
				logoutUser,
				updateUser,
				handleChange,
				clearValues,
				createJob,
				getJobs,
				setEditJob,
				deleteJob,
				editJob,
				getProfiles,
				clearFilters,
				changePage,
				profileDetail,
				setProfileDetail,
				updateUserFoundPartner,
				setMessageRecipient,
				createMessage,
				getInbox,
				setSingleMessage,
				getSingleMessageDetail,
				setReplyMessage,
				getOutbox,
				setSingleMessageOutbox,
				getSingleMessageDetailOutbox,
				changeAvatar,
				updateUserAvatar,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

const useAppContext = () => {
	return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
