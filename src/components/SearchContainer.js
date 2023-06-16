import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useState, useMemo } from 'react'

const SearchContainer = () => {
	const [localSearch, setLocalSearch] = useState('')
	const {
		isLoading,
		search,
		searchUserHomeTown,
		searchUserJob,
		searchUserMajor,
		handleChange,
		searchUserStatus,
		userStatusOptions,
		searchUserGender,
		userGenderOptions,
		searchUserReligion,
		userReligionOptions,
		userHasLocationOptions,
		searchUserHasLocation,
		clearFilters,
		sort,
		sortOptions,
		getProfiles,
	} = useAppContext()

	const handleSearch = (e) => {
		handleChange({ name: e.target.name, value: e.target.value })
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		setLocalSearch('')
		clearFilters()
	}

	//debounce
	const debounce = () => {
		let timeoutID
		return (e) => {
			setLocalSearch(e.target.value)
			clearTimeout(timeoutID)
			timeoutID = setTimeout(() => {
				handleChange({ name: e.target.name, value: e.target.value })
			}, 1000)
		}
	}

	const optimizedDebounce = useMemo(() => debounce(), [])

	return (
		<Wrapper>
			<form className='form'>
				<h4>Cari Kawankosmu disini!</h4>

				<div className='form-center'>
					{/* search nama */}
					<FormRow
						type='text'
						labelText='Nama'
						name='search'
						value={localSearch}
						handleChange={optimizedDebounce}
					/>

					{/* search by status */}
					<FormRowSelect
						labelText='Status Pelajar/Pekerja'
						name='searchUserStatus'
						value={searchUserStatus}
						handleChange={handleSearch}
						list={['semua', ...userStatusOptions]}
					/>

					{/* search by job */}
					{searchUserStatus === 'Pekerja' && (
						<FormRow
							type='text'
							labelText='Pekerjaan'
							name='searchUserJob'
							value={searchUserJob}
							handleChange={handleSearch}
						/>
					)}

					{/* search by major */}
					{searchUserStatus === 'Pelajar' && (
						<FormRow
							type='text'
							labelText='Jurusan'
							name='searchUserMajor'
							value={searchUserMajor}
							handleChange={handleSearch}
						/>
					)}

					{/* search by hometown */}
					<FormRow
						type='text'
						labelText='Kota Asal'
						name='searchUserHomeTown'
						value={searchUserHomeTown}
						handleChange={handleSearch}
					/>

					{/* search by gender */}
					<FormRowSelect
						labelText='Jenis Kelamin'
						name='searchUserGender'
						value={searchUserGender}
						handleChange={handleSearch}
						list={['semua', ...userGenderOptions]}
					/>

					{/* search by religion */}
					<FormRowSelect
						labelText='Agama'
						name='searchUserReligion'
						value={searchUserReligion}
						handleChange={handleSearch}
						list={['semua', ...userReligionOptions]}
					/>

					{/* search by has place */}
					<FormRowSelect
						labelText='Sudah punya lokasi?'
						name='searchUserHasLocation'
						value={searchUserHasLocation}
						handleChange={handleSearch}
						list={['semua', ...userHasLocationOptions]}
					/>

					{/* sort */}
					<FormRowSelect
						name='sort'
						value={sort}
						handleChange={handleSearch}
						list={sortOptions}
					/>
					<button type='button' className='btn btn-block' onClick={getProfiles}>
						Terapkan Filter
					</button>
					<button
						className='btn btn-block btn-danger'
						disabled={isLoading}
						onClick={handleSubmit}
					>
						Reset Filter
					</button>
				</div>
			</form>
		</Wrapper>
	)
}

export default SearchContainer
