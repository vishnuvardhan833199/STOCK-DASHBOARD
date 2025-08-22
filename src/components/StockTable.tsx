
import React, { useEffect, useState } from "react";

interface Stock {
  symbol: string;
  price: number;
  change: number;
  percentChange: number;
}

const StockTable: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = "d2k61kpr01qj8a5m7dg0d2k61kpr01qj8a5m7dgg"; // 🔑 Replace with your Finnhub key
  const symbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN"];

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const responses = await Promise.all(
          symbols.map(async (symbol) => {
            const res = await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
            );
            const data = await res.json();

            return {
              symbol,
              price: data.c, // current price
              change: data.d, // price change
              percentChange: data.dp, // percentage change
            };
          })
        );
        setStocks(responses);
      } catch (err) {
        setError("Failed to fetch stock data. Please check your API key.");
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) return <p className="text-blue-500">Loading stock data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        📊 Stock Market Dashboard
      </h2>
      <table className="w-full border-collapse rounded-xl shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="p-3 text-left">Symbol</th>
            <th className="p-3 text-left">Price ($)</th>
            <th className="p-3 text-left">Change ($)</th>
            <th className="p-3 text-left">% Change</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr
              key={index}
              className="border-b even:bg-gray-100 odd:bg-white hover:bg-yellow-100 transition"
            >
              <td className="p-3 font-semibold text-indigo-700">
                {stock.symbol}
              </td>
              <td className="p-3 text-gray-700">{stock.price.toFixed(2)}</td>
              <td
                className={`p-3 font-medium ${
                  stock.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock.change.toFixed(2)}
              </td>
              <td
                className={`p-3 font-medium ${
                  stock.percentChange >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock.percentChange.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
