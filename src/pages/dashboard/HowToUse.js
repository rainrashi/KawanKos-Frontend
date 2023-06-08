import Wrapper from '../../assets/wrappers/ProfileDetails'
import { useAppContext } from '../../context/appContext'
import foundPartnerImg from '../../assets/images/foundPartner.svg'

const HowToUse = () => {
	const { user } = useAppContext()

	const { userFoundPartner } = user

	// console.log(userFoundPartner)

	//warns user if userFoundPartner
	if (userFoundPartner) {
		return (
			<Wrapper>
				<div className='form'>
					<h1>Selamat! kamu sudah menemukan KawanKosmu!</h1>
					<p>
						Kamu sudah menemukan KawanKosmu, selamat! Kamu masih bisa memeriksa
						Outbox dan Inbox, namun sudah tidak bisa Cari Kawankos ya. Kalau
						kamu masih mau mencari KawanKos, kamu bisa kok merubah kembali
						status kamu di menu Edit Profil!{' '}
					</p>
					<img
						src={foundPartnerImg}
						alt='Sudah Ketemu KawanKos'
						className='img-preview'
					/>
				</div>
			</Wrapper>
		)
	}
	return (
		<Wrapper>
			<div className='form'>
				<h1>Selamat Datang!</h1>
				<p>
					Selamat datang di KawanKos, tempat di mana Anda dapat mencari teman
					satu kost atau roommate yang sempurna! Kami menyambut Anda dengan
					senang hati ke dalam komunitas kami. KawanKos membantu Anda menemukan
					orang-orang dengan minat, gaya hidup, dan kebutuhan kost yang serupa.
					Temukan profil pengguna lain, jelajahi preferensi Anda, dan
					berinteraksi melalui pesan dalam aplikasi. Bersiaplah untuk menjalin
					persahabatan baru dan temukan teman sejati di KawanKos. Selamat
					bergabung dan nikmati pengalaman yang tak terlupakan di sini!
				</p>
				<p>
					Silahkan buka menu di samping, dan klik "Cari KawanKos" untuk memulai
					mencari KawanKos yang cocok untukmu! Lalu jangan lupa, kamu bisa
					melihat pesan yang sudah kamu kirim ke calon Kawankos kamu di bawah
					ya!
				</p>
				<br />
			</div>
		</Wrapper>
	)
}
export default HowToUse
