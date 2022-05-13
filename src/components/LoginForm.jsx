import React from 'react'

import AppContext from '../contexts/app-context'

import { ReactComponent as ProfileIcon } from '../assets/icons/profile-circle.svg'

function LoginForm() {
	const { handleLogin } = React.useContext(AppContext)

	return (
		<form className="form" onSubmit={handleLogin}>
			<ProfileIcon className="profile__icon profile__icon--large" />
			<div className="form__control">
				<label className="form__label" htmlFor="username">
					Username
				</label>
				<input
					className="form__input"
					id="username"
					autoComplete="off"
					required
				/>
			</div>

			<div className="form__control">
				<button className="button" type="submit">
					Login
				</button>
			</div>
		</form>
	)
}

export default LoginForm
