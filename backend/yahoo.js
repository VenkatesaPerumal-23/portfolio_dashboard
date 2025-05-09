// backend/yahoo.js
import yahooFinance from 'yahoo-finance2';

async function fetchStockData(symbol) {
  try {
    const result = await yahooFinance.quoteSummary(symbol, {
      modules: ['price', 'summaryDetail', 'defaultKeyStatistics'],
    });

    const cmp = result?.price?.regularMarketPrice ?? null;
    const peRatio = result?.summaryDetail?.trailingPE ?? null;
    const latestEarnings = result?.defaultKeyStatistics?.trailingEps ?? null;

    return {
      cmp,
      peRatio,
      latestEarnings,
    };
  } catch (error) {
    console.error(`Yahoo fetch error for ${symbol}:`, error.message);
    return {
      cmp: null,
      peRatio: null,
      latestEarnings: null,
    };
  }
}

export default fetchStockData;
