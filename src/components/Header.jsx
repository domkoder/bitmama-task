import React from 'react'

import AppContext from '../contexts/app-context'

import { ReactComponent as ProfileIcon } from '../assets/icons/profile-circle.svg'

function Header() {
	const { user, handleLogout } = React.useContext(AppContext)

	return (
		<header className="header">
			<div className="profile__info ">
				<ProfileIcon className="profile__icon" />
				<p>{user.username}</p>
				<span className="user__status active ">active</span>
			</div>

			<div className="actions">
				<a
					href="https://bitmamatask.netlify.app/"
					target="_blank"
					rel="noreferrer"
					className="button"
				>
					Login new user
				</a>
				<button className="button button-secondary" onClick={handleLogout}>
					Logout
				</button>
			</div>
		</header>
	)
}

export default Header
