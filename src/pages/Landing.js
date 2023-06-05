import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link } from 'react-router-dom'

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className="container page">
				<div className="info">
					<h1>
						Aplikasi pencari <span>Kawan Kos</span>
					</h1>
				</div>
				<p>
					Kamu merasa sulit mencari teman satu kos? Pusing cari kesana-kemari
					tapi nggak ketemu-ketemu? Kalau gitu, kamu telah datang ke tempat yang
					tepat! KawanKos adalah aplikasi pencari teman satu indekos bagi kamu
					yang memiliki kesulitan dalam mencari roommate! Jadi, ga usah
					pusing-pusing tuh nyari disini disitu yang bikin kamu pusing. Cukup
					daftar disini, lalu kamu tinggal cari deh KawanKos yang cocok buat
					kamu!
				</p>
				<img src={main} alt="kawan kos" className="img main-img" />
				<Link to="/register" className="btn btn-hero">
					Login / Register
				</Link>
			</div>
		</Wrapper>
	)
}

export default Landing
