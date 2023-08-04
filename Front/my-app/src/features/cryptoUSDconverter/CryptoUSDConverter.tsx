import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Container, TextField, Button } from '@mui/material';
import { getCryptoPrice } from './CryptoUSDConverterAPI';

const CryptoUSDConverter = () => {
  const [cryptoSymbol, setCryptoSymbol] = useState('');
  const [cryptoPrice, setCryptoPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCryptoSymbol(event.target.value.toUpperCase());
    setCryptoPrice(''); // Clear the cryptoPrice state when the coin symbol changes
  };

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
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

  // Calculate the total value of the coins
  const totalPrice = parseFloat(quantity) * parseFloat(cryptoPrice);

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
        You can enter a coin symbol here to convert it to USD:
      </p> <br />
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter Cryptocurrency Symbol"
          variant="outlined"
          value={cryptoSymbol}
          onChange={handleInputChange}
          fullWidth
          size="small"
        />
        <TextField
          label="Enter Quantity"
          type="number"
          variant="outlined"
          value={quantity}
          onChange={handleQuantityChange}
          fullWidth
          size="small"
          style={{ marginTop: '10px' }}
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
        <>
          <p style={{ marginTop: '20px' }}>
            <strong>Price in USD: ${cryptoPrice}</strong>
          </p>
          {quantity && !isNaN(totalPrice) && (
            <p style={{ marginTop: '10px' }}>
              <strong>Total Value (USD) for {quantity} {cryptoSymbol}: ${totalPrice.toFixed(2)}</strong>
            </p>
          )}
        </>
      )}
    </Container>
  );
};

export default CryptoUSDConverter;
