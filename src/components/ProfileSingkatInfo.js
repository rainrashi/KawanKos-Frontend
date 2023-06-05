import Wrapper from '../assets/wrappers/ProfileSingkatInfo'

const ProfileSingkatInfo = ({ icon, text, userBudget, userAge }) => {
	return (
		<Wrapper>
			<span className="icon">{icon}</span>
			<span className="text">
				{userBudget && 'Rp. ' + ' '}
				{text}
				{userAge && ' ' + 'Tahun'}
			</span>
		</Wrapper>
	)
}
export default ProfileSingkatInfo
