import React from 'react'
import './App.css'
import { ReactComponent as ProfileIcon } from './icons/profile-circle.svg'
import { ReactComponent as UserIcon } from './icons/profile.svg'

function App() {
	const [user, setUser] = React.useState(
		sessionStorage.getItem('username') || null
	)

	const handleLogout = () => {
		sessionStorage.setItem('username', null)
		setUser(null)
	}

	const handleLogin = (event) => {
		event.preventDefault()
		const username = event.target.username.value
		sessionStorage.setItem('username', username)
		setUser(username)
	}

	return (
		<div>
			{user ? (
				<div className="card">
					<header className="header">
						<div className="profile__info ">
							<ProfileIcon className="profile__icon" />
							<p>{user}</p>
						</div>
						<button className="button button-secondary" onClick={handleLogout}>
							Logout
						</button>
					</header>

					<ul className="list">
						<li className="list__item">
							<div className="user__info">
								<span className="user__icon">
									<UserIcon />
								</span>
								<div>
									<div>
										levi <span className="user__status active">active</span>
									</div>
									<div className="user__tab">Tab 1</div>
								</div>
							</div>
							<button class="delete">×</button>
						</li>

						<li className="list__item">
							<div className="user__info">
								<span className="user__icon">
									<UserIcon />
								</span>
								<div className="user__container">
									<div>
										Robinson <span className="user__status">idle</span>
									</div>
									<div className="user__tab">Tab 1</div>
								</div>
							</div>
							<button class="delete">×</button>
						</li>
					</ul>
				</div>
			) : (
				<div className="card">
					<h3 className="card__title">Login</h3>
					<form className="form" onSubmit={handleLogin}>
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
				</div>
			)}
		</div>
	)
}

export default App
