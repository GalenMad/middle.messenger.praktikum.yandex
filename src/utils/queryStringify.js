const queryStringify = (data) => {
	if (!data || typeof data !== 'object') {
		return '';
	}
	return Object.entries(data).reduceRight((prev, curr) => {
		return `${curr[0]}=${curr[1].toString()}${prev ? '&' + prev : ''}`;
	}, null);
};
export default queryStringify;
