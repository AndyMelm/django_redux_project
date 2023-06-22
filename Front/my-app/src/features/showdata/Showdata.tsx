import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getAllJournals, selectJournalsdata } from './showdataSlice';
import { Journal } from '../../Models/Journal';
import { selectUserId , getUserIdAsync, selectToken} from '../login/loginSlice';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const JournalData: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken)
  const journals = useAppSelector(selectJournalsdata);
  const userid = useAppSelector(selectUserId);

  useEffect(() => {
    const getTokenFromSessionStorage = () => {
      // Retrieve the token from session storage
      const token = sessionStorage.getItem('token');
      return token ? token : null;
    };

    if (userid) {
      console.log('Dispatching getAllJournals action...');
      dispatch(getAllJournals(userid));
    } else {
      const token = getTokenFromSessionStorage();
      if (token) {
        dispatch(getUserIdAsync(token)).then((response) => {
          if (response.payload) {
            console.log('Dispatching getAllJournals action...');
            dispatch(getAllJournals(response.payload));
          }
        });
      }
      console.log('userid is null. Skipping getAllJournals dispatch.');
    }
  }, [dispatch, userid]);
  

  // Initialize variables
  let totalWinning: number = 0;
  let totalLoss: number = 0;
  let mostProfitableStrategy: string = '';
  let mostLosingStrategy: string = '';
  let maxProfit: number = 0;
  let maxLoss: number = 0;
  let profits: { [key: string]: number } = {};
  let winningTrades: number = 0;
  let losingTrades: number = 0;

  if (journals.length > 0) {
    // Calculate total winnings and losses
    for (const journal of journals) {
      const profit =
        journal.position === 'Long'
          ? journal.quantity * (journal.exitprice - journal.entryprice)
          : journal.quantity * (journal.entryprice - journal.exitprice);

      if (journal.winorlose === 'Win') {
        totalWinning += profit;
        winningTrades++;
      } else {
        totalLoss += Math.abs(profit);
        losingTrades++;
      }

      // Calculate the profits for each strategy
      if (profits[journal.strategy]) {
        profits[journal.strategy] += profit;
      } else {
        profits[journal.strategy] = profit;
      }

      // Determine the most profitable strategy
      if (profits[journal.strategy] > maxProfit) {
        maxProfit = profits[journal.strategy];
        mostProfitableStrategy = journal.strategy;
      }

      // Determine the most losing strategy
      if (profits[journal.strategy] < maxLoss) {
        maxLoss = profits[journal.strategy];
        mostLosingStrategy = journal.strategy;
      }
    }
  }

  // Prepare data for bar chart
  const barChartData = Object.keys(profits).map((strategy) => ({
    strategy,
    profit: profits[strategy],
  }));

  // Prepare data for line chart
  const lineChartData = journals.map((journal, index) => ({
    index,
    profit:
      journal.position === 'Long'
        ? journal.quantity * (journal.exitprice - journal.entryprice)
        : journal.quantity * (journal.entryprice - journal.exitprice),
  }));

  // Prepare data for pie chart
  const pieChartData = [
    { name: 'Winning Trades', value: winningTrades },
    { name: 'Losing Trades', value: losingTrades },
  ];

  // Calculate percentage of winning and losing trades
  const totalTrades = winningTrades + losingTrades;
  const winningPercentage = (winningTrades / totalTrades) * 100;
  const losingPercentage = (losingTrades / totalTrades) * 100;

  // Define colors for pie chart sectors
  const pieChartColors = ['#0088FE', '#FF8042'];

  return (
    <div className="container">
      <h1>Your Journal Trading Data</h1>
      <hr />

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Profit Summary</h2>
              <p className="card-text">
                <strong>Total Winning:</strong> {totalWinning}
              </p>
              <p className="card-text">
                <strong>Total Loss:</strong> {totalLoss}
              </p>
              <p className="card-text">
                <strong>Most Profitable Strategy:</strong> {mostProfitableStrategy}
              </p>
              <p className="card-text">
                <strong>Profit for Most Profitable Strategy:</strong> {profits[mostProfitableStrategy]}
              </p>
              <p className="card-text">
                <strong>Most Losing Strategy:</strong> {mostLosingStrategy}
              </p>

            </div>
          </div>
        </div>

        <div className="col-md-6">
  <div className="card mb-4">
    <div className="card-body">
      <h2 className="card-title">Profit by Strategy</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="strategy" label="" hide />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="profit" fill="#2adb3b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>

      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Profit over Trades</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="index" label="Number of Trades" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="profit" stroke="#1839de" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Winning & Losing Trades</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={(entry) => `${entry.name} (${entry.value})`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <p className="card-text">
                <strong>Total Trades:</strong> {totalTrades}
              </p>
              <p className="card-text">
                <strong>Winning Trades:</strong> {winningTrades} ({winningPercentage.toFixed(2)}%)
              </p>
              <p className="card-text">
                <strong>Losing Trades:</strong> {losingTrades} ({losingPercentage.toFixed(2)}%)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalData;
