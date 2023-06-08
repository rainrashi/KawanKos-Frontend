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
	//remnant of j
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
	GET_INBOX_BEGIN,
	GET_INBOX_SUCCESS,
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
			// userLocation: action.payload.location,
			// jobLocation: action.payload.location,
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
			userLocation: '',
			jobLocation: '',
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
			// userLocation: action.payload.location,
			// jobLocation: action.payload.location,
			showAlert: true,
			alertType: 'success',
			alertText: 'Profil berhasil diperbarui!',
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
	// TODO UPDATE DENGAN SITUASI APLIKASI
	if (action.type === CLEAR_VALUES) {
		const initialState = {
			//message
			messageTo: '',
			messageFrom: '',
			messageTitle: '',
			messageContent: '',
			messageReplyTo: '',

			// * Remnant of J
			/* isEditing: false,
			editJobId: '',
			position: '',
			company: '',
			jobLocation: state.userLocation,
			jobType: 'full-time',
			status: 'pending', */
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

	// TODO Single Message (outbox included trial)
	// Outbox trial failed, return to only inbox
	if (action.type === SET_MESSAGE_DETAILS) {
		/* const messageType = state.isOutboxOrInbox

		if (messageType === 'inbox') {
			const message = state.userInboxMessages.find(
				(message) => message._id === action.payload.id
			)
			const { _id } = message
			return {
				...state,
				messageInboxDetailsId: _id,
				messageInboxDetails: message,
				// messageInboxDetailsId: action.payload.id,
			}
		} else if (messageType === 'outbox') {
			const message = state.userOutboxMessages.find(
				(message) => message._id === action.payload.id
			)
			const { _id } = message
			return {
				...state,
				messageOutboxDetailsId: _id,
				messageOutboxDetails: message,
				// messageOutboxDetailsId: action.payload.id,
			}
		} */

		const message = state.userInboxMessages.find(
			(message) => message._id === action.payload.id
		)
		const { _id } = message
		return {
			...state,
			messageInboxDetailsId: _id,
			messageInboxDetails: message,
			// messageInboxDetailsId: action.payload.id,
		}
	}
	if (action.type === MESSAGE_DETAIL_BEGIN) {
		return { ...state, isLoading: true, showAlert: false }
	}
	if (action.type === MESSAGE_DETAIL_SUCCESS) {
		/* const messageType = state.isOutboxOrInbox

		if (messageType === 'inbox') {
			return {
				...state,
				isLoading: false,
				messageInboxDetails: action.payload.messageInboxDetails,
			}
		} else if (messageType === 'outbox') {
			return {
				...state,
				isLoading: false,
				messageOutboxDetails: action.payload.messageOutboxDetails,
			}
		} */

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

	// TODO Detail message Outbox
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
			// messageOutboxDetailsId: action.payload.id,
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

	// TODO Search
	if (action.type === CLEAR_FILTERS) {
		return {
			...state,
			search: '',
			searchUserMajor: '',
			searchUserJob: '',
			searchUserHomeTown: '',
			searchUserStatus: 'semua',
			searchUserReligion: 'semua',
			searchUserGender: 'semua',
			sort: 'Pengguna terbaru',
		}
	}

	//ganti halaman
	if (action.type === CHANGE_PAGE) {
		return { ...state, page: action.payload.page }
	}

	//upload alert
	if (action.type === UPLOADING_AVATAR_BEGIN) {
		return {
			...state,
			showAlert: true,
			isLoading: true,
			alertType: 'danger',
			alertText: 'Sedang upload gambar profil....',
		}
	}
	if (action.type === UPLOADING_AVATAR_SUCCESS) {
		return {
			...state,
			showAlert: true,
			isLoading: false,
			alertType: 'success',
			alertText: 'Berhasil upload gambar profil!',
			userAvatarNew: action.payload.userAvatarNew,
		}
	}
	if (action.type === UPLOADING_AVATAR_ERROR) {
		return {
			...state,
			showAlert: true,
			isLoading: false,
			alertType: 'danger',
			alertText: action.payload.msg,
		}
	}

	//* Remnants of J

	//create job
	if (action.type === CREATE_JOB_BEGIN) {
		return { ...state, isLoading: true }
	}

	if (action.type === CREATE_JOB_SUCCESS) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'New Job Created!',
		}
	}

	if (action.type === CREATE_JOB_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
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

	//get all jobs
	if (action.type === GET_JOBS_BEGIN) {
		return { ...state, isLoading: true, showAlert: false }
	}
	if (action.type === GET_JOBS_SUCCESS) {
		return {
			...state,
			isLoading: false,
			jobs: action.payload.jobs,
			totalJobs: action.payload.totalJobs,
			numOfPages: action.payload.numOfPages,
		}
	}

	//edit job
	if (action.type === SET_EDIT_JOB) {
		const job = state.jobs.find((job) => job._id === action.payload.id)
		const { _id, position, company, jobLocation, jobType, status } = job
		return {
			...state,
			isEditing: true,
			editJobId: _id,
			position,
			company,
			jobLocation,
			jobType,
			status,
		}
	}

	//delete job
	if (action.type === DELETE_JOB_BEGIN) {
		return {
			...state,
			isLoading: true,
		}
	}

	//editjob
	if (action.type === EDIT_JOB_BEGIN) {
		return {
			...state,
			isLoading: true,
		}
	}
	if (action.type === EDIT_JOB_SUCCESS) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'Job Updated!',
		}
	}
	if (action.type === EDIT_JOB_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		}
	}

	throw new Error(`no such action ${action.type}`)
}

export default reducer
