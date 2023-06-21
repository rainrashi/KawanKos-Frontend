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
	GET_PROFILES_BEGIN,
	GET_PROFILES_SUCCESS,
	CLEAR_FILTERS,
	CHANGE_PAGE,
	SET_PROFILE_DETAILS,
	PROFILE_DETAIL_BEGIN,
	PROFILE_DETAIL_SUCCESS,
	PROFILE_DETAIL_ERROR,
	SET_MESSAGE_RECIPIENT,
	MESSAGE_SEND_BEGIN,
	MESSAGE_SEND_SUCCESS,
	MESSAGE_SEND_ERROR,
	SET_MESSAGE_DETAILS,
	MESSAGE_DETAIL_BEGIN,
	MESSAGE_DETAIL_SUCCESS,
	MESSAGE_DETAIL_ERROR,
	GET_INBOX_BEGIN,
	GET_INBOX_SUCCESS,
	SET_REPLY_MESSAGE,
	GET_OUTBOX_BEGIN,
	GET_OUTBOX_SUCCESS,
	SET_OUTBOX_DETAILS,
	OUTBOX_DETAIL_BEGIN,
	OUTBOX_DETAIL_SUCCESS,
	OUTBOX_DETAIL_ERROR,
	DELETE_MESSAGE_BEGIN,
	DELETE_MESSAGE_ERROR,
} from './actions'
import { initialState } from './appContext'

const reducer = (state, action) => {
	if (action.type === DISPLAY_ALERT) {
		return {
			...state,
			showAlert: true,
			alertType: 'danger',
			alertText: 'Harap isi semua kolom',
		}
	}
	if (action.type === CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alertType: '',
			alertText: '',
		}
	}

	//user setup
	if (action.type === SETUP_USER_BEGIN) {
		return {
			...state,
			isLoading: true,
		}
	}
	if (action.type === SETUP_USER_SUCCESS) {
		return {
			...state,
			isLoading: false,
			token: action.payload.token,
			user: action.payload.user,
			showAlert: true,
			alertType: 'success',
			alertText: action.payload.alertText,
		}
	}
	if (action.type === SETUP_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		}
	}

	if (action.type === TOGGLE_SIDEBAR) {
		return {
			...state,
			showSidebar: !state.showSidebar,
		}
	}

	//logout
	if (action.type === LOGOUT_USER) {
		return {
			...initialState,
			token: null,
			user: null,
		}
	}

	//get all profiles
	if (action.type === GET_PROFILES_BEGIN) {
		return { ...state, isLoading: true, showAlert: false }
	}
	if (action.type === GET_PROFILES_SUCCESS) {
		return {
			...state,
			isLoading: false,
			profiles: action.payload.profiles,
			totalProfiles: action.payload.totalProfiles,
			numOfPages: action.payload.numOfPages,
		}
	}

	//update user
	if (action.type === UPDATE_USER_BEGIN) {
		return {
			...state,
			isLoading: true,
			showAlert: true,
			alertType: 'success',
			alertText: 'Perubahan sedang diterapkan... harap tunggu sebentar',
		}
	}
	if (action.type === UPDATE_USER_SUCCESS) {
		return {
			...state,
			isLoading: false,
			token: action.payload.token,
			user: action.payload.user,
			showAlert: true,
			alertType: 'success',
			alertText: action.payload.msg,
		}
	}
	if (action.type === UPDATE_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		}
	}

	//handle change
	if (action.type === HANDLE_CHANGE) {
		return {
			...state,
			page: 1,
			[action.payload.name]: action.payload.value,
		}
	}

	//clear button
	if (action.type === CLEAR_VALUES) {
		const initialState = {
			//message
			messageTo: '',
			messageFrom: '',
			messageTitle: '',
			messageContent: '',
			messageReplyTo: '',
		}
		return { ...state, ...initialState }
	}

	// profile detail
	if (action.type === SET_PROFILE_DETAILS) {
		const profileDetail = state.profiles.find(
			(profile) => profile._id === action.payload.id
		)
		const { _id } = profileDetail

		return {
			...state,
			profileDetailId: _id,
			profileDetails: profileDetail,
		}
	}
	if (action.type === PROFILE_DETAIL_BEGIN) {
		return { ...state, isLoading: true, showAlert: false }
	}
	if (action.type === PROFILE_DETAIL_SUCCESS) {
		return {
			...state,
			isLoading: false,
			profileDetails: action.payload.profileDetails,
		}
	}
	if (action.type === PROFILE_DETAIL_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		}
	}

	// Reply
	if (action.type === SET_REPLY_MESSAGE) {
		//reply
		const repliedMessage = state.userInboxMessages.find(
			(inbox) => inbox._id === action.payload.id
		)

		console.log(repliedMessage)

		const { _id, messageTitle, messageFrom, messageTo } = repliedMessage

		const repliedMessageTitle = 'RE: ' + messageTitle

		const fromId = messageFrom._id
		const fromName = messageFrom.name
		const fromAvatar = messageFrom.userAvatar

		//just in case
		const toId = messageTo._id
		const toName = messageTo.name
		const toAvatar = messageTo.userAvatar

		//profile
		/* const messageRecipientProfile = state.profiles.find(
			(profile) => profile._id === fromId
		) */

		const messageRecipientProfile = {
			name: fromName,
			userAvatar: fromAvatar,
		}

		return {
			...state,
			isReplying: true,
			messageTitle: repliedMessageTitle,
			messageTo: fromId,
			messageFrom: toId,
			messageReplyTo: _id,
			messageRecipientProfile,
			messageRecipientId: fromId,
		}
	}

	// Send Message NORMAL
	if (action.type === SET_MESSAGE_RECIPIENT) {
		const messageRecipientProfile = state.profiles.find(
			(profile) => profile._id === action.payload.id
		)
		const { _id } = messageRecipientProfile

		return {
			...state,
			isReplying: false,
			messageRecipientId: _id,
			messageRecipientProfile,
			messageTitle: '',
			messageTo: '',
			messageFrom: '',
			messageReplyTo: '',
		}
	}

	// Send message in general
	if (action.type === MESSAGE_SEND_BEGIN) {
		return {
			...state,
			isLoading: false,
			//showAlert:false
		}
	}

	if (action.type === MESSAGE_SEND_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		}
	}

	if (action.type === MESSAGE_SEND_SUCCESS) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'Pesan Terkirim! Harap tunggu sebentar...',
		}
	}

	// Inbox
	if (action.type === GET_INBOX_BEGIN) {
		return {
			...state,
			isLoading: true,
			showAlert: false,
			isOutboxOrInbox: 'inbox',
		}
	}
	if (action.type === GET_INBOX_SUCCESS) {
		return {
			...state,
			isLoading: false,
			userInboxMessages: action.payload.userInboxMessages,
			totalInbox: action.payload.totalInbox,
			numOfPages: action.payload.numOfPages,
		}
	}

	//OUTBOX
	if (action.type === GET_OUTBOX_BEGIN) {
		return {
			...state,
			isLoading: true,
			showAlert: false,
			isOutboxOrInbox: 'outbox',
		}
	}
	if (action.type === GET_OUTBOX_SUCCESS) {
		return {
			...state,
			isLoading: false,
			userOutboxMessages: action.payload.userOutboxMessages,
			totalOutbox: action.payload.totalOutbox,
			numOfPages: action.payload.numOfPages,
		}
	}

	// Single Message
	if (action.type === SET_MESSAGE_DETAILS) {
		const message = state.userInboxMessages.find(
			(message) => message._id === action.payload.id
		)
		const { _id } = message
		return {
			...state,
			messageInboxDetailsId: _id,
			messageInboxDetails: message,
		}
	}
	if (action.type === MESSAGE_DETAIL_BEGIN) {
		return { ...state, isLoading: true, showAlert: false }
	}
	if (action.type === MESSAGE_DETAIL_SUCCESS) {
		return {
			...state,
			isLoading: false,
			messageInboxDetails: action.payload.messageInboxDetails,
		}
	}
	if (action.type === MESSAGE_DETAIL_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		}
	}

	// Detail message Outbox
	if (action.type === SET_OUTBOX_DETAILS) {
		const message = state.userOutboxMessages.find(
			(message) => message._id === action.payload.id
		)
		const { _id, messageFrom, messageTitle, messageTo, messageContent } =
			message
		return {
			...state,
			messageOutboxDetailsId: _id,
			messageOutboxDetails: message,
			messageTitle,
			messageFrom,
			messageTo,
			messageContent,
		}
	}
	if (action.type === OUTBOX_DETAIL_BEGIN) {
		return { ...state, isLoading: true, showAlert: false }
	}
	if (action.type === OUTBOX_DETAIL_SUCCESS) {
		return {
			...state,
			isLoading: false,
			messageOutboxDetails: action.payload.messageOutboxDetails,
		}
	}
	if (action.type === OUTBOX_DETAIL_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		}
	}

	if (action.type === DELETE_MESSAGE_BEGIN) {
		return {
			...state,
			isLoading: true,
			showAlert: true,
			alertType: 'success',
			alertText: 'Pesan sedang dihapus... tunggu sebentar',
		}
	}
	if (action.type === DELETE_MESSAGE_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		}
	}

	// Search
	if (action.type === CLEAR_FILTERS) {
		return {
			...state,
			sort: 'Pengguna terbaru',
			search: '',
			searchUserJob: '',
			searchUserMajor: '',
			searchUserHomeTown: '',
			searchUserStatus: 'semua',
			searchUserGender: 'semua',
			searchUserReligion: 'semua',
			searchUserHasLocation: 'semua',
			searchUserLocationArea: 'semua',
		}
	}

	//ganti halaman
	if (action.type === CHANGE_PAGE) {
		return { ...state, page: action.payload.page }
	}

	throw new Error(`no such action ${action.type}`)
}

export default reducer
