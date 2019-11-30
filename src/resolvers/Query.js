const fetch = require('node-fetch');

const info = () => 'Welcome to the GraphQL API for calculating the current price of BitCoin in NGN. Check the docs for usage info';

const calculatePrice = async args =>
{
	const { type, margin, exchangeRate } = args;
	let bitCoinValue;
	const apiResponse = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
		.then(data => data.json())
		.then(json => bitCoinValue = parseFloat(json.bpi.USD.rate_float));
	if (apiResponse)
	{
		const appliedMargin = bitCoinValue * margin / 100;
		const adjustedValue = type === 'SELL' ? (bitCoinValue - appliedMargin) : (bitCoinValue + appliedMargin);
		return adjustedValue * exchangeRate;
	}
	 // Coindesk's API service is not always online
	return -1;
}

module.exports = { info, calculatePrice }