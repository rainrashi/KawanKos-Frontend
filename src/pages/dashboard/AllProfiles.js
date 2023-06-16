import { ProfilesContainer, SearchContainer } from '../../components'
import { useAppContext } from '../../context/appContext'
import foundPartnerImg from '../../assets/images/foundPartner.svg'

const AllProfiles = () => {
	const { user } = useAppContext()

	const { userFoundPartner } = user

	//bans user from searching if userFoundPartner
	if (userFoundPartner) {
		return (
			<>
				<h1>Kamu sudah menemukan KawanKosmu.</h1>
				<p>
					Kamu sudah menemukan KawanKosmu, jadi kamu tidak bisa mencari KawanKos
					sekarang. Tapi, apabila kamu masih mau mencari, kamu bisa kok ganti
					statusmu di halaman Edit Profil, lalu kamu scroll ke menu paling
					bawah, dan tekan tombol "Iya, aku ingin mencari KawanKos lagi!"
				</p>
				<img src={foundPartnerImg} alt='Sudah Ketemu KawanKos' />
			</>
		)
	}

	return (
		<>
			<SearchContainer />
			<ProfilesContainer />
		</>
	)
}
export default AllProfiles
