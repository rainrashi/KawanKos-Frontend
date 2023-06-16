import OutboxContainer from './OutboxContainer'
import HowToUse from './HowToUse'
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'
import Alert from '../../components/Alert'

const Home = () => {
	const { getProfiles, showAlert } = useAppContext()

	useEffect(() => {
		getProfiles()
	}, [])

	return (
		<>
			<HowToUse />

			<OutboxContainer />
		</>
	)
}
export default Home
