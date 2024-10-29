export const debounce = (fn, delay) => {
	let timer = null
	return () => {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			fn();
		}, delay)
	}
}