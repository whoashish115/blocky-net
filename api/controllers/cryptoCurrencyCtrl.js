const fs = require('fs');
const { TrendingCoins, SingleCoin, HistoricalChart } = require("../utils/cryptoData");

const cryptoCurrencyCtrl = {
    getTrendingCoins:  async (req, res) => {
        try {
            const coins = fs.readFileSync("data/coins.json", { encoding: 'utf8', flag: 'r' })
            return res.json({coins:JSON.parse(coins)})
        } catch (error) {
            try {
                const data = await fetch(TrendingCoins())
                const jsonData = await data.json();
                return res.json({ coins: jsonData })
            } catch (error) {
                return res.status(500).json({ message: "coins data does not exists." })
            }
        }
    },
    getCoin:  async (req, res) => {
        try {
            const singleCoin = fs.readFileSync(`data/coin-${req.params.id}.json`, { encoding: 'utf8', flag: 'r' })
            const historyChart = fs.readFileSync(`data/history-${req.params.id}.json`, { encoding: 'utf8', flag: 'r' })
            return res.json({ coin: JSON.parse(singleCoin), history: JSON.parse(historyChart) })
        } catch (error) {
            try {
                const historyChart = await fetch(HistoricalChart(req.params.id))
                const historyChartJsonData = await historyChart.json();
                const singleCoin = await fetch(SingleCoin(req.params.id))
                const singleCoinJsonData = await singleCoin.json();
                return res.json({ coin: singleCoinJsonData, history: historyChartJsonData })
            } catch (error) {
                return res.status(500).json({ message: "coin data does not exists. try another coin id." })
            }
        }
    }
};


module.exports = cryptoCurrencyCtrl;
