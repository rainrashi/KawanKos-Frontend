import OutboxContainer from './OutboxContainer'
import HowToUse from './HowToUse'
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'

const Home = () => {
	const { getProfiles } = useAppContext()

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
