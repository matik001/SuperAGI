export const keyToRedirectionUrl = (key: string | undefined) => {
	const newUrl = key
		? `${window.location.href.replace('https://', '').replace('http://', '')}${key}`
		: null;
	return newUrl;
};
