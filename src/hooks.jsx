import * as React from 'react'
import { getIsDocumentHidden, getBrowserVisibilityProp } from './helpers'

function useLocalStorageState(
	key,
	defaultValue = '',
	{ serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
	const [state, setState] = React.useState(() => {
		const valueInLocalStorage = window.localStorage.getItem(key)
		if (valueInLocalStorage) {
			return deserialize(valueInLocalStorage)
		}
		return typeof defaultValue === 'function' ? defaultValue() : defaultValue
	})

	const prevKeyRef = React.useRef(key)

	React.useEffect(() => {
		const prevKey = prevKeyRef.current
		if (prevKey !== key) {
			window.localStorage.removeItem(prevKey)
		}
		prevKeyRef.current = key
		window.localStorage.setItem(key, serialize(state))
	}, [key, state, serialize])

	return [state, setState]
}

function useSessionStorageState(
	key,
	defaultValue = '',
	{ serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
	const [state, setState] = React.useState(() => {
		const valueInSessionStorage = window.sessionStorage.getItem(key)
		if (valueInSessionStorage) {
			return deserialize(valueInSessionStorage)
		}
		return typeof defaultValue === 'function' ? defaultValue() : defaultValue
	})

	const prevKeyRef = React.useRef(key)

	React.useEffect(() => {
		const prevKey = prevKeyRef.current
		if (prevKey !== key) {
			window.sessionStorage.removeItem(prevKey)
		}
		prevKeyRef.current = key
		window.sessionStorage.setItem(key, serialize(state))
	}, [key, state, serialize])

	return [state, setState]
}

export function usePageVisibility() {
	const [isVisible, setIsVisible] = React.useState(getIsDocumentHidden())
	const onVisibilityChange = () => setIsVisible(getIsDocumentHidden())

	React.useEffect(() => {
		const visibilityChange = getBrowserVisibilityProp()

		document.addEventListener(visibilityChange, onVisibilityChange, false)

		return () => {
			document.removeEventListener(visibilityChange, onVisibilityChange)
		}
	})

	return isVisible
}

export { useLocalStorageState, useSessionStorageState }
