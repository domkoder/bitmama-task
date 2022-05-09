import './App.css'

function App() {
	return (
		<div className="card">
			<h3 className="card__title">Login</h3>
			<form className="form">
				<div className="form__control">
					<label className="form__label" for="username">
						Username
					</label>
					<input className="form__input" id="username" autoComplete="off" />
				</div>

				<div className="form__control">
					<button className="button" type="submit">
						Login
					</button>
				</div>
			</form>
		</div>
	)
}

export default App
