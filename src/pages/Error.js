import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

const Error = () => {
  return (
    <Wrapper classname='full-page'>
      <div>
        <img src={img} alt='not found' />
        <h3>Waduh! Halaman tidak tersedia</h3>
        <p>Halaman yang anda cari tidak dapat ditemukan.</p>
        <Link to='/'>Kembali ke Halaman Utama</Link>
      </div>
    </Wrapper>
  )
}
export default Error
