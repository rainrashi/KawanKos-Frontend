import styled from 'styled-components'

const Wrapper = styled.section`
	border-radius: var(--borderRadius);
	width: 100%;
	background: var(--white);
	padding: 3rem 2rem 4rem;
	box-shadow: var(--shadow-2);

	h3 {
		margin-top: 0;
	}
	.avatar-area {
		position: relative;
		width: 200px;
		height: 200px;
		margin: 20px auto;
		text-align: center;
		transition: all 0.3s ease;
		&:hover {
			transform: scale(1.05);
			cursor: pointer;
		}
		img {
			width: 200px;
			height: 200px;
			object-fit: cover;
			border-radius: 50%;
			&:hover {
				box-shadow: 1px 1px 1px 1px #334e68;
			}
		}
		svg {
			position: absolute;
			top: 10%;
			left: 50%;
			transform: translate(-50%, 0);
			height: 100%;
			width: 50%;
			text-align: center;
			transition: all 0.3s ease;
			/* display: none; */
			&:hover {
				display: visible;
				transition: all 0.3 ease;
				opacity: 0.9;
			}
		}
	}
	.avatar-input {
		display: none;
	}
	.img-avatar {
		width: 25%;
		height: 25%;
		object-fit: cover;
		margin-left: auto;
		margin-right: auto;
		border-radius: 50%;
	}
	.img-danger {
		width: 25%;
		height: 25%;
		object-fit: cover;
		margin-left: auto;
		margin-right: auto;
	}
	.img-preview {
		width: 70%;
		height: 70%;
		object-fit: cover;
		margin-left: auto;
		margin-right: auto;
		border-radius: 50%;
	}
	.form {
		margin: auto;
		border-radius: 0;
		box-shadow: none;
		padding: 10px;
		max-width: 50%;
		width: 50%;
		border-style: dotted;
	}
	.row-container {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
		margin-top: 1rem;
		svg {
			width: 5%;
			height: 5%;
			margin-right: 1rem;
		}
		.row-content {
			display: flex;
			flex-direction: column;
		}
	}
	.form-inside {
		margin: auto;
		border-radius: 0;
		box-shadow: none;
		padding: 10px;
		max-width: 90%;
		width: 95%;
		border-style: dotted;
	}
	.form-avatar {
		width: 25%;
		height: 25%;
		object-fit: cover;
		margin-left: auto;
		margin-right: auto;
	}
	.form-row {
		margin-bottom: 0;
	}
	.form-center {
		display: block;
		row-gap: 0.5rem;
	}
	.form-center button {
		align-self: end;
		height: 35px;
		margin-top: 1rem;
	}
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
