import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';


const Donations = () => {
  
  return (
    <div>
            Donations
      <PayPalScriptProvider options={{"clientId": "AQ9fxDAyVLo657VegI0KXi8AiX8ru71b_jgxWIe0QYdSGB5xAKOrYAY7ihKBteS3BamzYQCPkMfrHVYl"}}>
        <PayPalButtons></PayPalButtons>
      </PayPalScriptProvider>


    </div>
  )
}

export default Donations