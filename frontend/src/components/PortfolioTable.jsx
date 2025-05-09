import React from "react";

const PortfolioTable = ({ portfolioData }) => {
  
  const formatNumber = (num) =>
    typeof num === "number" ? num.toFixed(2) : num;

  return (
    <div className="overflow-x-auto">
      {portfolioData.map((sectorObj, idx) => (
        <div key={idx} className="mb-10">
          {/* Sector Header and Summary */}
          <div className="mb-2 bg-red-200 p-4 rounded">
            <h2 className="text-xl font-bold">{sectorObj.sector}</h2>
            <div className="flex flex-wrap gap-4 mt-2">
              <div>
                <strong>Total Investment:</strong>{" "}
                {Number(sectorObj.totalInvestment).toLocaleString("en-IN")}
              </div>
              <div>
                <strong>Total Present Value:</strong>{" "}
                {Number(sectorObj.totalPresentValue).toLocaleString("en-IN")}
              </div>
              <div>
                <strong>Sector Gain/Loss:</strong>{" "}
                <span
                  className={
                    Number(sectorObj.gainLoss) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {Number(sectorObj.gainLoss).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Stock Table for this Sector */}
          <table className="min-w-full table-auto border-collapse shadow">
            <thead className="bg-black-100">
              <tr>
                <th className="border px-3 py-2">Particulars</th>
                <th className="border px-3 py-2">Purchase Price</th>
                <th className="border px-3 py-2">Qty</th>
                <th className="border px-3 py-2">Investment</th>
                <th className="border px-3 py-2">Portfolio (%)</th>
                <th className="border px-3 py-2">NSE/BSE</th>
                <th className="border px-3 py-2">CMP</th>
                <th className="border px-3 py-2">Present Value</th>
                <th className="border px-3 py-2">Gain/Loss</th>
                <th className="border px-3 py-2">P/E Ratio</th>
                <th className="border px-3 py-2">Latest Earnings</th>
              </tr>
            </thead>
            <tbody>
              {sectorObj.stocks.map((stock, index) => {

                const calculatedPresentValue = stock.cmp * stock.qty;
                const calculatedGainLoss = calculatedPresentValue - stock.investment;
                return (
                  <tr key={index} className="text-center border-t">
                    <td className="border px-3 py-2">{stock.particulars}</td>
                    <td className="border px-3 py-2">{formatNumber(stock.purchasePrice)}</td>
                    <td className="border px-3 py-2">{stock.qty}</td>
                    <td className="border px-3 py-2">
                      {Number(stock.investment).toLocaleString("en-IN")}
                    </td>
                    <td className="border px-3 py-2">{stock.portfolioPercent}%</td>
                    <td className="border px-3 py-2">{stock.symbol}</td>
                    <td className="border px-3 py-2">
                      {formatNumber(stock.cmp)}
                    </td>
                    <td className="border px-3 py-2">
                      {Number(calculatedPresentValue).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className={`border px-3 py-2 font-semibold ${
                      calculatedGainLoss >= 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {Number(calculatedGainLoss).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border px-3 py-2">
                      {stock.peRatio !== null ? formatNumber(stock.peRatio) : "N/A"}
                    </td>
                    <td className="border px-3 py-2">
                      {formatNumber(stock.latestEarnings)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default PortfolioTable;
