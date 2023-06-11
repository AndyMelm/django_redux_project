const API_KEY = 'XI5LNVMKRW4H12S9';

export const fetchStockData = async (symbol: string) => {
  const API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`;

  try {
    const response = await fetch(API_Call);
    const data = await response.json();
    console.log('Stock data:', data); // Added console log
    return data;
  } catch (error) {
    throw new Error('Failed to fetch stock data');
  }
};
