import styled from 'styled-components'

const Wrapper = styled.section`
	border-radius: var(--borderRadius);
	width: 85%;
	background: var(--white);
	padding: 3rem 2rem 4rem;
	box-shadow: var(--shadow-2);
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
	.img-avatar {
		width: 25%;
		height: 25%;
		object-fit: cover;
		margin-left: auto;
		margin-right: auto;
	}
	h3 {
		margin-top: 0;
	}
	.form {
		margin: auto;
		border-radius: 0;
		box-shadow: none;
		padding: 0;
		max-width: 50%;
		width: 40%;
	}
	/* .form-row {
		margin-bottom: 0;
	} */
	/* .form-center {
		display: grid;
		row-gap: 0.5rem;
	} */
	/* .form-center button {
		align-self: end;
		height: 35px;
		margin-top: 1rem;
	} */
	.btn-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 1rem;
		align-self: flex-end;
		margin-top: 0.5rem;
		button {
			height: 35px;
		}
	}
	.clear-btn {
		background: var(--grey-500);
	}
	.clear-btn:hover {
		background: var(--black);
	}
	@media (min-width: 992px) {
		.form-center {
			grid-template-columns: 1fr 1fr;
			align-items: center;
			column-gap: 1rem;
		}
		.btn-container {
			margin-top: 0;
		}
	}
	@media (min-width: 1120px) {
		.form-center {
			grid-template-columns: 1fr 1fr 1fr;
		}
		.form-center button {
			margin-top: 0;
		}
	}
`

export default Wrapper
