import React, { useEffect, useState } from "react";
import axios from "axios";
import PortfolioTable from "./components/PortfolioTable";

const App = () => {
  const [portfolio, setPortfolio] = useState([]);

  // Function to fetch portfolio data
  const fetchPortfolio = () => {
    axios
      .get("https://portfolio-dashboard-678j.onrender.com/api/portfolio")
      .then((res) => {
        setPortfolio(res.data);
      })
      .catch((error) => {
        console.error("Error fetching portfolio data:", error);
      });
  };

  // Initial fetch and then every 15 seconds
  useEffect(() => {
    fetchPortfolio();
    const interval = setInterval(fetchPortfolio, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Portfolio Dashboard</h1>
      <PortfolioTable portfolioData={portfolio} />
    </div>
  );
};

export default App;
