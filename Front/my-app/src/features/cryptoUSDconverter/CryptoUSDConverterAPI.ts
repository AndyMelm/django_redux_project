import axios from 'axios';

const apiUrl = 'http://localhost:8000/get_crypto_price/';

export const getCryptoPrice = (cryptoSymbol: string) => {
  const requestData = { params: { crypto_symbol: cryptoSymbol } };

  return axios
    .get(apiUrl, requestData)
    .then((response) => {
      if ('price' in response.data) {
        return response.data.price;
      } else {
        throw new Error('Cryptocurrency not found.');
      }
    })
    .catch((error) => {
      throw new Error('Failed to fetch cryptocurrency data. Please check the symbol.');
    });
};
