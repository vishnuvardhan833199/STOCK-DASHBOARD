import StockTable from "./components/StockTable";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📊 Stock Dashboard
      </h1>
      <StockTable />
    </div>
  );
}

export default App;
