import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { SessionsProvider } from './contexts/sessions-context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<SessionsProvider>
		<App />
	</SessionsProvider>
)
