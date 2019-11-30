const schema = 
`type Query {
	info: String!
	calculatePrice(type: CalculationType, margin: Float, exchangeRate: Float): Float
}

enum CalculationType {
	BUY
	SELL
}
`

module.exports = schema;