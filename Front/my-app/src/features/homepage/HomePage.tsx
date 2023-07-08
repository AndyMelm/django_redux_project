import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-center">Welcome to Your Trading Journal</h1> <br />
      <p className="border-custom" style={{ padding: "20px", fontWeight: 'bold', margin:"0"}}>With our user-friendly interface, logging your trades has never been easier. <br />
            Simply enter the details of each trade, including the asset, entry and exit points,
            and any additional notes. <br /> Our intuitive design ensures that you can quickly capture all the relevant information,
            allowing you to focus on your trading strategies.</p>
      <div className="d-flex flex-wrap justify-content-center mt-5">
        {/* Container for the first image + text section */}
        <div className="d-flex flex-column align-items-center border-custom p-3">
      
          <img
            className="img-fluid"
            src="http://127.0.0.1:8000/images/journal_images/charts%20from%20tradingvew.png"
            alt="Charts"
          />
        </div>

     {/* Container for the second image + text section */}
<div className="d-flex flex-column align-items-center mx-5 border-custom p-3">
  <div className="d-flex flex-wrap align-items-center">
    <div className="d-flex flex-column justify-content-center mx-3">
      <p className="text-center" style={{ fontWeight: 'bold', whiteSpace: 'pre-wrap' }}>
        Our app provides powerful analytical tools and insightful statistics to help you gain a deeper understanding of your trading performance. Visualize your trades with interactive charts, track your profitability over time, and identify patterns and trends in your trading behavior. Analyze your wins and losses, evaluate your risk management strategies, and make data-driven decisions to optimize your trading approach.
      </p>
    </div>
    <img
      className="img-fluid"
      style={{ maxWidth: '100%', margin: '10px 0' }}
      src="http://127.0.0.1:8000/images/journal_images/your%20trading%20data.png"
      alt="Trading Data"
    />
  </div>
</div>

      {/* Container for the third image + text section */}
<div className="d-flex flex-column align-items-center border-custom p-3">
  <div className="d-flex flex-wrap align-items-center"> {/* Updated */}
    <div className="d-flex flex-column justify-content-center mx-3">
      <p className="text-center" style={{ fontWeight: 'bold', whiteSpace: 'pre-wrap' }}> {/* Updated */}
        We have seamlessly integrated TradingView charts into our app, eliminating the need to switch browser tabs or open external applications.
        With this innovative feature, you can effortlessly view and analyze TradingView charts within our platform,
        without any hassle or inconvenience.
      </p>
    </div>
    <img
      className="img-fluid"
      style={{ maxWidth: '100%', margin: '10px 0' }} 
      src="http://127.0.0.1:8000/images/journal_images/charts%20from%20tradingvew.png"
      alt="Charts"
    />
  </div>
</div>

        
        <p className="border-custom" style={{ padding: "20px", fontWeight: 'bold' }}>
          Start journaling your trades and take control of your trading journey. <br />
          Sign up now and unlock the full potential of our feature-rich trading journal. <br />
          Elevate your trading skills, make informed decisions, and achieve consistent results.
        </p>

      </div> <br />

      
    </div>
  );
};

export default HomePage;
