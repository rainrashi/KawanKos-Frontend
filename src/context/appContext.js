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
	DELETE_MESSAGE_BEGIN,
	DELETE_MESSAGE_SUCCESS,
	DELETE_MESSAGE_ERROR,
	GET_ALL_MESSAGES_BEGIN,
	GET_ALL_MESSAGES_SUCCESS,
	SET_MESSAGE_ADM_DETAILS,
	MESSAGE_DETAIL_ADM_BEGIN,
	MESSAGE_DETAIL_ADM_SUCCESS,
	MESSAGE_DETAIL_ADM_ERROR,
	DELETE_PROFILE_ADM_BEGIN,
	DELETE_PROFILE_ADM_ERROR,
	DELETE_PROFILE_ADM_SUCCESS,
} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

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
	numOfPagesMsg: 1,
	pageMsg: 1,
	// * search n options + init
	search: '',
	searchUserJob: '',
	searchUserMajor: '',
	searchUserHomeTown: '',
	searchUserStatus: 'semua',
	searchUserGender: 'semua',
	searchUserReligion: 'semua',
	searchUserHasLocation: 'semua',
	searchUserLocationArea: 'semua',
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
	userHasLocationOptions: ['ya', 'tidak'],
	userLocationAreaOptions: [
		'Jakarta Utara',
		'Jakarta Timur',
		'Jakarta Selatan',
		'Jakarta Barat',
		'Jakarta Pusat',
	],
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
	totalMessages: 0,
	allMessages: [],
	messageDetailsId: '',
	messageDetails: [],
	// * Message init
	messageTo: '',
	messageFrom: '',
	messageTitle: '',
	messageContent: '',
	messageReplyTo: '',
	userAvatarNew: '',
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
	}
	const removeUserFromLocalStorage = () => {
		localStorage.removeItem('user')
		localStorage.removeItem('token')
	}

	const setupUser = async ({ currentUser, endPoint, alertText }) => {
		dispatch({ type: SETUP_USER_BEGIN })
		try {
			const response = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
			const { user, token } = response.data
			dispatch({
				type: SETUP_USER_SUCCESS,
				payload: { user, token, alertText },
			})
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

			const { user, token } = data

			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: { user, token, msg: 'Pembaruan Biodata Kamu Berhasil!' },
			})
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

			const { user, token } = data
			const { userFoundPartner } = user

			let message = ''
			if (userFoundPartner)
				message =
					'Selamat! kamu sudah menemukan KawanKos-mu! Semoga langgeng ya!'
			else
				message =
					'Sekarang kamu sudah dapat hadir dalam pencarian, selamat mencari KawanKos-mu!'

			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: {
					user,
					token,
					msg: message,
				},
			})
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
			searchUserLocationArea,
			sort,
		} = state

		const reqTimeStamp = new Date().getTime()

		const queryParams = {
			page,
			userStatus: searchUserStatus,
			userGender: searchUserGender,
			userReligion: searchUserReligion,
			userHasLocation: searchUserHasLocation,
			userLocationArea: searchUserLocationArea,
			timestamp: reqTimeStamp,
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
		let url = `/messages?timestamp=` + new Date().getTime()

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

	//  Outbox
	const getOutbox = async () => {
		let url = `/messages/outbox?timestamp=` + new Date().getTime()

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

	//ALL Messages
	const getAllMessages = async () => {
		let url = `messages?timestamp=` + new Date().getTime()

		dispatch({ type: GET_ALL_MESSAGES_BEGIN })
		try {
			const { data } = await authFetch(url)
			const { totalMessages, allMessages, numOfPages } = data

			dispatch({
				type: GET_ALL_MESSAGES_SUCCESS,
				payload: {
					totalMessages,
					allMessages,
					numOfPages,
				},
			})
		} catch (error) {
			console.log(error.response)
			// logoutUser()
		}
		clearAlert()
	}

	//  Single Message View
	const setSingleMessage = (id) => {
		dispatch({ type: SET_MESSAGE_DETAILS, payload: { id } })
	}
	const getSingleMessageDetail = async () => {
		dispatch({ type: MESSAGE_DETAIL_BEGIN })
		try {
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

	// outbox single message
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

	//setsinglemessage admin
	const setSingleMessageAdm = (id) => {
		dispatch({ type: SET_MESSAGE_ADM_DETAILS, payload: { id } })
	}
	const getSingleMessageDetailAdm = async () => {
		dispatch({ type: MESSAGE_DETAIL_ADM_BEGIN })
		try {
			const { data } = await authFetch.get(`messages/${state.messageDetailsId}`)
			const { messageDetails } = data
			dispatch({
				type: MESSAGE_DETAIL_ADM_SUCCESS,
				payload: {
					messageDetails,
				},
			})
		} catch (error) {
			if (error.response.status === 401) return
			dispatch({
				type: MESSAGE_DETAIL_ADM_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
		clearAlert()
	}

	//delete message
	const deleteMessage = async (messageId) => {
		dispatch({ type: DELETE_MESSAGE_BEGIN })
		try {
			await authFetch.delete(`messages/${messageId}`)
			dispatch({ type: DELETE_MESSAGE_SUCCESS })
		} catch (error) {
			if (error.response.status === 401) return
			dispatch({
				type: DELETE_MESSAGE_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
		clearAlert()
	}

	//delete profile ADM
	const deleteProfileAdm = async (profileId) => {
		dispatch({ type: DELETE_PROFILE_ADM_BEGIN })
		try {
			await authFetch.delete(`profiles/${profileId}`)
			dispatch({ type: DELETE_PROFILE_ADM_SUCCESS })
		} catch (error) {
			if (error.response.status === 401) return
			dispatch({
				type: DELETE_PROFILE_ADM_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
		clearAlert()
	}

	//  Set Reply
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

	//updateUserAvatar
	const updateUserAvatar = async (currentUser) => {
		dispatch({ type: UPDATE_USER_BEGIN })
		try {
			const { data } = await authFetch.patch(
				'/auth/updateUserAvatar',
				currentUser
			)

			const { user, token } = data

			setTimeout(() => {
				dispatch({
					type: UPDATE_USER_SUCCESS,
					payload: { user, token, msg: 'Pembaruan Avatar Berhasil!' },
				})
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
				updateUserAvatar,
				deleteMessage,
				getAllMessages,
				setSingleMessageAdm,
				getSingleMessageDetailAdm,
				deleteProfileAdm,
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
