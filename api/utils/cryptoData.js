const fs = require('fs');

const TrendingCoins = (currency = "USD") =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`;

const SingleCoin = (id) =>
    `https://api.coingecko.com/api/v3/coins/${id}`;

const HistoricalChart = (id, currency = "USD", days = 365) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

const DataCollector = async () => {
    try {
        // total 2020 seconds
        fs.mkdirSync("data", { recursive: true })

        // Getting Coins List (20 seconds)
        const data = await fetch(TrendingCoins("usd"))
        const jsonData = await data.json();
        fs.writeFileSync("data/coins.json", JSON.stringify(jsonData));
        await new Promise(resolve => setTimeout(resolve, 20000))

        // Getting Single Coin Data 50 coins * 40 second per coin  = (2000 seconds)
        const coins = JSON.parse(fs.readFileSync("data/coins.json", { encoding: 'utf8', flag: 'r' }))
        for (let i = 0; i < coins.length; i++) {
            const singleCoin = await fetch(SingleCoin(coins[i].id))
            const singleCoinJsonData = await singleCoin.json();
            fs.writeFileSync(`data/coin-${coins[i].id}.json`, JSON.stringify(singleCoinJsonData));
            await new Promise(resolve => setTimeout(resolve, 20000))

            const historyChart = await fetch(HistoricalChart(coins[i].id))
            const historyChartJsonData = await historyChart.json();
            fs.writeFileSync(`data/history-${coins[i].id}.json`, JSON.stringify(historyChartJsonData));
            await new Promise(resolve => setTimeout(resolve, 20000))
        }
    }
    catch (error) {
        return
    }
}

module.exports = { DataCollector, TrendingCoins, SingleCoin, HistoricalChart }