const feedUri = 'wss://ws-feed.pro.coinbase.com'
const connectionRateLimit = 4000 // 4 seconds per connection to the feed
const requestRateLimit = 1000.0 / 100.0 // 100 requests per second to the feed
const productIds = ['BTC-USD', 'ETH-USD']

export {
    feedUri,
    connectionRateLimit,
    requestRateLimit,
    productIds,
}