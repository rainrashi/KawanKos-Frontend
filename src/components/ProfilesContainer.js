import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import ProfileSingkat from './ProfileSingkat'
import Wrapper from '../assets/wrappers/ProfilSingkatContainer'
import PageBtnContainer from './PageBtnContainer'

const ProfilesContainer = () => {
	const {
		user,
		getProfiles,
		profiles,
		isLoading,
		page,
		search,
		searchUserStatus,
		searchUserGender,
		searchUserJob,
		searchUserMajor,
		searchUserHomeTown,
		searchUserReligion,
		searchUserHasLocation,
		searchUserLocationArea,
		sort,
		numOfPages,
		totalProfiles,
	} = useAppContext()

	useEffect(() => {
		getProfiles()
	}, [
		page,
		search,
		searchUserStatus,
		searchUserGender,
		searchUserJob,
		searchUserMajor,
		searchUserHomeTown,
		searchUserReligion,
		searchUserHasLocation,
		searchUserLocationArea,
		sort,
	])

	if (isLoading) {
		return <Loading center />
	}

	const filteredProfiles = profiles.filter(
		(profile) => profile._id !== user?._id
	)

	if (filteredProfiles.length === 0) {
		return (
			<Wrapper>
				<h2>Tidak ada profil pengguna yang ditemukan.</h2>
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<h5>{totalProfiles * numOfPages} calon Kawankos ditemukan!</h5>
			<div className='profilsingkat'>
				{filteredProfiles.map((profil) => {
					return <ProfileSingkat key={profil._id} {...profil} />
				})}
			</div>

			{/* pagination buttons */}
			{numOfPages > 1 && <PageBtnContainer />}
		</Wrapper>
	)
}
export default ProfilesContainer
