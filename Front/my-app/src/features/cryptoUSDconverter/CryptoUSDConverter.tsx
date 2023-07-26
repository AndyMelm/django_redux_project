import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Container, TextField, Button } from '@mui/material';
import { getCryptoPrice } from './CryptoUSDConverterAPI';

const CryptoUSDConverter = () => {
  const [cryptoSymbol, setCryptoSymbol] = useState('');
  const [cryptoPrice, setCryptoPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCryptoSymbol(event.target.value.toUpperCase());
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError('');

    try {
      const price = await getCryptoPrice(cryptoSymbol);
      setCryptoPrice(price);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter Cryptocurrency Symbol"
          variant="outlined"
          value={cryptoSymbol}
          onChange={handleInputChange}
          fullWidth
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          style={{ marginTop: '20px', backgroundColor: '#28a745', color: '#ffffff' }}
        >
          Get Price
        </Button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {cryptoPrice && (
        <p style={{ marginTop: '20px' }}>
          <strong>Price in USD: ${cryptoPrice}</strong>
        </p>
      )}
    </Container>
  );
};

export default CryptoUSDConverter;
