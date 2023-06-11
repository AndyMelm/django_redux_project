import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchData, fetchDataSuccess, fetchDataFailure } from './stockdataSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { fetchStockData } from './stockdataAPI';

const Stockdata = () => {
  const dispatch = useDispatch();
  const [stockSymbol, setStockSymbol] = useState('IBM');
  const { stockChartXValues, stockChartYValues, loading, error } = useSelector(
    (state: RootState) => state.stockdata
  );

  const fetchDataAndDispatch = async () => {
    try {
      dispatch(fetchData());

      const data = await fetchStockData(stockSymbol);

      const chartValues = [];

      for (const date in data['Time Series (Daily)']) {
        chartValues.push({
          date,
          'Closing Price at The End of The Day': parseFloat(data['Time Series (Daily)'][date]['4. close']),
        });
      }

      dispatch(
        fetchDataSuccess({
          xValues: chartValues.map((entry) => entry.date),
          yValues: chartValues.map((entry) => entry['Closing Price at The End of The Day']),
        })
      );
    } catch (error: any) {
      dispatch(fetchDataFailure(error.message));
    }
  };

  const handleGetStockData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page refresh
    fetchDataAndDispatch();
  };

  const handleSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStockSymbol(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="mt-5">Stock Market Data</h1>
      <form onSubmit={handleGetStockData} className="mb-3">
        <label htmlFor="symbolInput" className="form-label">Stock Symbol (Ticker):</label>
        <div className="input-group">
          <input id="symbolInput" type="text" className="form-control" value={stockSymbol} onChange={handleSymbolChange} />
          <button type="submit" className="btn btn-primary">Get Stock Data</button>
        </div>
      </form>
      {stockChartXValues.length === 0 && <div>Please Enter a Valid Ticker</div>}
      {stockChartXValues.length > 0 && (
        <div className="text-center">
          <LineChart
            width={800}
            height={400}
            data={stockChartYValues.map((value, index) => ({
              date: stockChartXValues[index],
              'Closing Price at The End of The Day': value , 
            }))}
          >
            <XAxis dataKey="date" reversed={true} />
            <YAxis label={{ value: 'USD', angle: -90, position: 'insideLeft' }} />
            <CartesianGrid stroke="#f5f5f5" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Closing Price at The End of The Day"
              stroke="#ff7300"
              yAxisId={0}
            />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default Stockdata;
