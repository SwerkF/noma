export const stringToNumber = (value: string) => {
	return Number(value.replace(/,/g, ''));
};

export const numberToString = (value: number) => {
	return value.toLocaleString('en-US');
};

export const numberToCurrency = (value: number, currency: string = 'USD') => {
	return value.toLocaleString('en-US', { style: 'currency', currency });
};
