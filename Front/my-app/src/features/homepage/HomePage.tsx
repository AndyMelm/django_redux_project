import React from 'react';

const HomePage = () => {
  return (
    <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-center">Welcome to Your Trading Journal</h1>
      <p className="text-center">Write something about how traders can easily journal their trades.</p>
      <div className="d-flex flex-wrap justify-content-center mt-5">
        <div className="d-flex flex-column align-items-center">
          <img
            className="img-fluid"
            src="http://127.0.0.1:8000/images/journal_images/charts%20from%20tradingvew.png"
            alt="Charts"
          />
          <p className="text-center">Write something about traders being able to see graphs and analyze their performance.</p>
        </div>

        <div className="d-flex flex-column align-items-center mx-5">
          <div className="d-flex">
            <img
              className="img-fluid"
              src="http://127.0.0.1:8000/images/journal_images/your%20trading%20data.png"
              alt="Trading Data"
            />
            <div className="d-flex flex-column justify-content-center mx-3">
              <p className="text-center">You can see TradingView charts without changing your browser tab.</p>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column align-items-center">
          <div className="d-flex">
            <div className="d-flex flex-column justify-content-center mx-3">
              <p className="text-center">Another section with an image and accompanying text.</p>
            </div>
            <img
              className="img-fluid"
              src="http://127.0.0.1:8000/images/journal_images/charts%20from%20tradingvew.png"
              alt="Charts"
            />
          </div>
        </div>
      </div> <br />

      <footer className="bg-dark py-4 d-flex justify-content-center w-100"> {/* Use w-100 class to make the footer full-width */}
        <div className="d-flex justify-content-center container"> {/* Use container class to center the buttons */}
          <button className="btn btn-link text-white mx-2">About</button>
          <button className="btn btn-link text-white mx-2">Donations</button>
          <button className="btn btn-link text-white mx-2">Tutorial</button>
          <button className="btn btn-link text-white mx-2">Contact Us</button>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
