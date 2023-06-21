import { useAppContext } from '../context/appContext'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'

const PageButtonContainerMsg = () => {
	const { numOfPagesMsg, pageMsg, changePage } = useAppContext()

	const prevPage = () => {
		let newPage = pageMsg - 1
		if (newPage < 1) {
			newPage = numOfPagesMsg
		}
		changePage(newPage)
	}
	const nextPage = () => {
		let newPage = pageMsg + 1
		if (newPage > numOfPagesMsg) {
			newPage = 1
		}
		changePage(newPage)
	}

	const pages = Array.from({ length: numOfPagesMsg }, (_, index) => {
		return index + 1
	})

	return (
		<Wrapper>
			<button className='prev-btn' onClick={prevPage}>
				<HiChevronDoubleLeft />
				prev
			</button>

			<div className='btn-container'>
				{pages.map((pageNumber) => {
					return (
						<button
							type='button'
							className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
							key={pageNumber}
							onClick={() => console.log(page)}
						>
							{pageNumber}
						</button>
					)
				})}
			</div>

			<button className='next-btn' onClick={nextPage}>
				next
				<HiChevronDoubleRight />
			</button>
		</Wrapper>
	)
}

export default PageButtonContainerMsg
