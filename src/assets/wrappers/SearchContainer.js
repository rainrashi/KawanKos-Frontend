import styled from 'styled-components'

const Wrapper = styled.section`
	.form {
		width: 100%;
		max-width: 100%;
	}
	.form-input,
	.form-select,
	.btn-block {
		height: 35px;
	}
	.row-container {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
		margin-top: 1rem;
		svg {
			width: 7%;
			height: 7%;
			margin-right: 1rem;
		}
		.row-content {
			display: flex;
			flex-direction: column;
		}
	}
	.form-row {
		margin-bottom: 0;
	}
	.form-center {
		display: grid;
		grid-template-columns: 1fr;
		column-gap: 2rem;
		row-gap: 0.5rem;
	}
	h5 {
		font-weight: 700;
	}
	.btn-block {
		align-self: end;
		margin-top: 1rem;
	}

	.deets-row-container {
		display: flex;
		align-items: center;
		svg {
			width: 10%;
			height: 10%;
			margin-right: 10px;
		}
		.deets-content {
			display: flex;
			flex-direction: column;
		}
	}
	@media (min-width: 768px) {
		.form-center {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (min-width: 992px) {
		.form-center {
			grid-template-columns: 1fr 1fr 1fr;
		}
		.btn-block {
			margin-top: 0;
		}
	}
`

export default Wrapper
