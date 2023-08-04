import axios from 'axios';

const apiUrl = 'http://localhost:8000/get_crypto_price/';

const getToken = () => {
  const token = sessionStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
};

export const getCryptoPrice = (cryptoSymbol: string) => {
  const config = {
    params: { crypto_symbol: cryptoSymbol },
    headers: { Authorization: getToken() },
  };

  return axios
    .get(apiUrl, config)
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
