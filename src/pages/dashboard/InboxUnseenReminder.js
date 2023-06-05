import OutboxContainer from './OutboxContainer'
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'

const InboxUnseenReminder = () => {
	const { getInbox } = useAppContext()

	useEffect(() => {
		getInbox()
	}, [])
	return <div>InboxUnseenReminder</div>
}
export default InboxUnseenReminder
