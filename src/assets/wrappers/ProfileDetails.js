import styled from 'styled-components'

const Wrapper = styled.section`
	border-radius: var(--borderRadius);
	width: 85%;
	background: var(--white);
	padding: 3rem 2rem 4rem;
	box-shadow: var(--shadow-2);

	table {
		border-collapse: collapse;
		width: 100%;
	}

	th,
	td {
		border: 1px solid black;
		padding: 8px;
		text-align: left;
	}

	th {
		background-color: #f2f2f2;
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
		border-radius: 10px;
		box-shadow: none;
		padding: 10px;
		max-width: 50%;
		width: 40%;
		border-style: double;
	}
	/* .deets-row {
		margin-bottom: 0;
	} */
	/* .deets-center {
		display: grid;
		row-gap: 0.5rem;
	} */
	/* .deets-center button {
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
		.deets-center {
			grid-template-columns: 1fr 1fr;
			align-items: center;
			column-gap: 1rem;
		}
		.btn-container {
			margin-top: 0;
		}
	}
	@media (min-width: 1120px) {
		.deets-center {
			grid-template-columns: 1fr 1fr 1fr;
		}
		.deets-center button {
			margin-top: 0;
		}
	}
`

export default Wrapper
