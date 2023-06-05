import styled from 'styled-components'

const Wrapper = styled.section`
	margin-top: 4rem;
	h2 {
		text-transform: none;
	}
	& > h5 {
		font-weight: 700;
	}
	.profilsingkat {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(992px, 1fr));
		row-gap: 2rem;
	}
	@media (min-width: 992px) {
		.profilsingkat {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
		}
	}
`
export default Wrapper
