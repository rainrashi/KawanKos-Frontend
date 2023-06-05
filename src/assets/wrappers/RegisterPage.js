import styled from 'styled-components'

const Wrapper = styled.section`
	display: grid;
	align-items: center;
	.logo {
		display: block;
		margin: 0 auto;
		margin-bottom: 1.38rem;
	}
	.form {
		max-width: 400px;
		border-top: 5px solid var(--primary-500);
	}

	h3 {
		text-align: center;
	}
	p {
		margin: 0;
		margin-top: 1rem;
		text-align: center;
		font-size: large;
	}

	.img {
		width: 50%;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}
	.btn {
		margin-top: 1rem;
	}
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.member-btn {
		background: transparent;
		border: transparent;
		color: var(--primary-500);
		cursor: pointer;
		letter-spacing: var(--letterSpacing);
	}
`
export default Wrapper
