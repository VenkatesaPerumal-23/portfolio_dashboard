import express from 'express';
import cors from 'cors';
import portfolio from './portfolio.js';
import fetchStockData from './yahoo.js';

const app = express();
app.use(cors());

app.get('/api/portfolio', async (req, res) => {
  const updatedPortfolio = await Promise.all(
    portfolio.map(async (sector) => {
      const updatedStocks = await Promise.all(
        sector.stocks.map(async (stock) => {
          const data = await fetchStockData(stock.symbol);
          if (data) {
            const presentValue = data.cmp * stock.qty;
            const gainLoss = presentValue - stock.investment;
            const gainLossPercent = ((gainLoss / stock.investment) * 100).toFixed(2);
            return {
              ...stock,
              cmp: data.cmp,
              presentValue: presentValue.toFixed(2),
              gainLoss: gainLoss.toFixed(2),
              gainLossPercent,
              peRatio: data.peRatio,
              latestEarnings: data.latestEarnings
            };
          }
          return stock;
        })
      );

      const totalInvestment = updatedStocks.reduce((sum, s) => sum + s.investment, 0);
      const totalPresentValue = updatedStocks.reduce((sum, s) => sum + parseFloat(s.presentValue), 0);
      const gainLoss = totalPresentValue - totalInvestment;
      const gainLossPercent = ((gainLoss / totalInvestment) * 100).toFixed(2);

      return {
        ...sector,
        totalInvestment,
        totalPresentValue: totalPresentValue.toFixed(2),
        gainLoss: gainLoss.toFixed(2),
        gainLossPercent,
        stocks: updatedStocks
      };
    })
  );

  res.json(updatedPortfolio);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
